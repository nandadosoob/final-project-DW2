import {sql} from './db.js'

sql`
    DROP TABLE ID EXISTS videos;
`.then (()=>{
    consol.log("TABELA EXCLUIDA")
})


sql`
    CREATE TABLE videos (
        id           TEXT PRIMARY KEY,
        title        TEXT,
        description  TEXT,
        duration     TEXT
    );
` .then(()=> {
    console.log("TABELA CRIADA")
})