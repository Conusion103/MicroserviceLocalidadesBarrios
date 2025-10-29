import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { LocalidadModule } from './lib/Localidad/Infrastucture/NestJs/localidades.module.js';
import { BarrioModule } from './lib/Barrio/Infrastructure/barrio.module.js';
// import { LocalidadesBarriosService } from './localidad-barrio/localidades-barrios.service.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,  // Esto hace que las variables de entorno estén disponibles globalmente
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.get<string>('DB_TYPE') as 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    BarrioModule,
    LocalidadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
// LocalidadesBarriosService