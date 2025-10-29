import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { CreateLocalidadDto } from './dtos/create-localidad.dto.js';
import { UpdateLocalidadDto } from './dtos/update-localidad.dto.js';
import { LocalidadPresenter } from './presenters/LocalidadPresenter.js';
import { LocalidadFilter } from '../../Application/filters/LocalidadFilter.js';
import { LocalidadApplicationService } from '../../Application/LocalidadApplicationService.js';

@Controller('localidades')
export class LocalidadesController {
  constructor(
    private localidadOrchestrator: LocalidadApplicationService
  ) { }


  @Get()
  async findAllLocalities() {

    try {
      const localidades = await this.localidadOrchestrator.findAllLocalities();
      return {
        status: 'success',
        data: LocalidadPresenter.toResponseList(localidades)
      };

    } catch (error) {
      // if (error.name === 'LocalidadesNotFound') {
      //   throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      // }
      throw new HttpException(
        error.message || 'Error al obtener las localidades',
        HttpStatus.BAD_REQUEST,
      )

    }


  };

  @Get(':id')
async findOneLocality(@Param('id', ParseIntPipe) id: number) {
  try {
    const localidad = await this.localidadOrchestrator.findOneLocality(id);

    // Transformamos la entidad antes de devolverla
    return {
      status: 'success',
      data: LocalidadPresenter.toResponse(localidad),
    };
  } catch (error) {
    // if (error.name === 'LocalidadNotFound') {
    //   throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    // }
    throw new HttpException(
      error.message || 'Error al obtener la localidad',
      HttpStatus.BAD_REQUEST
    );
  }
}

@Post()
async createLocality(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) dto: CreateLocalidadDto) {
  try {
  
    const localidad = await this.localidadOrchestrator.createLocality(dto);

    return { status: 'success', data: localidad };

  } catch (error) {
    // if (error.name === 'RepeatedLocalidad') {
    //   throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    // }
    throw new HttpException(
      error.message || 'Error al crear la localidad', 
      HttpStatus.BAD_REQUEST)
  }
}


@Put(':id')
async updateLocalidad(
  @Param('id', ParseIntPipe) id: number,
  @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) dto: UpdateLocalidadDto
): Promise<void> {
  try {
    // Filtramos y limpiamos el DTO antes de enviarlo al caso de uso
    const filteredDto = LocalidadFilter.filterUpdate(dto);

    await this.localidadOrchestrator.updateLocalidad(id,filteredDto);

  } catch (error) {
    // if (error.name === 'LocalidadNotFound' || error.name === 'LocalidadWithOutId') {
    //   throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    // }
    throw new HttpException(
      error.message || 'Error al actualizar la localidad',
      HttpStatus.BAD_REQUEST
    );
  }
}


@Delete(':id')
async deleteLocalidad(@Param('id', ParseIntPipe) id: number): Promise<void> {
  try {
    await this.localidadOrchestrator.deleteOneById(id);
  } catch (error) {
    if (error.name === 'LocalidadNotFound') {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
    throw new HttpException(error.message || 'Error al eliminar la localidad', HttpStatus.BAD_REQUEST);
  }
}
}

// @Controller('localidad') // Ruta base: /localidades
// export class LocalidadController {
//   constructor(private readonly localidadService: LocalidadService) {}

//   // Ruta para obtener todas las localidades
//   @Get()
//   async findAll() {
//     return this.localidadService.findAll();
//   }

//   // Ruta para obtener una localidad por ID
//   @Get(':id')
//   async findOne(@Param('id', ParseIntPipe) id: number) {
//     return this.localidadService.findOne(id);
//   }

//   // Ruta para crear una localidad
//   @Post()
//   async create(@Body(new ValidationPipe()) createLocalidadDto: CreateLocalidadDto) {
//     return this.localidadService.create(createLocalidadDto);
//   }

//   // Ruta para actualizar una localidad por ID
//   @Put(':id')
//   async update(
//     @Param('id', ParseIntPipe) id: number,
//     @Body(new ValidationPipe()) updateLocalidadDto: UpdateLocalidadDto,
//   ) {
//     return this.localidadService.update(id, updateLocalidadDto);
//   }

//   // Ruta para eliminar una localidad por ID
//   @Delete(':id')
//   async remove(@Param('id', ParseIntPipe) id: number) {
//     return this.localidadService.remove(id);
//   }
// }
