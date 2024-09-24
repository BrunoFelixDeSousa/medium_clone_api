### Registro De Usuário:

`POST /api/users`

Exemplo de corpo de solicitação:
```JSON
{
  "user":{
    "username": "janeDoe",
    "email": "janedoe@email.com",
    "password": "janeDoe123"
  }
}
```
Nenhuma autenticação é necessária, retorna um [Usuário](#Usuário).

Campos obrigatórios: `username`, `email`, `password`.

### Obter Usuário Atual

`GET /api/user`

Autenticação necessária, retorna um [Usuário](#Usuário) que é o usuário atual.

### Atualizar Usuário

`PUT /api/user`

Exemplo de corpo de solicitação:
```JSON
{
  "user":{
    "email": "jake@jake.jake",
    "bio": "Eu gosto de andar de skate",
    "image": "https://i.stack.imgur.com/xHWG8.jpg"
  }
}
```

Autenticação necessária, retorna o [Usuário](#Usuário).

Campos aceitos: `email`, `username`, `password`, `image`, `bio`.


### Usuário

```JSON
{
  "user": {
    "id": "5c866aae-1550-444f-88a5-5739feea4c71",
    "username": "janeDoe",
    "email": "janedoe@email.com",
    "bio": "",
    "image": ""
  }
}
```
