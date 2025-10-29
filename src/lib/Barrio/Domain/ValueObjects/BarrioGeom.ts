import * as wkx from "wkx";

/**
 * Value Object que representa la geometría de un barrio.
 * Asegura que el valor sea un string en formato WKB válido.
 */
export class BarrioGeom {
  private readonly value: string;

  constructor(value: string) {
    // Elimina comillas dobles al inicio y al final
    const cleanValue = value.replace(/^"+|"+$/g, "").trim();

    if (!this.isValid(cleanValue)) {
      throw new Error(`Geom inválido (no es un WKB válido para barrio): "${value}"`);
    }

    this.value = cleanValue;
  }

  /**
   * Valida que el string sea un WKB (hexadecimal) correcto.
   */
  private isValid(value: string): boolean {
    if (typeof value !== "string") return false;

    const trimmed = value.trim();
    if (!trimmed.length) return false;

    // Debe tener longitud par y solo caracteres hexadecimales
    const isHex = /^[0-9A-Fa-f]+$/.test(trimmed);
    if (!isHex || trimmed.length % 2 !== 0) return false;

    try {
      // Intenta parsear el WKB → si falla, no es válido
      wkx.Geometry.parse(Buffer.from(trimmed, "hex"));
      return true;
    } catch {
      return false;
    }
  }

  public getValue(): string {
    return this.value;
  }

  public toWkt(): string {
    // Convierte el WKB a WKT legible
    const geom = wkx.Geometry.parse(Buffer.from(this.value, "hex"));
    return geom.toWkt();
  }

  public toGeoJSON(): any {
    const geom = wkx.Geometry.parse(Buffer.from(this.value, "hex"));
    return geom.toGeoJSON();
  }

  public equals(other: BarrioGeom): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
