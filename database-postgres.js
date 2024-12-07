import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DatabasePostgres {
    
  async list(search) {
    let encomendas;

    if (search) {
      encomendas = await sql`select * from encomendas where title ilike ${
        "%" + search + "%"
      }`;
    } else {
      encomendas = await sql`select * from encomendas`;
    }

    return encomendas;
  }

  async create(encomenda) {
    const encomendaId = randomUUID();
    const { id, cliente, estilista, tipoEncomenda, horarioPedido, valor } = encomenda;

    await sql`insert into encomendas (id, cliente, estilista, tipoEncomenda, horariopedido, valor) VALUES (${encomendaId}, ${id}, ${cliente}, ${estilista}, ${tipoEncomenda}, ${horarioPedido}, ${valor})`;
  }

  async update(id, encomenda) {
    const { cliente, estilista, tipoEncomenda, horarioPedido, valor } = encomenda;

    await sql`update encomendas set id = ${id}, cliente = ${cliente}, estilista = ${estilista}, tipoEncomenda = ${tipoEncomenda}, horarioPedido = ${horarioPedido}, valor = ${valor} WHERE id = ${id}`;
  }

  async delete(id) {
    await sql`delete from encomendas where id = ${id}`;
  }
}
