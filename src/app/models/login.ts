

export class LoginModel{
    constructor (
        public user_id: number,
        public username: string,
        public password: string,
        public isAdmin: boolean
    ){}
}