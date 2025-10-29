import { Injectable } from "@nestjs/common";
import { LocalidadCreate } from "./LocalidadCreate";
import { LocalidadEdit } from "./LocalidadEdit";
import { LocalidadGetAll } from "./LocalidadGetAll";
import { LocalidadGetOneById } from "./LocalidadGetOneById";
import { LocalidadDelete } from "./LocalidadDelete";

import { AddBarriosToLocalidad } from "./AddBarriosToLocalidad";
import { RemoveBarriosFromLocalidad } from "./RemoveBarriosFromLocalidad";
import { GetBarriosByLocalidad } from "./GetBarriosOfLocalidad";

import { CreateLocalidadDto } from "../Infrastucture/NestJs/dtos/create-localidad.dto";
import { UpdateLocalidadDto } from "../Infrastucture/NestJs/dtos/update-localidad.dto";
import { AddBarriosToLocalidadDto } from "../Infrastucture/NestJs/dtos/create-localidad-barrio.dto";
import { LocalidadId } from "../Domain/ValueObject/LocalidadId";

@Injectable()
export class LocalidadApplicationService {
  constructor(
    private readonly localidadCreate: LocalidadCreate,
    private readonly localidadGetAll: LocalidadGetAll,
    private readonly localidadEdit: LocalidadEdit,
    private readonly localidadGetOneById: LocalidadGetOneById,
    private readonly localidadDelete: LocalidadDelete,
    private readonly addBarriosToLocalidadUseCase: AddBarriosToLocalidad,
    private readonly removeBarriosFromLocalidadUseCase: RemoveBarriosFromLocalidad,
    private readonly getBarriosByLocalidadUseCase: GetBarriosByLocalidad,
  ) {}

  // ==================== CRUD LOCALIDAD ====================

  async createLocality(dto: CreateLocalidadDto) {
    return this.localidadCreate.run(dto);
  }

  async findAllLocalities() {
    return this.localidadGetAll.run();
  }

  async updateLocalidad(id: number, dto: UpdateLocalidadDto) {
    return this.localidadEdit.run(id, dto);
  }

  async findOneLocality(id: number) {
    return this.localidadGetOneById.run(id);
  }

  async deleteOneById(id: number) {
    return this.localidadDelete.run(id);
  }

  // ==================== RELACIÓN LOCALIDAD - BARRIOS ====================

  async addBarriosToLocalidad(id: number, dto: AddBarriosToLocalidadDto) {
    const localidadId = new LocalidadId(id);
    await this.addBarriosToLocalidadUseCase.execute(localidadId, dto);
  }

  async removeBarriosFromLocalidad(id: number, dto: AddBarriosToLocalidadDto) {
    const localidadId = new LocalidadId(id);
    await this.removeBarriosFromLocalidadUseCase.execute(localidadId, dto);
  }

  async getBarriosByLocalidad(id: number) {
    const localidadId = new LocalidadId(id);
    return this.getBarriosByLocalidadUseCase.execute(localidadId);
  }
}
