// src/lib/Localidad/Application/DTO/AddBarriosToLocalidad.dto.ts
import { IsArray, ArrayNotEmpty, IsInt } from 'class-validator';

export class AddBarriosToLocalidadDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  readonly barrioIds: number[];
}
