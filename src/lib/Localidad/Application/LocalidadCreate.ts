import { Injectable, Inject } from "@nestjs/common";
import type { ILocalidadRepository } from "../Domain/Interface/ILocalidadRepository.js";
import { Localidad } from "../Domain/Entity/Localidad.js";
import { LocalidadNombre } from "../Domain/ValueObject/LocalidadNombre.js";
import { LocalidadSuperficieHa } from "../Domain/ValueObject/LocalidadSuperficieHa.js";
import { LocalidadSuperficieM2 } from "../Domain/ValueObject/LocalidadSuperficieM2.js";
import { LocalidadGeom } from "../Domain/ValueObject/LocalidadGeom.js";
import { RepeatedLocalidad } from "../Domain/Exceptions/RepeatedLocalidad.js";
import { CreateLocalidadDto } from "../Infrastucture/NestJs/dtos/create-localidad.dto.js";

@Injectable()
export class LocalidadCreate {
  constructor(
    @Inject('ILocalidadRepository')
    private readonly repository: ILocalidadRepository
  ) {}

  async run(dto: CreateLocalidadDto): Promise<void> {
    // Crear Value Objects
    const localidadNombre = new LocalidadNombre(dto.nombre);
    const localidadSuperficieHa = new LocalidadSuperficieHa(dto.superficieHa);
    const localidadSuperficieM2 = new LocalidadSuperficieM2(dto.superficieM2);
    const localidadGeom = new LocalidadGeom(dto.geom); 

    // Crear entidad de dominio
    const localidad = new Localidad(
      localidadNombre,
      localidadSuperficieHa,
      localidadSuperficieM2,
      localidadGeom //pasamos el Value Object, no el GeoJSON
    );

    // Verificar si ya existe
    const existente = await this.repository.findByName(localidad.nombre.getValue().toUpperCase());
    if (existente) throw new RepeatedLocalidad("The Locality already exists");

    // Persistir en la base de datos
    await this.repository.create(localidad);
  }
}
