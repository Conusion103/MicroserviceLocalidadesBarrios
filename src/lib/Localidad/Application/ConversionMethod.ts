import * as wkx from "wkx";

/**
 * Clase utilitaria para convertir geometrías entre formatos
 * WKT ↔ GeoJSON, y validar estructuras GeoJSON.
 */
export class ConversionMethod {

  /**
   * Convierte un string WKT a un objeto GeoJSON.
   * @param wkt - Texto en formato WKT (por ejemplo: "POINT (-58.3816 -34.6037)")
   * @returns Objeto GeoJSON equivalente.
   * @throws Error si el WKT no es válido.
   */
  static wktToGeoJSON(wkt: string): object {
    if (typeof wkt !== "string" || !wkt.trim().length) {
      throw new Error("El valor WKT debe ser un string no vacío.");
    }

    try {
      const geom = wkx.Geometry.parse(wkt);
      return geom.toGeoJSON();
    } catch (error) {
      throw new Error(`Error al convertir WKT a GeoJSON: ${(error as Error).message}`);
    }
  }

  /**
   * Convierte un objeto GeoJSON a su representación WKT.
   * @param geojson - Objeto GeoJSON (por ejemplo: { type: "Point", coordinates: [...] })
   * @returns String WKT equivalente.
   * @throws Error si el GeoJSON no es válido.
   */
  static geoJSONToWkt(geojson: object): string {
    if (!this.isValidGeoJSON(geojson)) {
      throw new Error("GeoJSON inválido o mal formado.");
    }

    try {
      const geom = wkx.Geometry.parseGeoJSON(geojson);
      return geom.toWkt();
    } catch (error) {
      throw new Error(`Error al convertir GeoJSON a WKT: ${(error as Error).message}`);
    }
  }

  /**
   * Valida que un objeto sea un GeoJSON válido.
   * @param geojson - Objeto a validar.
   * @returns true si es válido, false si no.
   */
  static isValidGeoJSON(geojson: any): boolean {
    if (typeof geojson !== "object" || geojson === null) return false;
    if (!("type" in geojson)) return false;

    const validTypes = [
      "Point",
      "LineString",
      "Polygon",
      "MultiPoint",
      "MultiLineString",
      "MultiPolygon",
      "GeometryCollection"
    ];

    if (!validTypes.includes(geojson.type)) return false;

    if (geojson.type === "Point") {
      return (
        Array.isArray(geojson.coordinates) &&
        geojson.coordinates.length >= 2 &&
        geojson.coordinates.every((c: any) => typeof c === "number")
      );
    }

    // Para otros tipos geométricos, confiamos en wkx para la validación completa
    try {
      wkx.Geometry.parseGeoJSON(geojson);
      return true;
    } catch {
      return false;
    }
  }
}
