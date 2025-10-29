export class LocalidadNombre {
  private readonly value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error(`Locality name is invalid: "${value}"`);
    }

    this.value = value.trim().toUpperCase();
  }

  private isValid(value: string): boolean {
    if (!value) return false;
    const trimmed = value.trim();
    return trimmed.length > 0 && trimmed.length <= 100;
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: LocalidadNombre): boolean {
    return this.value.toLowerCase() === other.value.toLowerCase();
  }

  public toString(): string {
    return this.value;
  }
}
