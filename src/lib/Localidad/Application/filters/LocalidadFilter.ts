import { UpdateLocalidadDto } from "../../Infrastucture/NestJs/dtos/update-localidad.dto";

export class LocalidadFilter {
  /**
   * Filtra y valida los datos para actualizar una localidad.
   * Elimina propiedades undefined y transforma strings vacíos a null.
   */
  static filterUpdate(dto: UpdateLocalidadDto): UpdateLocalidadDto {
    const filtered: Partial<UpdateLocalidadDto> = {};

    if (dto.nombre?.trim()) filtered.nombre = dto.nombre.trim();
    if (dto.superficieHa !== undefined && dto.superficieHa !== null)
      filtered.superficieHa = dto.superficieHa;
    if (dto.superficieM2 !== undefined && dto.superficieM2 !== null)
      filtered.superficieM2 = dto.superficieM2;
    if (dto.geom) filtered.geom = dto.geom.trim();

    return filtered as UpdateLocalidadDto;
  }
}
