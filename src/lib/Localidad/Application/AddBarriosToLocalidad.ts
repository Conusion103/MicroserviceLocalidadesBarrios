import { Inject, Injectable } from '@nestjs/common';
import type { ILocalidadRepository } from '../Domain/Interface/ILocalidadRepository';
import type { IBarrioRepository } from 'src/lib/Barrio/Domain/Interfaces/IBarrioRepository';
import { LocalidadId } from '../Domain/ValueObject/LocalidadId.js';

import { AddBarriosToLocalidadDto } from '../Infrastucture/NestJs/dtos/create-localidad-barrio.dto';

@Injectable()
export class AddBarriosToLocalidad {
  constructor(
    @Inject('ILocalidadRepository')
    private readonly localidadRepo: ILocalidadRepository,

    @Inject('IBarrioRepository')
    private readonly barrioRepo: IBarrioRepository,
  ) {}

  async execute(localidadId: LocalidadId, dto: AddBarriosToLocalidadDto): Promise<void> {
  if (!localidadId.value) throw new Error('El ID de la localidad no puede ser nulo o indefinido');
  if (!dto.barrioIds || dto.barrioIds.length === 0)
    throw new Error('Debe proporcionar al menos un barrio');

  const localidad = await this.localidadRepo.getOneById(localidadId);
  if (!localidad) throw new Error('La localidad no existe');

  const barriosDB = await this.barrioRepo.getManyByIds(dto.barrioIds);
  if (barriosDB.length !== dto.barrioIds.length)
    throw new Error('Uno o más barrios no existen');

  const actuales = await this.localidadRepo.getBarriosByLocalidad(localidadId.value);
  const actualesIds = actuales.map((b) => b.id!.value);

  const nuevos = barriosDB.filter((b) => b.id !== undefined && !actualesIds.includes(b.id.value));
  if (nuevos.length === 0)
    throw new Error('Todos los barrios ya están asociados a esta localidad');

  await this.localidadRepo.replaceBarriosInLocalidad(
    localidadId.value,
    nuevos.map((b) => b.id!.value)
  );
}

}
