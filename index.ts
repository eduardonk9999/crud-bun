import BunDatabase, {Bun} from "./src/bun.database";
import BunService from "./src/bun.service";

const db = new BunDatabase();
const bunService = new BunService(db);

export default {
    port: 5000,
    async fetch(request: Request) {
        const { method, url} = request
        const { pathname, searchParams } = new URL(url)
        console.log(`${method} ${pathname}`)

        if(method === 'GET' && pathname === "/buns"){
            const buns = bunService.getBuns();

            return new Response(JSON.stringify(buns));
        }

        if(method === 'POST' && pathname === "/bun"){
            const data:Bun = await request.json();

            if (data.name && data.type) {
                bunService.createBun(data.type, data.name);
                return new Response("Pokemon inserido na pokedesk");
            } else {
                return new Response("Campos 'name' e 'type' são obrigatórios.", { status: 400 });
            }
        }
        
        return new Response("NOT FOUND", {
            status:404
        })
    }
}