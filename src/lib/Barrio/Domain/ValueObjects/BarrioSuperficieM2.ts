export class BarrioSuperficieM2 {
  private readonly value: number;

  constructor(value: number ) { 
    // Si el valor es un string, intentamos convertirlo a número
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    if (!this.isValid(numericValue)) {
      throw new Error(`Area in square meters of location is invalid: "${value}"`);
    }

    this.value = numericValue;
  }

  private isValid(value: number): boolean {
    // Validamos tipo, finito y mayor que cero
    if (typeof value !== 'number' || !isFinite(value) || value <= 0) {
      return false;
    }

    // Validamos que no esté en notación científica
    if (value.toString().toLowerCase().includes('e')) {
      return false;
    }

    return true;
  }

  public getValue(): number {
    return this.value;
  }

  public equals(other: BarrioSuperficieM2): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return `${this.value} m²`;
  }
}
