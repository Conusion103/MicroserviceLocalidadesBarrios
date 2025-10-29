import { Inject, Injectable } from "@nestjs/common";
import type { IBarrioRepository } from "../Domain/Interfaces/IBarrioRepository.js";
import { BarrioNotFound } from "../Domain/Exceptions/BarrioNotFound.js";
import { BarrioWithOutId } from "../Domain/Exceptions/BarrioWithOutId.js";
import { RepeatedBarrio } from "../Domain/Exceptions/RepeatedBarrio.js";
import { Barrio } from "../Domain/Entity/Barrio.js";
import { BarrioId } from "../Domain/ValueObjects/BarrioId.js";
import { BarrioNombre } from "../Domain/ValueObjects/BarrioNombre.js";
import { BarrioNumeroHabitantes } from "../Domain/ValueObjects/BarrioNumeroHabitantes.js";
import { BarrioNumeroPredios } from "../Domain/ValueObjects/BarrioNumeroPredios.js";
import { BarrioSuperficieHa } from "../Domain/ValueObjects/BarrioSuperficieHa.js";
import { BarrioSuperficieM2 } from "../Domain/ValueObjects/BarrioSuperficieM2.js";
import { BarrioGeom } from "../Domain/ValueObjects/BarrioGeom.js";
import { UpdateBarrioDto } from "../Infrastructure/dtos/update-barrio.dto.js";

@Injectable()
export class BarrioEdit {
  constructor(
    @Inject('IBarrioRepository')
    private readonly repository: IBarrioRepository
  ) { }

  /**
   * Actualiza los datos de un barrio existente.
   * Todos los campos del DTO son opcionales excepto el id.
   */
  async run(id: number, dto: UpdateBarrioDto): Promise<void> {
    if (id == null || id == undefined)
      throw new BarrioWithOutId("Neighborhood ID is mandatory");

    const barrioId = new BarrioId(id);

    // Buscar el barrio existente
    const existing = await this.repository.getOneById(barrioId);
    if (!existing)
      throw new BarrioNotFound(`Neighborhood with id ${id} not found`);


    // Crear nueva entidad combinando valores antiguos con los nuevos
    const barrioActualizado = new Barrio(
      barrioId,
      dto.nombre ? new BarrioNombre(dto.nombre) : existing.nombre,
      dto.numeroHabitantes != null
        ? new BarrioNumeroHabitantes(dto.numeroHabitantes)
        : existing.numeroHabitantes,
      dto.numeroPredios != null
        ? new BarrioNumeroPredios(dto.numeroPredios)
        : existing.numeroPredios,
      dto.superficieHa != null
        ? new BarrioSuperficieHa(dto.superficieHa)
        : existing.superficieHa,
      dto.superficieM2 != null
        ? new BarrioSuperficieM2(dto.superficieM2)
        : existing.superficieM2,
      dto.geom ? new BarrioGeom(dto.geom) : existing.geom
    );

    // Verificar si existe una localidad con el mismo nombre
    const existingName = await this.repository.findByName(barrioActualizado.nombre.getValue());
    if (existingName && existingName.id?.value !== id) {
      // Si el nombre ya existe pero no es el mismo id, lanzamos error
      throw new RepeatedBarrio("Error, this neighborhood name already exists");
    }

    // Si el nombre no está repetido, realizamos la actualización
    await this.repository.edit(barrioActualizado);
  }
}
