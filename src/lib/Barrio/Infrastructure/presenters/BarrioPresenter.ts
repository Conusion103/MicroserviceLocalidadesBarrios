import { Barrio } from "src/lib/Barrio/Domain/Entity/Barrio";

export class BarrioPresenter {
  static toResponse(barrio: Barrio) {
    return {
      id: barrio.id?.value,
      nombre: barrio.nombre.getValue(),
      numeroHabitantes: barrio.numeroHabitantes.getValue(),
      numeroPredios: barrio.numeroPredios.getValue(),
      superficieHa: barrio.superficieHa.getValue(),
      superficieM2: barrio.superficieM2.getValue(),
      geom: barrio.geom.getValue(),
    };
  }

  static toResponseList(barrios: Barrio[]) {
    return barrios.map(this.toResponse);
  }
}
