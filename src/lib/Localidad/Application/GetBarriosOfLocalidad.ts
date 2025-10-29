import { Injectable } from '@nestjs/common';
import type { ILocalidadRepository } from '../Domain/Interface/ILocalidadRepository';
import { LocalidadId } from '../Domain/ValueObject/LocalidadId.js';
import { Barrio } from 'src/lib/Barrio/Domain/Entity/Barrio.js';

@Injectable()
export class GetBarriosOfLocalidad {
  constructor(private readonly localidadRepo: ILocalidadRepository) {}

  async execute(localidadId: LocalidadId): Promise<Barrio[]> {
    // 1️⃣ Validar que la localidad exista
    const localidad = await this.localidadRepo.getOneById(localidadId);
    if (!localidad) throw new Error('La localidad no existe');

    // 2️⃣ Retornar barrios relacionados
    return this.localidadRepo.getBarrios(localidadId);
  }
}
