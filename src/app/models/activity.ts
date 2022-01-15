
export class ActivityModel{

    constructor(
        public activity_id: number,

        public activity_name: string,
        // public activity_user_id: number,
        public activity_user_name: string,
        // public activity_user_image: string,

        public activity_role_authorization: number,
        public activity_date: Date,
        public activity_description: string,

        // public comment_id: number,
        // public comment_desc: string,
        // public comment_user: string,
        // public comment_date_time: Date
    ){

    }
}