import { Inject, Injectable } from "@nestjs/common";
import { BarrioId } from "../Domain/ValueObjects/BarrioId.js";
import type { IBarrioRepository } from "../Domain/Interfaces/IBarrioRepository.js";
import { BarriosNotFound } from "../Domain/Exceptions/BarriosNotFound.js";
import { BarrioNotFound } from "../Domain/Exceptions/BarrioNotFound.js";

@Injectable()
export class BarrioDelete {
  constructor(
    @Inject('IBarrioRepository')
    private readonly repository: IBarrioRepository
  ) {}

  async run(id: number): Promise<void> {
    // Verificar si hay barrios registrados
    const all = await this.repository.getAll();
    if (!all || all.length === 0) {
      throw new BarriosNotFound("There are no registered neighborhoods");
    }

    const barrioId = new BarrioId(id);

    // Verificar si el barrio a eliminar existe por id
    const existing = await this.repository.getOneById(barrioId);
    if (!existing) {
      throw new BarrioNotFound(`The neighborhood with id ${id} does not exist`);
    }

    // Eliminar el barrio
    await this.repository.delete(barrioId);
  }
}
