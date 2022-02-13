export class UserStore {
    _userRoleId: number;

    get userRoleId(): number{
        return this._userRoleId;
    }
    set userRoleId(value: number){
        this._userRoleId = value;
    }
}
