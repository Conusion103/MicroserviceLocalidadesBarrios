import type { ILocalidadRepository } from "../Domain/Interface/ILocalidadRepository.js";
import { LocalidadNotFound } from "../Domain/Exceptions/LocalidadNotFound.js";
import { LocalidadWithOutId } from "../Domain/Exceptions/LocalidadWithOutId.js";
import { Localidad } from "../Domain/Entity/Localidad.js";
import { LocalidadId } from "../Domain/ValueObject/LocalidadId.js";
import { LocalidadNombre } from "../Domain/ValueObject/LocalidadNombre.js";
import { LocalidadSuperficieHa } from "../Domain/ValueObject/LocalidadSuperficieHa.js";
import { LocalidadSuperficieM2 } from "../Domain/ValueObject/LocalidadSuperficieM2.js";
import { LocalidadGeom } from "../Domain/ValueObject/LocalidadGeom.js";
import { UpdateLocalidadDto } from "../Infrastucture/NestJs/dtos/update-localidad.dto.js";
import { Inject, Injectable } from "@nestjs/common";
import { RepeatedLocalidad } from "../Domain/Exceptions/RepeatedLocalidad.js";
@Injectable()
export class LocalidadEdit {
  constructor(
    @Inject('ILocalidadRepository')
    private repository: ILocalidadRepository
  ) {}

  async run(id: number, dto: UpdateLocalidadDto): Promise<void> {
    if (id == null || id == undefined) throw new LocalidadWithOutId("The Locality Id is mandatory");

    const localidadId = new LocalidadId(id);

    // Buscar la entidad existente
    const existing = await this.repository.getOneById(localidadId);
    if (!existing) throw new LocalidadNotFound(`Localidad with id ${id} not found`);

    // Crear nueva entidad combinando valores existentes y actualizados
    const localidadActualizada = new Localidad(
      localidadId,
      dto.nombre ? new LocalidadNombre(dto.nombre) : existing.nombre,
      dto.superficieHa != null ? new LocalidadSuperficieHa(dto.superficieHa) : existing.superficieHa,
      dto.superficieM2 != null ? new LocalidadSuperficieM2(dto.superficieM2) : existing.superficieM2,
      dto.geom ? new LocalidadGeom(JSON.stringify(dto.geom)) : existing.geom
    );

    // Verificar si existe una localidad con el mismo nombre
    const existingName = await this.repository.findByName(localidadActualizada.nombre.getValue());
    if (existingName && existingName.id?.value !== id) {
      // Si el nombre ya existe pero no es el mismo id, lanzamos error
      throw new RepeatedLocalidad("Error, this locality name already exists");
    }

    // Si el nombre no está repetido, realizamos la actualización
    await this.repository.edit(localidadActualizada);
  }
}
