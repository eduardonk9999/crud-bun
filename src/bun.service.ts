import BunDatabase, {Bun, BunType} from "./bun.database";

export default class BunService{
    db: BunDatabase

    constructor(db: BunDatabase) {
        this.db = db;
    }

    getBuns() {
        return this.db.getBuns();
    }

    getBun(id: string, name: string) {
        return this.db.getBun(id, name);
    }

    createBun(type: BunType, name: string){
        this.db.createBun(type, name);
    }
    
    deleteBun(id: string) {
        this.db.deleteBun(id);
    }
}