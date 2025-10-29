import { Localidad } from "../Entity/Localidad";
import { LocalidadId } from "../ValueObject/LocalidadId";
import { Barrio } from "src/lib/Barrio/Domain/Entity/Barrio";

export interface ILocalidadRepository {
  // ==================== CRUD BÁSICO ======================
  create(localidad: Localidad): Promise<void>;
  edit(localidad: Localidad): Promise<void>;
  delete(id: LocalidadId): Promise<void>;
  getAll(): Promise<Localidad[]>;
  getOneById(id: LocalidadId): Promise<Localidad>;
  findByName(nombre: string): Promise<Localidad | null>;

  // ==================== RELACIONES CON BARRIOS ======================
  /**
   * Asocia un barrio a una localidad.
   * No realiza validaciones de negocio (eso va en la capa de aplicación).
   */
  addBarrioToLocalidad(localidadId: number, barrioId: number): Promise<void>;

  /**
   * Elimina la asociación entre una localidad y un barrio.
   */
  removeBarriosFromLocalidad(localidadId: number, barrioIds: number[]): Promise<void>;


  /**
   * Obtiene todos los barrios asociados a una localidad.
   */
  getBarriosByLocalidad(localidadId: number): Promise<Barrio[]>;

  /**
   * Reemplaza completamente la lista de barrios asociados a una localidad.
   */
  replaceBarriosInLocalidad(localidadId: number, barrioIds: number[]): Promise<void>;
}
