export class FeedbackModel{

    public Id: number = 0;
    public InspectionId: number = 0;
    public SectionId: number = 0;
    public Rating: number = 0;
    public Comment: string = "";
    public FeedbackGivenBy: string = "";
    public FeedbackDate: Date = new Date();

    public constructor(
        
    ){

    }
}