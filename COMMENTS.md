## Arquitetura Utilizada

### API
A API foi desenvolvida utilizando o framework Express.js, adotando os princípios da **Clean Architecture** para garantir uma estrutura modular, escalável e de fácil manutenção. Assim, temos uma separação clara de responsabilidades, facilitando testes, evolução e substituição de componentes . Para a persistência de dados, é utilizado o **Prisma ORM** para interagir com o banco de dados PostgreSQL.  A estrutura do projeto segue uma organização por camadas, com diretórios dedicados a controladores, serviços, repositórios e entidades, alinhada aos conceitos da Clean Architecture.

#### Bibliotecas Utilizadas:
- Express
- Prisma
- Zod (Validações)
- Jest (Testes unitários)

### Web (Front-end)
O front-end da aplicação foi desenvolvido com Vue.js e Vuetify, utilizando a estrutura padrão oferecida pelo Vuetify. A arquitetura inclui o uso de composables para lógica reutilizável e stores para gerenciamento centralizado do estado da aplicação. As stores facilitam a comunicação eficiente com a API do backend, promovendo uma troca de dados organizada e reativa.

#### Bibliotecas Utilizadas:
- Vue
- Vuetify 
- Pinia (Uso de stores)
- Axios (Requisições)

## O que você melhoraria se tivesse mais tempo
- Melhoraria o layout que foi implementado no front, junto com testes unitários. 
- Acrescentaria paginação no frontend.

## Quais requisitos obrigatórios que não foram entregues
Todos requisitos foram entregues

## Como rodar

### Ferramentas necessárias:


```bash
docker
docker  compose
```

### Definir variáveis de ambiente


```bash
cp api/.env.example api/.env
cp web/.env.example web/.env
```

### Levantar Containers

```bash
docker compose up -d
```
ou
```bash
./run up -d
```

### Rodar migrations

```bash
./run api:migrate
```
ou
```bash
docker compose exec api yarn migrate:dev
```

### Rotas
- Front: http://localhost:4000
- API: http://localhost:3000/api

### Rodando Testes

#### API
Levanta base de dados teste
```bash
./run test:api:prepare
```
Roda os testes
```bash
./run test:api
```
