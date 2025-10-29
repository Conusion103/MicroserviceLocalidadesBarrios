import { PartialType } from "@nestjs/mapped-types";
import { CreateBarrioDto } from "./create-barrio.dto"; 
// Creation option to update a Locality inheriting  from class CreateLocalidadDto
export class UpdateBarrioDto extends PartialType(CreateBarrioDto){}
