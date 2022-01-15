import { HouseModel } from "./house";

export class TenantModel {
    constructor(
        public tenantId: number,
        public name: string,
        public email: string,
        public contact: string,
        public startDate: Date,
        public username: string,
        public password: string,
        public houseId: number,
        public house_address: string

        //add this prop in backend model
        //public imageURL: string
    
    ) { }


}