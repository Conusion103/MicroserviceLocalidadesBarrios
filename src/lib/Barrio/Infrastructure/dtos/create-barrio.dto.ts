import { 
  IsString, 
  IsNotEmpty, 
  IsNumber, 
  IsPositive, 
  IsInt, 
  MaxLength 
} from 'class-validator';

export class CreateBarrioDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del barrio es obligatorio.' })
  @MaxLength(100, { message: 'El nombre del barrio no puede superar los 100 caracteres.' })
  nombre: string;

  @IsNumber()
  @IsInt({ message: 'El número de habitantes debe ser un número entero.' })
  @IsPositive({ message: 'El número de habitantes debe ser mayor que 0.' })
  @IsNotEmpty({ message: 'El número de habitantes es obligatorio.' })
  numeroHabitantes: number;

  @IsNumber()
  @IsInt({ message: 'El número de predios debe ser un número entero.' })
  @IsPositive({ message: 'El número de predios debe ser mayor que 0.' })
  @IsNotEmpty({ message: 'El número de predios es obligatorio.' })
  numeroPredios: number;

  @IsNumber()
  @IsPositive({ message: 'La superficie en hectáreas debe ser un número positivo.' })
  superficieHa: number;

  @IsNumber()
  @IsPositive({ message: 'La superficie en metros cuadrados debe ser un número positivo.' })
  superficieM2: number;

  @IsString()
  @IsNotEmpty({ message: 'La geometría del barrio es obligatoria.' })
  geom: string;
}
