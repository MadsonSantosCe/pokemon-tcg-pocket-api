# Pokémon Card Reader

Este projeto é uma aplicação Node.js desenvolvida em TypeScript para leitura de cartas Pokémon utilizando a Google Vision API. O objetivo é extrair informações das cartas e facilitar sua organização e busca.

## Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **TypeScript** - Superset de JavaScript com tipagem estática
- **Google Vision API** - API para reconhecimento de texto e imagem
- **Express** - Framework para construção de APIs REST
- **mongoose** - Framework ORM para gerenciamento de banco de dados MongoDB
- **dotenv** - Gerenciamento de variáveis de ambiente
- **multer** - Middleware para upload de arquivos

## Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/MadsonSantosCe/pokemon-tcg-pocket-api.git
   cd pokemon-tcg-pocket-api
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env`
   - Adicione sua chave do MongoDB e Google Vision API:
     ```env
     DATABASE_URL="mongodb://localhost:27017/your_db_name"
     GOOGLE_API_KEY="your_google_api_key"
     ```

## Uso

1. Inicie a aplicação:

   ```sh
   npm run dev
   ```

2. Envie uma imagem de uma carta Pokémon para o endpoint via `multipart/form-data` utilizando o Postman:
   ```sh
   curl -X POST -F "image=@caminho/para/sua/imagem.jpg" http://localhost:3001/api/pokemon/cardUpload
   ```

## Estrutura do Projeto

```
├── public
│   ├── uploads
│   │   ├── arquivoModelo.webp
├── src
│   ├── controllers
│   │   ├── cardController.ts
│   ├── services
│   │   ├── cardDataService.ts
│   │   ├── cardService.ts
│   ├── routes
│   │   ├── mainRoutes.ts
│   ├── models
│   │   ├── Pokemon.ts
│   ├── config
│   │   ├── database.ts
│   ├── app.ts
│   ├── server.ts
├── .env.example
├── package.json
├── tsconfig.json
```

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
