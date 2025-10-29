import { Inject, Injectable } from "@nestjs/common";
import type { IBarrioRepository } from "../Domain/Interfaces/IBarrioRepository";
import { CreateBarrioDto } from "../Infrastructure/dtos/create-barrio.dto";
import { BarrioNombre } from "../Domain/ValueObjects/BarrioNombre";
import { BarrioNumeroHabitantes } from "../Domain/ValueObjects/BarrioNumeroHabitantes";
import { BarrioNumeroPredios } from "../Domain/ValueObjects/BarrioNumeroPredios";
import { BarrioSuperficieHa } from "../Domain/ValueObjects/BarrioSuperficieHa";
import { BarrioSuperficieM2 } from "../Domain/ValueObjects/BarrioSuperficieM2";
import { BarrioGeom } from "../Domain/ValueObjects/BarrioGeom";
import { Barrio } from "../Domain/Entity/Barrio";
import { RepeatedBarrio } from "../Domain/Exceptions/RepeatedBarrio";

@Injectable()
export class BarrioCreate {
    constructor(
        @Inject('IBarrioRepository')
        private readonly repository: IBarrioRepository
    ) { }

    async run(dto: CreateBarrioDto): Promise<void> {
        // Crear Value Objects

        const barrioNombre = new BarrioNombre(dto.nombre);
        const barrioNumeroHabitantes = new BarrioNumeroHabitantes(dto.numeroHabitantes);
        const barrioNumeroPredios = new BarrioNumeroPredios(dto.numeroPredios);
        const barrioSuperficieHa = new BarrioSuperficieHa(dto.superficieHa);
        const barrioSuperficieM2 = new BarrioSuperficieM2(dto.superficieM2);
        const barrioGeom = new BarrioGeom(dto.geom);
        // Crear entidad de dominio
        const barrio = new Barrio(
            barrioNombre,
            barrioNumeroHabitantes,
            barrioNumeroPredios,
            barrioSuperficieHa,
            barrioSuperficieM2,
            barrioGeom //pasamos el Value Object, no el GeoJSON

        );

        // Verificar si ya existe
        const existente = await this.repository.findByName(barrio.nombre.getValue().toUpperCase());
        if (existente) throw new RepeatedBarrio("The Locality already exists");

        // Persistir en la base de datos
        await this.repository.create(barrio);

    }


}