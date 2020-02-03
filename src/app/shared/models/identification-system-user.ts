export class IdentificationSystemUser {

    constructor(
        public firstName: string,
        public lastName: string,        
        public identificationType: string,
        public identificationNumber: string, 
        public expeditionDate: string) {}
}