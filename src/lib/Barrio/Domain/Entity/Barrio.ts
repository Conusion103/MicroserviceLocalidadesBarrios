import { BarrioGeom } from "../ValueObjects/BarrioGeom.js";
import { BarrioId } from "../ValueObjects/BarrioId.js";
import { BarrioNombre } from "../ValueObjects/BarrioNombre.js";
import { BarrioNumeroHabitantes } from "../ValueObjects/BarrioNumeroHabitantes.js";
import { BarrioNumeroPredios } from "../ValueObjects/BarrioNumeroPredios.js";
import { BarrioSuperficieHa } from "../ValueObjects/BarrioSuperficieHa.js";
import { BarrioSuperficieM2 } from "../ValueObjects/BarrioSuperficieM2.js";

export class Barrio {
  private _id?: BarrioId;
  private _nombre: BarrioNombre;
  private _numeroHabitantes: BarrioNumeroHabitantes;
  private _numeroPredios: BarrioNumeroPredios;
  private _superficieHa: BarrioSuperficieHa;
  private _superficieM2: BarrioSuperficieM2;
  private _geom: BarrioGeom;

  // 🔹 Sobrecarga 1 (sin id)
  constructor(
    nombre: BarrioNombre,
    numeroHabitantes: BarrioNumeroHabitantes,
    numeroPredios: BarrioNumeroPredios,
    superficieHa: BarrioSuperficieHa,
    superficieM2: BarrioSuperficieM2,
    geom: BarrioGeom
  );

  // 🔹 Sobrecarga 2 (con id)
  constructor(
    id: BarrioId,
    nombre: BarrioNombre,
    numeroHabitantes: BarrioNumeroHabitantes,
    numeroPredios: BarrioNumeroPredios,
    superficieHa: BarrioSuperficieHa,
    superficieM2: BarrioSuperficieM2,
    geom: BarrioGeom
  );

  // 🔹 Implementación real
  constructor(
    idOrNombre: BarrioId | BarrioNombre,
    nombreOrHabitantes: BarrioNombre | BarrioNumeroHabitantes,
    habitantesOrPredios?: BarrioNumeroHabitantes | BarrioNumeroPredios,
    prediosOrHa?: BarrioNumeroPredios | BarrioSuperficieHa,
    haOrM2?: BarrioSuperficieHa | BarrioSuperficieM2,
    m2OrGeom?: BarrioSuperficieM2 | BarrioGeom,
    geomMaybe?: BarrioGeom
  ) {
    // Si el primer argumento es un BarrioId → viene con ID
    if (idOrNombre instanceof BarrioId) {
      this._id = idOrNombre;
      this._nombre = nombreOrHabitantes as BarrioNombre;
      this._numeroHabitantes = habitantesOrPredios as BarrioNumeroHabitantes;
      this._numeroPredios = prediosOrHa as BarrioNumeroPredios;
      this._superficieHa = haOrM2 as BarrioSuperficieHa;
      this._superficieM2 = m2OrGeom as BarrioSuperficieM2;
      this._geom = geomMaybe as BarrioGeom;
    } else {
      // Si no, el id no viene
      this._nombre = idOrNombre as BarrioNombre;
      this._numeroHabitantes = nombreOrHabitantes as BarrioNumeroHabitantes;
      this._numeroPredios = habitantesOrPredios as BarrioNumeroPredios;
      this._superficieHa = prediosOrHa as BarrioSuperficieHa;
      this._superficieM2 = haOrM2 as BarrioSuperficieM2;
      this._geom = m2OrGeom as BarrioGeom;
    }
  }

  // 🔹 Getters
  public get id(): BarrioId | undefined {
    return this._id;
  }

  public get nombre(): BarrioNombre {
    return this._nombre;
  }

  public get numeroHabitantes(): BarrioNumeroHabitantes {
    return this._numeroHabitantes;
  }

  public get numeroPredios(): BarrioNumeroPredios {
    return this._numeroPredios;
  }

  public get superficieHa(): BarrioSuperficieHa {
    return this._superficieHa;
  }

  public get superficieM2(): BarrioSuperficieM2 {
    return this._superficieM2;
  }

  public get geom(): BarrioGeom {
    return this._geom;
  }

  // 🔹 Setters (con validaciones)
  public set nombre(nombre: BarrioNombre) {
    if (!nombre) throw new Error(`The name can't be empty`);
    this._nombre = nombre;
  }

  public set numeroHabitantes(habitantes: BarrioNumeroHabitantes) {
    if (!habitantes) throw new Error(`The number of inhabitants can't be empty`);
    this._numeroHabitantes = habitantes;
  }

  public set numeroPredios(predios: BarrioNumeroPredios) {
    if (!predios) throw new Error(`The number of properties can't be empty`);
    this._numeroPredios = predios;
  }

  public set superficieHa(ha: BarrioSuperficieHa) {
    if (!ha) throw new Error(`The surface ha can't be empty`);
    this._superficieHa = ha;
  }

  public set superficieM2(m2: BarrioSuperficieM2) {
    if (!m2) throw new Error(`The surface m2 can't be empty`);
    this._superficieM2 = m2;
  }

  public set geom(geom: BarrioGeom) {
    if (!geom) throw new Error(`The geom can't be empty`);
    this._geom = geom;
  }
}
