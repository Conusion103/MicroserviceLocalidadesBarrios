import { Localidad } from "../Domain/Entity/Localidad.js";
import { LocalidadesNotFound } from "../Domain/Exceptions/LocalidadesNotFound.js";
import type { ILocalidadRepository } from "../Domain/Interface/ILocalidadRepository.js";
import { Injectable, Inject } from "@nestjs/common";
@Injectable()
export class LocalidadGetAll {
      constructor(
        @Inject('ILocalidadRepository')
        private repository: ILocalidadRepository
      ) {} 

    async run(): Promise<Localidad[]> {
        const localidades = await this.repository.getAll();

        if (!localidades || localidades.length === 0) throw new LocalidadesNotFound("There aren't localities registered");
        return localidades;
    }
}