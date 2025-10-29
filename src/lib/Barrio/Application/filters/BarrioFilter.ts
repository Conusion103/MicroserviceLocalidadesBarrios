import { UpdateBarrioDto } from "../../Infrastructure/dtos/update-barrio.dto";
export class BarrioFilter {
  /**
   * Filtra y valida los datos para actualizar un barrio.
   * Elimina propiedades undefined y transforma strings vacíos a null.
   */
  static filterUpdate(dto: UpdateBarrioDto): UpdateBarrioDto {
    const filtered: Partial<UpdateBarrioDto> = {};

    if (dto.nombre?.trim()) filtered.nombre = dto.nombre.trim();
    if (dto.numeroHabitantes !== undefined && dto.numeroHabitantes !== null)
      filtered.numeroHabitantes = dto.numeroHabitantes;
    if (dto.numeroPredios !== undefined && dto.numeroPredios !== null)
      filtered.numeroPredios = dto.numeroPredios;
    if (dto.superficieHa !== undefined && dto.superficieHa !== null)
      filtered.superficieHa = dto.superficieHa;
    if (dto.superficieM2 !== undefined && dto.superficieM2 !== null)
      filtered.superficieM2 = dto.superficieM2;
    if (dto.geom) {
      filtered.geom =
        typeof dto.geom === "string" ? dto.geom.trim() : JSON.stringify(dto.geom);
    }

    return filtered as UpdateBarrioDto;
  }
}
