### Autenticação:

`POST /api/auth/login`

Exemplo de corpo de solicitação:
```JSON
{
  "user":{
    "email": "janeDoe@email.com",
    "password": "janeDoe123"
  }
}
```

Nenhuma autenticação é necessária, retorna um [Usuário](#Usuários-para-autenticação).

Campos obrigatórios: `email`, `password`.

### Retorno: Usuário

```JSON
{
  "user": {
    "id": "5c866aae-1550-444f-88a5-5739feea4c71",
    "username": "janeDoe",
    "email": "janedoe@email.com",
    "bio": "",
    "image": ""
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InN1YiI6IjVjODY2YWFlLTE1NTAtNDQ0Zi04OGE1LTU3MzlmZWVhNGM3MSIsImVtYWlsIjoiamFuZWRvZUBlbWFpbC5jb20ifSwiaWF0IjoxNzI0NTM0NjY0LCJleHAiOjE3MjQ1MzgyNjR9.iIi4Z60wmJAbmNvk1P3aQueXBdpoQ4uVDjK4sm5ujaQ"
}
```