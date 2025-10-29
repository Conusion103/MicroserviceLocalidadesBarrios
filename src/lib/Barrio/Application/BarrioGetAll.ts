import { Injectable, Inject } from "@nestjs/common";
import { Barrio } from "src/lib/Barrio/Domain/Entity/Barrio.js";
import { BarriosNotFound } from "../Domain/Exceptions/BarriosNotFound";
import type { IBarrioRepository } from "src/lib/Barrio/Domain/Interfaces/IBarrioRepository";

@Injectable()
export class BarrioGetAll {
  constructor(
    @Inject('IBarrioRepository')
    private readonly repository: IBarrioRepository
  ) {}

  async run(): Promise<Barrio[]> {
    const barrios = await this.repository.getAll();

    if (!barrios || barrios.length === 0) {
      throw new BarriosNotFound("There aren't neighborhoods registered");
    }

    return barrios;
  }
}