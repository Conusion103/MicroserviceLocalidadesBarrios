import { Injectable } from "@nestjs/common";
import { BarrioCreate } from "./BarrioCreate";
import { BarrioEdit } from "./BarrioEdit";
import { BarrioGetAll } from "./BarrioGetAll";
import { BarrioGetOneById } from "./BarrioGetOneById";
import { BarrioDelete } from "./BarrioDelete";
import { CreateBarrioDto } from "../Infrastructure/dtos/create-barrio.dto";
import { UpdateBarrioDto } from "../Infrastructure/dtos/update-barrio.dto";

@Injectable()
export class BarrioApplicationService {
  constructor(
    private readonly barrioCreate: BarrioCreate,
    private readonly barrioGetAll: BarrioGetAll,
    private readonly barrioEdit: BarrioEdit,
    private readonly barrioGetOneById: BarrioGetOneById,
    private readonly barrioDelete: BarrioDelete
  ) {}

  async createNeighborhood(dto: CreateBarrioDto) {
    return this.barrioCreate.run(dto);
  }

  async findAllNeighborhoods() {
    return this.barrioGetAll.run();
  }

  async updateNeighborhood(id: number, dto: UpdateBarrioDto) {
    return this.barrioEdit.run(id, dto);
  }

  async findOneNeighborhood(id: number) {
    return this.barrioGetOneById.run(id);
  }

  async deleteOneById(id: number) {
    return this.barrioDelete.run(id);
  }
}
