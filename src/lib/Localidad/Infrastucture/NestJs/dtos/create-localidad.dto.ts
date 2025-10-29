import { IsString, IsNotEmpty, IsNumber, IsOptional, IsPositive, MaxLength } from 'class-validator';

export class CreateLocalidadDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la localidad es obligatorio.' })
  @MaxLength(100, { message: 'El nombre de la localidad no puede superar los 100 caracteres.' })
  nombre: string;

  @IsNumber()
  @IsPositive({ message: 'La superficie en hectáreas debe ser un número positivo.' })
  superficieHa: number;

  @IsNumber()
  @IsPositive({ message: 'La superficie en metros cuadrados debe ser un número positivo.' })
  superficieM2: number;

  @IsString()
  @IsNotEmpty({ message: 'La geometría de la localidad es obligatoria.' })
  geom: string;
}
