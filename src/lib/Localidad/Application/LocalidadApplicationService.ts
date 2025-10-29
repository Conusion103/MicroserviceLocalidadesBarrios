import { LocalidadCreate } from "./LocalidadCreate";
import { LocalidadEdit } from "./LocalidadEdit";
import { LocalidadGetAll } from "./LocalidadGetAll";
import { LocalidadGetOneById } from "./LocalidadGetOneById";
import { LocalidadDelete } from "./LocalidadDelete";
import { CreateLocalidadDto } from "../Infrastucture/NestJs/dtos/create-localidad.dto";
import { UpdateLocalidadDto } from "../Infrastucture/NestJs/dtos/update-localidad.dto";
import { Injectable } from "@nestjs/common";
@Injectable()
export class LocalidadApplicationService {
    constructor(
        private readonly localidadCreate: LocalidadCreate,
        private readonly localidadGetAll: LocalidadGetAll,
        private readonly localidadEdit: LocalidadEdit,
        private readonly localidadGetOneById: LocalidadGetOneById,
        private readonly localidadDelete: LocalidadDelete
    ) { }

    async createLocality(dto: CreateLocalidadDto) {
        return this.localidadCreate.run(dto);
    }

    async findAllLocalities() {
        return this.localidadGetAll.run();
    }

    async updateLocalidad(id: number, dto: UpdateLocalidadDto) {
        return this.localidadEdit.run(id, dto);
    }

    async findOneLocality(id: number) {
        return this.localidadGetOneById.run(id);
    }

    async deleteOneById(id: number){
        return this.localidadDelete.run(id);
    }


}