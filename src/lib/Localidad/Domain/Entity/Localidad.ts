import { LocalidadGeom } from "../ValueObject/LocalidadGeom.js";
import { LocalidadId } from "../ValueObject/LocalidadId.js";
import { LocalidadNombre } from "../ValueObject/LocalidadNombre.js";
import { LocalidadSuperficieHa } from "../ValueObject/LocalidadSuperficieHa.js";
import { LocalidadSuperficieM2 } from "../ValueObject/LocalidadSuperficieM2.js";

export class Localidad {
  private _id?: LocalidadId;
  private _nombre: LocalidadNombre;
  private _superficieHa: LocalidadSuperficieHa;
  private _superficieM2: LocalidadSuperficieM2;
  private _geom: LocalidadGeom;

  // 🔹 Sobrecarga 1 (sin id)
  constructor(
    nombre: LocalidadNombre,
    superficieHa: LocalidadSuperficieHa,
    superficieM2: LocalidadSuperficieM2,
    geom: LocalidadGeom
  );

  // 🔹 Sobrecarga 2 (con id)
  constructor(
    id: LocalidadId,
    nombre: LocalidadNombre,
    superficieHa: LocalidadSuperficieHa,
    superficieM2: LocalidadSuperficieM2,
    geom: LocalidadGeom
  );

  // 🔹 Implementación única (real)
  constructor(
    idOrNombre: LocalidadId | LocalidadNombre,
    nombreOrHa: LocalidadNombre | LocalidadSuperficieHa,
    superficieHaOrM2?: LocalidadSuperficieHa | LocalidadSuperficieM2,
    superficieM2OrGeom?: LocalidadSuperficieM2 | LocalidadGeom,
    geomMaybe?: LocalidadGeom
  ) {
    // Si el primer argumento es un LocalidadId → viene con ID
    if (idOrNombre instanceof LocalidadId) {
      this._id = idOrNombre;
      this._nombre = nombreOrHa as LocalidadNombre;
      this._superficieHa = superficieHaOrM2 as LocalidadSuperficieHa;
      this._superficieM2 = superficieM2OrGeom as LocalidadSuperficieM2;
      this._geom = geomMaybe as LocalidadGeom;
    } else {
      // Si no, el id no viene
      this._nombre = idOrNombre as LocalidadNombre;
      this._superficieHa = nombreOrHa as LocalidadSuperficieHa;
      this._superficieM2 = superficieHaOrM2 as LocalidadSuperficieM2;
      this._geom = superficieM2OrGeom as LocalidadGeom;
    }
  }

  // 🔹 Getters
  public get id(): LocalidadId | undefined {
    return this._id;
  }

  public get nombre(): LocalidadNombre {
    return this._nombre;
  }

  public get superficieHa(): LocalidadSuperficieHa {
    return this._superficieHa;
  }

  public get superficieM2(): LocalidadSuperficieM2 {
    return this._superficieM2;
  }

  public get geom(): LocalidadGeom {
    return this._geom;
  }

  // 🔹 Setter:
  public set nombre(name: LocalidadNombre) {
    this._nombre = name;
  }

  public set superficieHa(ha: LocalidadSuperficieHa){
    if(!ha) throw new Error(`The surface ha can't be empty`)
    this._superficieHa = ha;
  }

  public set superficieM2(m2: LocalidadSuperficieM2) {
    if(!m2) throw new Error(`The surface m2 can't be empty`)
    this._superficieM2 = m2;
  }

  public set geom(g: LocalidadGeom){

    if(!g) throw new Error(`The geom can't be empty`)
    this._geom = g;

  }
}
