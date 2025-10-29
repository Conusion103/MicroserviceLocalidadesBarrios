import { Inject, Injectable } from '@nestjs/common';
import type { ILocalidadRepository } from '../Domain/Interface/ILocalidadRepository';
import type { IBarrioRepository } from 'src/lib/Barrio/Domain/Interfaces/IBarrioRepository';
import { LocalidadId } from '../Domain/ValueObject/LocalidadId.js';
import { Barrio } from 'src/lib/Barrio/Domain/Entity/Barrio';

@Injectable()
export class AddBarriosToLocalidad {
  constructor(
    @Inject('ILocalidadRepository')
    private readonly localidadRepo: ILocalidadRepository,

    @Inject('IBarrioRepository')
    private readonly barrioRepo: IBarrioRepository,
  ) {}

  async execute(localidadId: LocalidadId, barrios: Barrio[]): Promise<void> {
    // 1️⃣ Validar que se haya pasado al menos un barrio
    if (!barrios || barrios.length === 0)
      throw new Error('Debe proporcionar al menos un barrio');

    // 2️⃣ Validar que la localidad exista
    const localidad = await this.localidadRepo.getOneById(localidadId);
    if (!localidad) throw new Error('La localidad no existe');

    // 3️⃣ Validar que los barrios existan en la base de datos
    const barrioIds = barrios.map((b) => b.id);
    const barriosDB = await this.barrioRepo.getOneById(barrioIds.map((id) => id));
    if (barriosDB.length !== barrioIds.length)
      throw new Error('Uno o más barrios no existen');

    // 4️⃣ Evitar duplicados (ya asociados a la localidad)
    const actualesIds = localidad.barrios?.map((b) => b.id) || [];
    const nuevos = barriosDB.filter((b) => !actualesIds.includes(b.id));

    if (nuevos.length === 0)
      throw new Error('Todos los barrios ya están asociados a esta localidad');

    // 5️⃣ Guardar los nuevos barrios
    await this.localidadRepo.addBarrios(localidadId, nuevos);
  }
}
