import { PartialType } from "@nestjs/mapped-types";
import { CreateLocalidadDto } from "./create-localidad.dto.js"; 
// Creation option to update a Locality inheriting  from class CreateLocalidadDto
export class UpdateLocalidadDto extends PartialType(CreateLocalidadDto){}
