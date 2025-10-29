import { Barrio } from "../Entity/Barrio.js";
import { BarrioId } from "../ValueObjects/BarrioId.js";

export interface IBarrioRepository {
    create(barrio: Barrio): Promise<void>;
    getAll(): Promise<Barrio[]>;
    getOneById(id: BarrioId): Promise<Barrio>;
    edit(barrio: Barrio): Promise<void>;
    delete(id: BarrioId): Promise<void>;
    findByName(nombre: string): Promise<Barrio | null>;
    getManyByIds(ids: number[]): Promise<Barrio[]>;
}


