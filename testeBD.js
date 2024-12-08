import {sql} from './db.js'

sql`
    DROP TABLE IF EXISTS encomendas;
`.then (()=>{
    console.log("TABELA EXCLUIDA")
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
        id              VARCHAR(50)  PRIMARY KEY,
        cliente         VARCHAR(150),
        estilista       VARCHAR(150),
        tipoEncomenda   VARCHAR(250),
        horarioPedido   TIMESTAMP,
        valor           NUMERIC(10, 2)
    );
` .then(()=> {
    console.log("TABELA CRIADA")
})
// id, cliente, estilista, tipoEncomenda, horarioPedido, valor