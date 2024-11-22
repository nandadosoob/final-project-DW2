import { fastify } from "fastify";
import 'dotenv/config'
import { DatabasePostgres } from "./database-postgres.js";


// instancia o servidor
const server = fastify()
//instancia o bd
const database = new DatabasePostgres();


