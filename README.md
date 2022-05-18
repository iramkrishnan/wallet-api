# Wallet API

- **The project is hosted at [https://wallet.ramkrishnan.xyz](https://wallet.ramkrishnan.xyz) (Frontend)**
- **API URL** - `https://api.wallet.ramkrishnan.xyz` **(Backend)**
- **Wallet API is developed using the MERN stack - MongoDB, Express, React, Node.js**
- **This document covers the API part of the application**

---

## Pre-requisites

To run the project locally, you need to have the following: 

- Node  - [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- MongoDB - [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

Note - This is a dockerized application. So you can also use docker to run the app. You can have a look at the `Dockerfile` and `docker-compose.yml` present in the repository

## Get the project

- **Clone the project**
    
    `git clone https://github.com/iramkrishnan/wallet-api.git`
    
- **Change directory**
    
    `cd wallet-api`
    

## Initial Configuration

- Create an `env` file from the given template
    
    `cp .env.example .env`
    
- Copy your database URL (from MongoDB Atlas or local setup) in `DB_URL`

## Install necessary packages

`npm install`

Note - If using docker, just run `docker-compose up -d`

## Run the application (development server)

- `npm start`

Note - to be skipped if using docker

---

## Endpoints

- Setup Wallet - `POST /setup`
- Add Transactions - `POST /transact/:walletId`
- Get Transactions - `GET /transactions`
- Get Wallet Details - `GET /wallet/:id`

---

## Middlewares

- `errorHandler` - Handles error response

---

## Models

### Wallet

- Wallet Model stores the information about the wallet
    - walletId (system generated uuid)
    - name
    - balance
    - date
    - createdAt
    - updatedAt

### Transactions

- Transactions Model stores the information about a transaction
    - transactionId (system generated uuid)
    - walletId
    - balance
    - description
    - amount
    - type (ENUM(’CREDIT’, ‘DEBIT’))
    - date
    - createdAt
    - updatedAt

---

## API Request and Response examples

**Postman Collection - [https://www.getpostman.com/collections/88da009c8261305c583a](https://www.getpostman.com/collections/88da009c8261305c583a)**

### 1. Create Wallet

Request

```jsx
POST /setup HTTP/1.1
Host: https://api.wallet.ramkrishnan.xyz
Content-Type: application/json

{
    "name": "Wallet A",
    "balance": 10
}
```

Response 

```jsx
{
    "status": true,
    "statusCode": 200,
    "statusMessage": "Success",
    "response": {
        "id": "e1d87cda-2d7b-4a9c-85dc-faa9800aedda",
        "balance": 10,
        "transactionId": "f062fc26-839e-4144-8ffe-7d8689d23c8d",
        "name": "Wallet A",
        "date": "2022-05-18T16:07:54.201Z"
    }
}
```

### 2. Credit/Debit Transactions

Request

```jsx
POST /transact/e1d87cda-2d7b-4a9c-85dc-faa9800aedda HTTP/1.1
Host: https://api.wallet.ramkrishnan.xyz
Content-Type: application/json
{
    "amount": 2.4,
    "description": "Recharge"
}
```

Response

```jsx
{
    "status": true,
    "statusCode": 200,
    "statusMessage": "Success",
    "response": {
        "balance": 12.4,
        "transactionId": "a4d3e1c3-cfc6-4db5-ba62-767e2682e460"
    }
}
```

### 3. Fetching transactions on wallet

Request

```jsx
GET /transactions?walletId=e1d87cda-2d7b-4a9c-85dc-faa9800aedda&skip=0&limit=10 HTTP/1.1
Host: https://api.wallet.ramkrishnan.xyz
Content-Type: application/json

auth-token: <enter_your_auth_token> // as recieved from Login API
```

Response

```jsx
{
    "status": true,
    "statusCode": 200,
    "statusMessage": "Success",
    "response": {
        "transactions": [
            {
                "id": "a4d3e1c3-cfc6-4db5-ba62-767e2682e460",
                "walletId": "e1d87cda-2d7b-4a9c-85dc-faa9800aedda",
                "amount": 2.4,
                "balance": 12.4,
                "description": "Recharge",
                "date": "2022-05-18T16:08:39.077Z",
                "type": "CREDIT"
            },
            {
                "id": "f062fc26-839e-4144-8ffe-7d8689d23c8d",
                "walletId": "e1d87cda-2d7b-4a9c-85dc-faa9800aedda",
                "amount": 10,
                "balance": 10,
								"description": "Setup",
                "date": "2022-05-18T16:07:54.207Z",
                "type": "CREDIT"
            }
        ],
        "totalCount": 2
    }
}
```

### 4. Get Wallet Details

Request

```jsx
POST /wallet/e1d87cda-2d7b-4a9c-85dc-faa9800aedda HTTP/1.1
Host: https://api.wallet.ramkrishnan.xyz
Content-Type: application/json
```

Response

```jsx
{
    "status": true,
    "statusCode": 200,
    "statusMessage": "Success",
    "response": {
        "id": "e1d87cda-2d7b-4a9c-85dc-faa9800aedda",
        "balance": 12.4,
        "name": "Wallet A",
        "date": "2022-05-18T16:07:54.201Z"
    }
}
```
