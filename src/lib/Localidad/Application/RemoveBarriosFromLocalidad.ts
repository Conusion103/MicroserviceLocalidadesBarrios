import { Inject, Injectable } from '@nestjs/common';
import type { ILocalidadRepository } from '../Domain/Interface/ILocalidadRepository';
import { LocalidadId } from '../Domain/ValueObject/LocalidadId.js';
import { Barrio } from 'src/lib/Barrio/Domain/Entity/Barrio.js';

@Injectable()
export class RemoveBarriosFromLocalidad {
    constructor(
        @Inject('ILocalidadRepository')
        private readonly repository: ILocalidadRepository
    ) { }
    async execute(localidadId: LocalidadId, barrios: Barrio[]): Promise<void> {
        // 1️⃣ Validar que la localidad exista
        const localidad = await this.repository.getOneById(localidadId);
        if (!localidad) throw new Error('La localidad no existe');

        // 2️⃣ Validar que haya barrios a remover
        if (!barrios || barrios.length === 0) throw new Error('No se proporcionaron barrios');

        // 3️⃣ Quitar barrios usando el repositorio
        await this.repository.removeBarrios(localidadId, barrios);
    }
}
