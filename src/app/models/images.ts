

export class ImageModel {


    constructor(
        public imageId: number,
        public imageUrl: string,
        public submittedBy: string,
        public submittedDate: Date,
        public houseId: number,
        public sectionId: number
    
    ) { }


}