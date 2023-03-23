# Telegram Chatbot

## Description

* This is an attempt to make an intelligent Telegram chatbot using MongoDB and API from openai.
* I follow this post: https://www.facebook.com/groups/j2team.community/permalink/2066213607044082

## Important

* api key, database passphrase, etc should be saved in a .env file in the same folder as app.js

## Instruction

* clone this folder to your machine
* add the .env file with credentials in the form:
  * OPENAI_KEY = "\<your OpenAI api key\>"
  * MONGO_URI = "\<your MongoDB URI\>"
  * TELEGRAM_KEY ="\<your telegram chatbot key\>"
* after that, type the following command to the folder containing app.js file
  ```
  npm init
  press "Enter" until it's done
  npm install openai
  npm install dotenv
  npm install mongoose
  ```
* Remember to also add your IP address to MongoDB so the bot can access your database from your IP
* Try
  ```
  node app.js
  ```
* And your chatbot should run perfectly