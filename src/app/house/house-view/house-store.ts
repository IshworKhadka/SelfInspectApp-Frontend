export class HouseStore {
    _houseid: string;

    get houseid(){
        return this._houseid;
    }

    set houseid(value: string){
        this._houseid = value;
    }
}