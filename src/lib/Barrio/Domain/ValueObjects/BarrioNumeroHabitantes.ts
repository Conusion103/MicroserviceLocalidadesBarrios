export class BarrioNumeroHabitantes {
    private readonly value: number;

    constructor(value: number) {
        if (!this.isValid(value)) {
            throw new Error(`The number of neighborhood inhabitants must be an integer and greater than 0. ("${value}")`);
        }

        this.value = value;
    }

    private isValid(value: number): boolean {
        return (
            typeof value === "number" &&
            isFinite(value) &&
            value > 0 &&
            Number.isInteger(value)
        );
    }

    public getValue(): number {
        return this.value;
    }

    public equals(other: BarrioNumeroHabitantes): boolean {
        return this.value === other.value;
    }

    public toString(): string {
        return `${this.value} habitantes`;
    }
}
