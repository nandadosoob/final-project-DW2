import {sql} from './db.js'

sql`
    DROP TABLE ID EXISTS encomendas;
`.then (()=>{
    consol.log("TABELA EXCLUIDA")
})


// sql`
//     CREATE TABLE videos (
//         id           TEXT PRIMARY KEY,
//         title        TEXT,
//         description  TEXT,
//         duration     TEXT
//     );
// ` .then(()=> {
//     console.log("TABELA CRIADA")
// })

sql`
    CREATE TABLE encomendas (
        id              TEXT PRIMARY KEY,
        cliente         VARCHAR(150),
        estilista       VARCHAR(150),
        tipoEncomenda   VARCHAR(250),
        horarioPedido   DATETIME,
        valor           MONEY
    );
` .then(()=> {
    console.log("TABELA CRIADA")
})
// id, cliente, estilista, tipoEncomenda, horarioPedido, valor