import { Localidad } from "src/lib/Localidad/Domain/Entity/Localidad";

export class LocalidadPresenter {
  static toResponse(localidad: Localidad) {
    return {
      id: localidad.id?.value,
      nombre: localidad.nombre.getValue(),
      superficieHa: localidad.superficieHa.getValue(),
      superficieM2: localidad.superficieM2.getValue(),
      geom: localidad.geom.getValue(),
    };
  }

  static toResponseList(localidades: Localidad[]) {
    return localidades.map(this.toResponse);
  }
}
