import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalidadCreate } from '../../Application/LocalidadCreate.js';
import { LocalidadGetAll } from '../../Application/LocalidadGetAll.js';
import { LocalidadEntity } from './entity/localidades.entity.js';
import { LocalidadesController } from './localidades.controller.js';
import { LocalidadRepository } from './entity/LocalidadRepository.js';
import { LocalidadGetOneById } from '../../Application/LocalidadGetOneById.js';
import { LocalidadEdit } from '../../Application/LocalidadEdit.js';
import { LocalidadDelete } from '../../Application/LocalidadDelete.js';
import { LocalidadApplicationService } from '../../Application/LocalidadApplicationService.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocalidadEntity]), // registra la entidad en TypeORM
  ],
  controllers: [LocalidadesController],
  providers: [
    LocalidadApplicationService,
    LocalidadCreate,
    LocalidadDelete,
    LocalidadGetAll,
    LocalidadGetOneById,
    LocalidadEdit,
    {
      provide: 'ILocalidadRepository', // Puedes usar tokens para inyectar interfaces
      useClass: LocalidadRepository,   // Repositorio que implementa la interfaz
    },
  ],
  exports: [LocalidadApplicationService], // si otros módulos necesitan usarlos
})
export class LocalidadModule {}
