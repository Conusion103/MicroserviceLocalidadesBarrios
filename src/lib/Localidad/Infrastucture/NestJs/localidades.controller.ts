import { 
  Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, ValidationPipe, HttpException, HttpStatus 
} from '@nestjs/common';
import { LocalidadApplicationService } from '../../Application/LocalidadApplicationService.js';
import { CreateLocalidadDto } from './dtos/create-localidad.dto.js';
import { UpdateLocalidadDto } from './dtos/update-localidad.dto.js';
import { AddBarriosToLocalidadDto } from './dtos/create-localidad-barrio.dto.js';
import { LocalidadPresenter } from './presenters/LocalidadPresenter.js';

@Controller('localidades')
export class LocalidadesController {
  constructor(
    private readonly localidadService: LocalidadApplicationService
  ) {}

  // ====================== CRUD LOCALIDADES ======================

  @Get()
  async findAllLocalities() {
    try {
      const localidades = await this.localidadService.findAllLocalities();
      return { status: 'success', data: LocalidadPresenter.toResponseList(localidades) };
    } catch (error) {
      throw new HttpException(error.message || 'Error al obtener las localidades', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOneLocality(@Param('id', ParseIntPipe) id: number) {
    try {
      const localidad = await this.localidadService.findOneLocality(id);
      return { status: 'success', data: LocalidadPresenter.toResponse(localidad) };
    } catch (error) {
      throw new HttpException(error.message || 'Error al obtener la localidad', HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async createLocality(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) dto: CreateLocalidadDto
  ) {
    try {
      const localidad = await this.localidadService.createLocality(dto);
      return { status: 'success', data: localidad };
    } catch (error) {
      throw new HttpException(error.message || 'Error al crear la localidad', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async updateLocalidad(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) dto: UpdateLocalidadDto
  ) {
    try {
      await this.localidadService.updateLocalidad(id, dto);
      return { status: 'success', message: 'Localidad actualizada correctamente' };
    } catch (error) {
      throw new HttpException(error.message || 'Error al actualizar la localidad', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteLocalidad(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.localidadService.deleteOneById(id);
      return { status: 'success', message: 'Localidad eliminada correctamente' };
    } catch (error) {
      throw new HttpException(error.message || 'Error al eliminar la localidad', HttpStatus.BAD_REQUEST);
    }
  }

  // ====================== BARRIOS ======================

  @Post(':id/barrios')
  async addBarriosToLocalidad(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) dto: AddBarriosToLocalidadDto
  ) {
    try {
      await this.localidadService.addBarriosToLocalidad(id, dto);
      return { status: 'success', message: 'Barrios agregados correctamente' };
    } catch (error) {
      throw new HttpException(error.message || 'Error al agregar barrios', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id/barrios')
  async removeBarriosFromLocalidad(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) dto: AddBarriosToLocalidadDto
  ) {
    try {
      await this.localidadService.removeBarriosFromLocalidad(id, dto);
      return { status: 'success', message: 'Barrios eliminados correctamente' };
    } catch (error) {
      throw new HttpException(error.message || 'Error al eliminar barrios', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id/barrios')
  async getBarriosByLocalidad(@Param('id', ParseIntPipe) id: number) {
    try {
      const barrios = await this.localidadService.getBarriosByLocalidad(id);
      return { status: 'success', data: barrios };
    } catch (error) {
      throw new HttpException(error.message || 'Error al obtener los barrios', HttpStatus.BAD_REQUEST);
    }
  }
}
