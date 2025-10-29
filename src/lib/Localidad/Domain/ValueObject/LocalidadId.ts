export class LocalidadId {
  private readonly _value: number;

  constructor(value: number) {
    
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error("LocalityId must be a integer positive");
    }
    this._value = value;
  }

  public get value(): number {
    return this._value;
  }

  public equals(other: LocalidadId): boolean {
    return this._value === other.value;
  }
}
