import { Database } from 'bun:sqlite'
import { type } from 'os';

export enum BunType {
    FOGO = "fogo",
    PALANTA = "planta",
    AGUA = "agua",
    ELETRICO = "eletrico"
}

export interface Bun{
    id?:string,
    name?: string,
    type: BunType
}

export default class BunDatabase{
    db: Database;

    constructor(){
        this.db = new Database("dbbuns.sqlite");
        this.db.run(
            "CREATE TABLE IF NOT EXISTS buns (id INTEGER PRIMARY KEY AUTOINCREMENT,type text, name TEXT)"
        );
    }

    getBuns(){
        return this.db.query("SELECT * FROM buns").all();
    }

    getBun(id: string, name: string){
        return this.db.query("SELECT * FROM buns WHERE id= ? AND name= ?", [id, name])
        .get({
            $id:id,
            $name: name
        })
    }

    createBun(bunType: BunType, name: string) {

        this.db.run("INSERT INTO buns (type, name) VALUES (?, ?)", [bunType, name]);

    }

    deleteBun(id:string) {
        this.db.run("DELETE FROM buns WHERE id=?");
    }
}