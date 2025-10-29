import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarrioCreate } from '../Application/BarrioCreate.js';
import { BarrioGetAll } from '../Application/BarrioGetAll.js';
import { BarrioEntity } from './entity/barrios.entity.js';
import { BarriosController } from './barrio.controller.js';
import { BarrioRepository } from './entity/BarrioRepository.js';
import { BarrioGetOneById } from '../Application/BarrioGetOneById.js';
import { BarrioEdit } from '../Application/BarrioEdit.js';
import { BarrioDelete } from '../Application/BarrioDelete.js';
import { BarrioApplicationService } from '../Application/BarrioApplicationService.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([BarrioEntity]), // registra la entidad en TypeORM
  ],
  controllers: [BarriosController],
  providers: [
    BarrioApplicationService,
    BarrioCreate,
    BarrioDelete,
    BarrioGetAll,
    BarrioGetOneById,
    BarrioEdit,
    {
      provide: 'IBarrioRepository', // Token para la interfaz
      useClass: BarrioRepository,   // Implementación del repositorio
    },
  ],
  exports: [BarrioApplicationService], // si otros módulos necesitan inyectarlo
})
export class BarrioModule {}
