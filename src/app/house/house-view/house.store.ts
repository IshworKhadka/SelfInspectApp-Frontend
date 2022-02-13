
export class HouseStore {
    _houseid: string;

    get houseid(): string{
        return this._houseid;
    }
    set houseid(value: string){
        this._houseid = value;
    }
}
