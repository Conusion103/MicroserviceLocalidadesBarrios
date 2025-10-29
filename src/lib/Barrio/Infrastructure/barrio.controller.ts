import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { CreateBarrioDto } from './dtos/create-barrio.dto.js';
import { UpdateBarrioDto } from './dtos/update-barrio.dto.js';
import { BarrioPresenter } from './presenters/BarrioPresenter.js';
import { BarrioFilter } from '../Application/filters/BarrioFilter.js';
import { BarrioApplicationService } from '../Application/BarrioApplicationService.js';

@Controller('barrios')
export class BarriosController {
  constructor(
    private barrioOrchestrator: BarrioApplicationService
  ) { }

  @Get()
  async findAllBarrios() {
    try {
      const barrios = await this.barrioOrchestrator.findAllNeighborhoods();
      return {
        status: 'success',
        data: BarrioPresenter.toResponseList(barrios),
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al obtener los barrios',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  async findOneBarrio(@Param('id', ParseIntPipe) id: number) {
    try {
      const barrio = await this.barrioOrchestrator.findOneNeighborhood(id);
      return {
        status: 'success',
        data: BarrioPresenter.toResponse(barrio),
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al obtener el barrio',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  async createBarrio(@Body() dto: CreateBarrioDto) {
    try {
      const filteredDto = BarrioFilter.filterUpdate(dto);
      const barrio = await this.barrioOrchestrator.createNeighborhood(dto);
      return { status: 'success', data: barrio };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al crear el barrio',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  async updateBarrio(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) dto: UpdateBarrioDto
  ): Promise<void> {
    try {
      const filteredDto = BarrioFilter.filterUpdate(dto);
      await this.barrioOrchestrator.updateNeighborhood(id, filteredDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al actualizar el barrio',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async deleteBarrio(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.barrioOrchestrator.deleteOneById(id);
    } catch (error) {
      if (error.name === 'BarrioNotFound') {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message || 'Error al eliminar el barrio', HttpStatus.BAD_REQUEST);
    }
  }
}
