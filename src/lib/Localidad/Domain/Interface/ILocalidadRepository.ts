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
  addBarrioToLocalidad(localidadId: string, barrioId: string): Promise<void>;

  /**
   * Elimina la asociación entre una localidad y un barrio.
   */
  removeBarrioFromLocalidad(localidadId: string, barrioId: string): Promise<void>;

  /**
   * Obtiene todos los barrios asociados a una localidad.
   */
  getBarriosByLocalidad(localidadId: string): Promise<Barrio[]>;

  /**
   * Reemplaza completamente la lista de barrios asociados a una localidad.
   */
  replaceBarriosInLocalidad(localidadId: string, barrioIds: string[]): Promise<void>;
}
