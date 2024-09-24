### Artigo Único

```JSON
{
  "article": {
    "slug": "how-to-train-your-dragon",
    "title": "Como treinar seu dragão",
    "description": "Já se perguntou como?",
    "body": "É preciso um Jacobiano",
    "tagList": ["dragons", "training"],
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
      "username": "jake",
      "bio": "Eu trabalho na State Farm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }
}
```

### Múltiplos Artigos

```JSON
{
  "articles": [{
    "slug": "how-to-train-your-dragon",
    "title": "Como treinar seu dragão",
    "description": "Já se perguntou como?",
    "body": "É preciso um Jacobiano",
    "tagList": ["dragons", "training"],
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
      "username": "jake",
      "bio": "Eu trabalho na State Farm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }, {
    "slug": "how-to-train-your-dragon-2",
    "title": "Como treinar seu dragão 2",
    "description": "Tão Desdentado",
    "body": "É um dragão",
    "tagList": ["dragons", "training"],
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
      "username": "jake",
      "bio": "Eu trabalho na State Farm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }],
  "articlesCount": 2
}
```

### Comentário Único

```JSON
{
  "comment": {
    "id": 1,
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:22:56.637Z",
    "body": "É preciso um Jacobiano",
    "author": {
      "username": "jake",
      "bio": "Eu trabalho na State Farm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }
}
```

### Múltiplos Comentários

```JSON
{
  "comments": [{
    "id": 1,
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:22:56.637Z",
    "body": "É preciso um Jacobiano",
    "author": {
      "username": "jake",
      "bio": "Eu trabalho na State Farm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }]
}
```

### Listar Artigos

`GET /api/articles`

Retorna os artigos mais recentes globalmente por padrão. Forneça os parâmetros de consulta `tag`, `author` ou `favorited` para filtrar os resultados.

Parâmetros de Consulta:

Filtrar por tag:

`?tag=AngularJS`

Filtrar por autor:

`?author=jake`

Favoritado pelo usuário:

`?favorited=jake`

Limitar o número de artigos (o padrão é 20):

`?limit=20`

Definir o deslocamento/número de artigos a serem ignorados (o padrão é 0):

`?offset=0`

Autenticação opcional, retornará [múltiplos artigos](#múltiplos-artigos), ordenados pelos mais recentes primeiro.


### Artigos do Feed

`GET /api/articles/feed`

Também pode aceitar os parâmetros de consulta `limit` e `offset`, como [Listar Artigos](#listar-artigos).

Autenticação necessária, retornará [múltiplos artigos](#múltiplos-artigos) criados por usuários seguidos, ordenados pelos mais recentes primeiro.


### Obter Artigo

`GET /api/articles/:slug`

Nenhuma autenticação é necessária, retornará um [artigo único](#artigo-único).


### Criar Artigo

`POST /api/articles`

Exemplo de corpo de solicitação:

```JSON
{
  "article": {
    "title": "Como treinar seu dragão",
    "description": "Já se perguntou como?",
    "body": "É preciso um Jacobiano",
    "tagList": ["dragons", "training"]
  }
}
```

Autenticação necessária, retornará o [artigo único](#artigo-único).


### Atualizar Artigo

`PUT /api/articles/:slug`

Exemplo de corpo de solicitação:

```JSON
{
  "article": {
    "title": "Como treinar seu dragão",
    "description": "Você sempre soube como",
    "body": "É preciso um Jacobiano"
  }
}
```

Autenticação necessária, retornará o [artigo único](#artigo-único).


### Excluir Artigo

`DELETE /api/articles/:slug`

Autenticação necessária.


### Adicionar Comentário ao Artigo

`POST /api/articles/:slug/comments`

Exemplo de corpo de solicitação:

```JSON
{
  "comment": {
    "body": "É preciso um Jacobiano"
  }
}
```

Autenticação necessária, retornará o [comentário único](#comentário-único).


### Obter Comentários de um Artigo

`GET /api/articles/:slug/comments`

Nenhuma autenticação é necessária, retornará [múltiplos comentários](#múltiplos-comentários).


### Excluir Comentário

`DELETE /api/articles/:slug/comments/:id`

Autenticação necessária.


### Curtir Artigo

`POST /api/articles/:slug/favorite`

Autenticação necessária, retornará o [artigo único](#artigo-único).


### Remover Curtida de Artigo

`DELETE /api/articles/:slug/favorite`

Autenticação necessária, retornará o [artigo único](#artigo-único).
