### User Order REST API:
---
This is a simple user order api. You can create their account, update their account and delete their account. You can also get all users and user by their `userId`. You can also see all orders of specific user and calculate their total price.

### How to run locally:
---

###### Create .env file:
**Create a new environment file and put it these variables:**

```javascript
PORT=PORT_NUMBER
DATABASE_URL=YOUR_DATABASE_URL
BCRYPT_SALT_ROUNDS=BYCRYPT_SALT_ROUNDS NUMBER 

```

###### You have to run these commands to run typescript locally:


```javascript
npm install
npm run dev
```

###### You have to run these commands to run javascript locally:

```javascript
  npm run build
  npm start
```

###### You have to run this command for linting:

```javascript
  npm run lint
```
