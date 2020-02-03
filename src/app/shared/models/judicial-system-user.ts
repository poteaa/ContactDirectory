export class JudicialSystemUser {

    constructor(
        public name: string,
        public identificationType: string,
        public identificationNumber: string,
        public faults: string[]) {}
}