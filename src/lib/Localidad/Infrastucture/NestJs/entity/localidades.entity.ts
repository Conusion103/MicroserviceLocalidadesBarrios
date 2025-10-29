import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { BarrioEntity } from 'src/lib/Barrio/Infrastructure/entity/barrios.entity';

@Entity('localidades')
export class LocalidadEntity {
  @PrimaryGeneratedColumn({ name: 'id_localidad' })
  id: number;

  @Column({ name: 'nombre_localidad', type: 'varchar', length: 100 })
  nombre: string;

  @Column({ name: 'superficie_ha_localidad', type: 'numeric', precision: 15, scale: 2 })
  superficieHa: number;

  @Column({ name: 'superficie_m2_localidad', type: 'numeric', precision: 15, scale: 2 })
  superficieM2: number;

  @Column({
    name: 'geom_localidad',
    type: 'geometry',
    spatialFeatureType: 'MultiPolygon',
    srid: 4326,
  })
  geom: any;

  // 🔹 Relación muchos a muchos con barrios (controla la tabla pivote)
  @ManyToMany(() => BarrioEntity, (barrio) => barrio.localidades)
  @JoinTable({
    name: 'localidades_barrios', // nombre de la tabla pivote
    joinColumn: { name: 'id_localidad', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'id_barrio', referencedColumnName: 'id' },
  })
  barrios: BarrioEntity[];
}
