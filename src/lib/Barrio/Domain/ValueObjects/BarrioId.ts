export class BarrioId{
    private readonly _value: number;

    constructor(value: number){
        if(!Number.isInteger(value) || value <= 0) {
            throw new Error ("BarrioId must be a integer positive")
        }

        this._value = value;
    }

    public get value(): number {
        return this._value;
    }

    public equals (other: BarrioId): boolean {
        return this._value === other.value;
    }
}