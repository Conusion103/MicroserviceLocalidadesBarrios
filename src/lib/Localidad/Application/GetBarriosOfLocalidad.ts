import { Inject, Injectable } from '@nestjs/common';
import type { ILocalidadRepository } from '../Domain/Interface/ILocalidadRepository';
import { LocalidadId } from '../Domain/ValueObject/LocalidadId.js';
import { Barrio } from 'src/lib/Barrio/Domain/Entity/Barrio.js';

@Injectable()
export class GetBarriosByLocalidad {
  constructor(
    @Inject('ILocalidadRepository')
    private readonly repository: ILocalidadRepository
  ) {}

  async execute(localidadId: LocalidadId): Promise<Barrio[]> {
    if (!localidadId.value) throw new Error('El ID de la localidad no puede ser nulo o indefinido');

    // Validar que la localidad exista
    const localidad = await this.repository.getOneById(localidadId);
    if (!localidad) throw new Error('La localidad no existe');

    // Obtener los barrios asociados
    const barrios = await this.repository.getBarriosByLocalidad(localidadId.value);

    return barrios;
  }
}
