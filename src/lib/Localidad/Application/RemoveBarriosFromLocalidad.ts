import { Inject, Injectable } from '@nestjs/common';
import type { ILocalidadRepository } from '../Domain/Interface/ILocalidadRepository';
import { LocalidadId } from '../Domain/ValueObject/LocalidadId.js';
import { AddBarriosToLocalidadDto } from '../Infrastucture/NestJs/dtos/create-localidad-barrio.dto.js';

@Injectable()
export class RemoveBarriosFromLocalidad {
  constructor(
    @Inject('ILocalidadRepository')
    private readonly repository: ILocalidadRepository
  ) {}

  async execute(localidadId: LocalidadId, dto: AddBarriosToLocalidadDto): Promise<void> {
    if (!localidadId.value) throw new Error('El ID de la localidad no puede ser nulo o indefinido');
    if (!dto.barrioIds || dto.barrioIds.length === 0) throw new Error('No se proporcionaron barrios');

    const localidad = await this.repository.getOneById(localidadId);
    if (!localidad) throw new Error('La localidad no existe');

    await this.repository.removeBarriosFromLocalidad(localidadId.value, dto.barrioIds);
  }
}
