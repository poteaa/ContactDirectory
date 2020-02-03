import { IdentificationType } from "src/app/shared/constants";

export class User {
    constructor(
        public firstName: string,
        public lastName: string,
        public idType: IdentificationType,
        public idNumber: string,
        public expeditionDate: string) {}
}
