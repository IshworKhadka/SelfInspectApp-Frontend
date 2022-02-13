
export class InspectionScheduleModel{


    public inspectionScheduleId: number = 0;
    public houseId: number = 0;
    //public house_address: string = "";
    public userId: string = "";
    //public tenant_name: string = ""
    public inspection_date: Date = new Date();
    public inspection_status: string = ""

    public constructor(
        
    ){

    }
}