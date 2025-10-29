import { LocalidadId } from "../Domain/ValueObject/LocalidadId.js";
import type { ILocalidadRepository } from "../Domain/Interface/ILocalidadRepository.js";
import { LocalidadesNotFound } from "../Domain/Exceptions/LocalidadesNotFound.js";
import { LocalidadNotFound } from "../Domain/Exceptions/LocalidadNotFound.js";
import { Inject, Injectable } from "@nestjs/common";
@Injectable()
export class LocalidadDelete {
  constructor(
    @Inject('ILocalidadRepository')
    private repository: ILocalidadRepository) {}

  async run(id: number): Promise<void> {
    // Verificar si hay localidades registradas
    const full = await this.repository.getAll();
    if (!full || full.length === 0) {
      throw new LocalidadesNotFound("There aren't localities registered");
    }
    const localidadId = new LocalidadId(id)
    // Verificar si la localidad a eliminar existe por id
    const existing = await this.repository.getOneById(localidadId);
    if (!existing) {
      throw new LocalidadNotFound(
        `The locality with id ${id} doesn't exist`
      );
    }

    // Eliminar la localidad
    await this.repository.delete(new LocalidadId(id));
  }
}
