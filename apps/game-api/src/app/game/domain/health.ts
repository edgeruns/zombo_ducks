export class Health {
    private value: number

    constructor(value: number) {
        this.value = value
    }

    setValue(value: number) {
        this.value = value
    }

    decrease(value: number): number {
        const computed = this.value - value

        if (computed <= 0) {
            this.value = 0
        } else {
            this.value = computed
        }


        return this.value
    }

    getValue(): number {
        return this.value
    }
}
