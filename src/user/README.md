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
Nenhuma autenticação é necessária, retorna um [`Usuário`](#Usuário).

Campos obrigatórios: `username`, `email`, `password`.

### Retorno: Usuário

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
