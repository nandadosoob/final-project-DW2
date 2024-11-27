import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DatabasePostgres {
    
  async list(search) {
    let usuarios;

    if (search) {
      usuarios = await sql`select * from videos where title ilike ${
        "%" + search + "%"
      }`;
    } else {
      usuarios = await sql`select * from videos`;
    }

    return usuarios;
  }

  async create(usuario) {
    const usuarioId = randomUUID();
    const { title, description, duration } = usuario;

    await sql`insert into videos (id, title, description, duration) VALUES (${usuarioId}, ${title}, ${description}, ${duration})`;
  }

  async update(id, usuario) {
    const { title, description, duration } = usuario;

    await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`;
  }

  async delete(id) {
    await sql`delete from videos where id = ${id}`;
  }
}
