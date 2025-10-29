import { Inject, Injectable } from "@nestjs/common";
import { Barrio } from "../Domain/Entity/Barrio.js";
import { BarrioNotFound } from "../Domain/Exceptions/BarrioNotFound.js";
import type { IBarrioRepository } from "../Domain/Interfaces/IBarrioRepository.js";
import { BarrioId } from "../Domain/ValueObjects/BarrioId.js";

@Injectable()
export class BarrioGetOneById {
  constructor(
    @Inject('IBarrioRepository')
    private readonly repository: IBarrioRepository
  ) {}

  async run(id: number): Promise<Barrio> {
    const barrio = await this.repository.getOneById(new BarrioId(id));

    if (!barrio) throw new BarrioNotFound(`Barrio with id ${id} not found`);

    return barrio;
  }
}
