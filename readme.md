# Projeto fornecedores

## Configurações do Projeto

1. **Clone o repositório**

    ```bash
    git clone https://github.com/ededias/ozmap.git
    cd ozmap
    ```


1. **Docker**

    ```bash
        // para subir as imagens do docker
        docker compose up --build -d
    ```

2. **Execução do servidor node**
   ```bash
    Para executar o servidor node basta executar os comandos
    npm install 
    npm run dev
   ```
A aplicação ira rodar localhost




 


# API Documentation

### `DELETE http://localhost:3000/region/6790f2efe01d6fee1c1d6826`

**Description:** delete

**Headers:**
```json
- name: Content-Type
  value: application/json
- name: Authorization
  value: token <Bearer 1233213213213>

```

## region

## ozmap

### `POST http://localhost:3000/region/`

**Description:** create

**Headers:**
```json
- name: Content-Type
  value: application/json
- name: Authorization
  value: token <Bearer 1233213213213>

```

Enviar ou endereço ou as coordenadas, caso seja endereço fornecer uma lista com os  endereços desejados, caso seja passados ambos sera desconsiderado as coordenadas somente realizando a consulta dos endereços e persistindo as coordenadas resultantes.

**Request Body:**
```json
{
	"coordinates": [
		[
			-49.2000323,
			-25.4854542
		],
		[
			-44.2611194,
			-2.5679032
		],
		[
			-37.0749722,
			-10.9440881
		]
	],
}
```
```json
{
	"addresses": [
		{
			"zipcode": "88034000",
			"street": "Rod. Admar Gonzaga, 440 ",
			"city": "Florianopolis",
			"state": "SC"
		},
		{
			"zipcode": "88025500",
			"street": "Delminda Silveira, 740",
			"city": "Florianópolis ",
			"state": "SC"
		}
	]
}
```

### `GET http://localhost:3000/region/`

**Description:** list

**Headers:**
```json
- name: Content-Type
  value: application/json
- name: Authorization
  value: token <Bearer 1233213213213>

```


### `POST http://localhost:3000/user/login`

**Description:** New Request

**Headers:**
```json
- name: Content-Type
  value: application/json

```
**Request Body:**
```json
{
	"email": "ededias@gmail.com",
	"password": "123456"
}
```

## login

### `DELETE http://localhost:3000/user/678e6ce8c339c1ea1d33a701`

**Description:** delete user


## user

### `PUT http://localhost:3000/user/678e6ce8c339c1ea1d33a701`

**Description:** update user

**Headers:**
```json
- name: Content-Type
  value: application/json
- name: Authorization
  value: token <Bearer 1233213213213>

```
**Request Body:**
```json
{
	"name": "ozmap",
	"email": "ozmap@gmail.com",
	"age": 26,
	"password": "123456"
}
```

### `GET http://localhost:3000/user/678e71e968ea683b0014d8f6`

**Description:** show user

**Headers:**
```json
- name: Content-Type
  value: application/json
- name: Authorization
  value: token <Bearer 1233213213213>

```


### `GET http://localhost:3000/user`

**Description:** list users

**Headers:**
```json
- name: Content-Type
  value: application/json
- name: Authorization
  value: token <Bearer 1233213213213>

```


### `POST http://localhost:3000/user`

**Description:** create user

**Headers:**
```json
- name: Content-Type
  value: application/json

```
**Request Body:**
```json
{
	"name": "ozmap",
	"email": "ozmap@gmail.com",
	"age": 26,
	"password": "123456"
}
```
