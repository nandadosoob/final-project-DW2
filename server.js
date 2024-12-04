// import { fastify } from "fastify";
// import cors from '@fastify/cors'
// import 'dotenv/config'
// import { DatabasePostgres } from "./database-postgres.js";


// // instancia o servidor
// const server = fastify()
// //instancia o bd
// const database = new DatabasePostgres();


/**
 * Servidor Fastify que fornece uma API RESTful para gerenciamento de vídeos.
 * 
 * O servidor suporta os seguintes endpoints:
 * - `POST /videos`: Cria um novo vídeo com título, descrição e duração fornecidos.
 * - `GET /videos`: Recupera uma lista de vídeos, opcionalmente filtrada por um termo de busca.
 * - `PUT /videos/:id`: Atualiza o título, descrição e duração de um vídeo existente.
 * - `DELETE /videos/:id`: Exclui um vídeo existente.
 */

// Importações necessárias
import { fastify } from "fastify"; // Importa o framework Fastify para criar o servidor
import cors from '@fastify/cors' // Importa o plugin CORS para permitir requisições de diferentes origens

import 'dotenv/config' // Carrega variáveis de ambiente do arquivo .env
import { DatabasePostgres } from "./database-postgres.js"; // Importa a classe de banco de dados PostgreSQL personalizada

// Cria uma instância do servidor Fastify
const server = fastify()

// Registra o middleware CORS para permitir requisições de qualquer origem
await server.register(cors, {
  origin: '*', // Configuração que permite requisições de qualquer domínio (usar com cautela em produção)
});

// Instancia o banco de dados PostgreSQL
const database = new DatabasePostgres();


server.get("/", () => {
  return "Seja bem vindo a API da Moda"
})

// Rota para criar um novo usuário (POST)
server.post("/usuarios", async (request, reply) => {
  // Desestrutura os dados do corpo da requisição
  const { nome, email, celular } = request.body;



  // Chama o método create do banco de dados para inserir um novo vídeo
  await database.create({
    nome: nome,
    email: email,
    celular: celular,
  });

  // Retorna uma resposta de sucesso com código 201 (Created)
  return reply.status(201).send();
});

// Rota para listar usuários (GET)
server.get("/usuarios", async (request, reply) => {                                    
  // Extrai o parâmetro de busca da query da URL
  const { nome } = request.query
  
  // Chama o método list do banco de dados, passando o termo de busca
  const usuarios = await database.list(nome);

  reply.send(usuarios)

  
});

// Rota para atualizar um vídeo existente (PUT)
server.put("/usuarios/:id", async (request, reply) => {
  // Obtém o ID do usuário a ser atualizado a partir dos parâmetros da URL
  const usuarioId = request.params.id;
  // Desestrutura os novos dados do usuário do corpo da requisição
  const { nome, email, celular } = request.body;

  // Chama o método update do banco de dados
  await database.update(usuarioId, {
    nome,
    email,
    celular,
  });

  // Retorna uma resposta de sucesso sem conteúdo (204 No Content)
  return reply.status(204).send();
});

// Rota para excluir um usuário (DELETE)
server.delete("/usuarios/:id", async (request, reply) => {
  // Obtém o ID do vídeo a ser excluído a partir dos parâmetros da URL
  const usuarioId = request.params.id;

  // Chama o método delete do banco de dados
  await database.delete(usuarioId);
  // Retorna uma resposta de sucesso sem conteúdo (204 No Content)
  return reply.status(204).send();
});

// Inicia o servidor
server.listen(
  { 
    // Configura para escutar em todos os endereços de rede
    host: "0.0.0.0",
    // Usa a porta definida no .env ou usa a porta 3333 como padrão
    port: process.env.PORT ?? 3333 
  }, 
  // Callback de inicialização do servidor
  function (err, address) {
    // Em caso de erro, registra o erro e encerra o processo
    if (err) {
      server.log.error(err)
      process.exit(1)
    }

    // Registra mensagem de sucesso com o endereço do servidor
    console.log(`Servidor rodando no endereço ${address}`)
  }
)

