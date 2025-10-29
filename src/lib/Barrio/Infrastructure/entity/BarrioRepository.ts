import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as wkx from "wkx";

import { IBarrioRepository } from "../../Domain/Interfaces/IBarrioRepository.js";
import { BarrioEntity } from "./barrios.entity";
import { Barrio } from "../../Domain/Entity/Barrio";
import { BarrioId } from "../../Domain/ValueObjects/BarrioId";
import { BarrioNombre } from "../../Domain/ValueObjects/BarrioNombre";
import { BarrioNumeroHabitantes } from "../../Domain/ValueObjects/BarrioNumeroHabitantes";
import { BarrioNumeroPredios } from "../../Domain/ValueObjects/BarrioNumeroPredios";
import { BarrioSuperficieHa } from "../../Domain/ValueObjects/BarrioSuperficieHa.js";
import { BarrioSuperficieM2 } from "../../Domain/ValueObjects/BarrioSuperficieM2.js";
import { BarrioGeom } from "../../Domain/ValueObjects/BarrioGeom.js";
import { BarrioNotFound } from "../../Domain/Exceptions/BarrioNotFound.js";

@Injectable()
export class BarrioRepository implements IBarrioRepository {
  constructor(
    @InjectRepository(BarrioEntity)
    private readonly repository: Repository<BarrioEntity>
  ) {}

  // ==================== UTIL ======================
  private mapToDomain(entity: BarrioEntity): Barrio {
    let geomHex: string;

    if (typeof entity.geom === "object" && entity.geom !== null) {
      geomHex = wkx.Geometry.parseGeoJSON(entity.geom).toWkb().toString("hex");
    } else if (typeof entity.geom === "string") {
      geomHex = entity.geom.trim();
    } else {
      throw new Error(`Formato de geom desconocido: ${typeof entity.geom}`);
    }

    return new Barrio(
      new BarrioId(entity.id),
      new BarrioNombre(entity.nombre),
      new BarrioNumeroHabitantes(entity.numeroHabitantes),
      new BarrioNumeroPredios(entity.numeroPredios),
      new BarrioSuperficieHa(entity.superficieHa),
      new BarrioSuperficieM2(entity.superficieM2),
      new BarrioGeom(geomHex)
    );
  }

  private toPostGISGeom(barrio: Barrio): () => string {
    const geomWKB = barrio.geom.getValue();
    const geomWkt = wkx.Geometry.parse(Buffer.from(geomWKB, "hex")).toWkt();
    return () => `ST_GeomFromText('${geomWkt}', 4326)`;
  }

  // ==================== CREATE ======================
  async create(barrio: Barrio): Promise<void> {
    await this.repository.save({
      nombre: barrio.nombre.getValue(),
      numeroHabitantes: barrio.numeroHabitantes.getValue(),
      numeroPredios: barrio.numeroPredios.getValue(),
      superficieHa: barrio.superficieHa.getValue(),
      superficieM2: barrio.superficieM2.getValue(),
      geom: this.toPostGISGeom(barrio),
    });
  }

  // ==================== EDIT ======================
  async edit(barrio: Barrio): Promise<void> {
    await this.repository.update(barrio.id!.value, {
      nombre: barrio.nombre.getValue(),
      numeroHabitantes: barrio.numeroHabitantes.getValue(),
      numeroPredios: barrio.numeroPredios.getValue(),
      superficieHa: barrio.superficieHa.getValue(),
      superficieM2: barrio.superficieM2.getValue(),
      geom: this.toPostGISGeom(barrio),
    });
  }

  // ==================== DELETE ======================
  async delete(id: BarrioId): Promise<void> {
    await this.repository.delete(id.value);
  }

  // ==================== GET ALL ======================
  async getAll(): Promise<Barrio[]> {
    const entities = await this.repository.find();
    return entities.map((e) => this.mapToDomain(e));
  }

  // ==================== GET ONE BY ID ======================
  async getOneById(id: BarrioId): Promise<Barrio> {
    const entity = await this.repository.findOne({ where: { id: id.value } });
    if (!entity)
      throw new BarrioNotFound(`Barrio con id ${id.value} no encontrado`);
    return this.mapToDomain(entity);
  }

  // ==================== FIND BY NAME ======================
  async findByName(nombre: string): Promise<Barrio | null> {
    const entity = await this.repository
      .createQueryBuilder("barrio")
      .where("UPPER(barrio.nombre) = UPPER(:nombre)", { nombre })
      .getOne();

    return entity ? this.mapToDomain(entity) : null;
  }
}
