import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as wkx from "wkx";

import type { ILocalidadRepository } from "src/lib/Localidad/Domain/Interface/ILocalidadRepository";
import { LocalidadEntity } from "./localidades.entity";
import { Localidad } from "src/lib/Localidad/Domain/Entity/Localidad";
import { LocalidadId } from "src/lib/Localidad/Domain/ValueObject/LocalidadId";
import { LocalidadNombre } from "src/lib/Localidad/Domain/ValueObject/LocalidadNombre";
import { LocalidadSuperficieHa } from "src/lib/Localidad/Domain/ValueObject/LocalidadSuperficieHa";
import { LocalidadSuperficieM2 } from "src/lib/Localidad/Domain/ValueObject/LocalidadSuperficieM2";
import { LocalidadGeom } from "src/lib/Localidad/Domain/ValueObject/LocalidadGeom";
import { LocalidadNotFound } from "src/lib/Localidad/Domain/Exceptions/LocalidadNotFound";

@Injectable()
export class LocalidadRepository implements ILocalidadRepository {
  constructor(
    @InjectRepository(LocalidadEntity)
    private readonly repository: Repository<LocalidadEntity>
  ) { }

  // ==================== UTIL ======================
  private mapToDomain(entity: LocalidadEntity): Localidad {
    let geomHex: string;

    if (typeof entity.geom === "object" && entity.geom !== null) {
      geomHex = wkx.Geometry.parseGeoJSON(entity.geom).toWkb().toString("hex");
    } else if (typeof entity.geom === "string") {
      geomHex = entity.geom.trim();
    } else {
      throw new Error(`Formato de geom desconocido: ${typeof entity.geom}`);
    }

    return new Localidad(
      new LocalidadId(entity.id),
      new LocalidadNombre(entity.nombre),
      new LocalidadSuperficieHa(entity.superficieHa),
      new LocalidadSuperficieM2(entity.superficieM2),
      new LocalidadGeom(geomHex)
    );
  }
  private toPostGISGeom(localidad: Localidad): () => string {
    const geomWKB = localidad.geom.getValue();
    const geomWkt = wkx.Geometry.parse(Buffer.from(geomWKB, "hex")).toWkt();
    return () => `ST_GeomFromText('${geomWkt}', 4326)`;
  }

  // ==================== CREATE ======================
  async create(localidad: Localidad): Promise<void> {
    await this.repository.save({
      nombre: localidad.nombre.getValue(),
      superficieHa: localidad.superficieHa.getValue(),
      superficieM2: localidad.superficieM2.getValue(),
      geom: this.toPostGISGeom(localidad),
    });
  }

  // ==================== EDIT ======================
  async edit(localidad: Localidad): Promise<void> {
    await this.repository.update(localidad.id!.value,{
      nombre: localidad.nombre.getValue(),
      superficieHa: localidad.superficieHa.getValue(),
      superficieM2: localidad.superficieM2.getValue(),
      geom: this.toPostGISGeom(localidad)

    });

  }

  // ==================== DELETE ======================
  async delete(id: LocalidadId): Promise<void> {
    await this.repository.delete(id.value);
  }

  // ==================== GET ALL ======================
  async getAll(): Promise<Localidad[]> {
    const entities = await this.repository.find();
    return entities.map((e) => this.mapToDomain(e));
  }

// ==================== GET ONE BY ID ======================
async getOneById(id: LocalidadId): Promise<Localidad> {
  const entity = await this.repository.findOne({ where: { id: id.value } });
  if (!entity) throw new LocalidadNotFound(`Localidad con id ${id.value} no encontrada`);
  return this.mapToDomain(entity);
}



  // ==================== FIND BY NAME ======================
  async findByName(nombre: string): Promise<Localidad | null> {
    const entity = await this.repository
      .createQueryBuilder("localidad")
      .where("UPPER(localidad.nombre) = UPPER(:nombre)", { nombre })
      .getOne();

    return entity ? this.mapToDomain(entity) : null;
  }
}
