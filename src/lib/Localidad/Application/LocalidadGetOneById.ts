import { Inject, Injectable } from "@nestjs/common";
import { Localidad } from "../Domain/Entity/Localidad.js";
import { LocalidadNotFound } from "../Domain/Exceptions/LocalidadNotFound.js";
import type { ILocalidadRepository } from "../Domain/Interface/ILocalidadRepository.js";
import { LocalidadId } from "../Domain/ValueObject/LocalidadId.js";
@Injectable()
export class LocalidadGetOneById{
    constructor(
        @Inject('ILocalidadRepository')
        private repository: ILocalidadRepository){}
    async run(id: number): Promise<Localidad>{
        const localidad = await this.repository.getOneById(new LocalidadId(id));

        if(!localidad) throw new LocalidadNotFound('Locality not found')
        return localidad;    
        

    }

}