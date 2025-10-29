import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { LocalidadEntity } from 'src/lib/Localidad/Infrastucture/NestJs/entity/localidades.entity';

@Entity('barrios')
export class BarrioEntity {
  @PrimaryGeneratedColumn({ name: 'id_barrio' })
  id: number;

  @Column({ name: 'nombre_barrio', type: 'varchar', length: 100 })
  nombre: string;

  @Column({ name: 'numero_habitantes_barrio', type: 'int' })
  numeroHabitantes: number;

  @Column({ name: 'numero_predios_barrio', type: 'int' })
  numeroPredios: number;

  @Column({ name: 'superficie_ha_barrio', type: 'numeric', precision: 15, scale: 2 })
  superficieHa: number;

  @Column({ name: 'superficie_m2_barrio', type: 'numeric', precision: 15, scale: 2 })
  superficieM2: number;

  @Column({
    name: 'geom_barrio',
    type: 'geometry',
    spatialFeatureType: 'MultiPolygon',
    srid: 4326,
  })
  geom: any;

  // 🔹 Relación inversa hacia localidades
  @ManyToMany(() => LocalidadEntity, (localidad) => localidad.barrios)
  localidades: LocalidadEntity[];
}
