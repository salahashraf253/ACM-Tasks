# Project Support
### Introduction
Project Support is an open source platform that enable users share causes they're passionate about and actively involved with with the hopes of connecting with other users equally interested in working with them on the given cause.
<!-- ### Project Support Features
* Users can signup and login to their accounts
* Public (non-authenticated) users can access all causes on the platform -->
* Authenticated users can access all causes as well as create a new cause, edit their created cause and also delete what they've created.
<!-- ### Installation Guide
* Clone this repository [here](https://github.com/blackdevelopa/ProjectSupport.git).
* The develop branch is the most stable branch at any given time, ensure you're working from it.
* Run npm install to install all dependencies
* You can either work with the default mLab database or use your locally installed MongoDB. Do configure to your choice in the application entry file.
* Create an .env file in your project root folder and add your variables. See .env.sample for assistance. -->
### Usage
* Run npm start:dev to start the application.
* Connect to the API using Postman on port 3000.
### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /users | To create a new user account |
| POST | /user/login | To login an existing user account |
| POST | /products | To create a new product |
| GET | /users/:userId/cart | To get cart of user |
| GET | /products/?category=<>&orderBy=<>&sellerId=<> | To get all products |
| PATCH | /users/:userId | To edit the details of a single user |
| DELETE | /users/:userId | To delete a single user |
| DELETE | /users/:userId/carts/:productId | To remove product from user's cart |
### Technologies Used
* [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
* [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
* [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.
* [Mongoose ODM](https://mongoosejs.com/) This makes it easy to write MongoDB validation by providing a straight-forward, schema-based solution to model to application data.
<!-- ### Authors
* [Black Developa](https://github.com/blackdevelopa)
* ![alt text](https://avatars0.githubusercontent.com/u/29962968?s=400&u=7753a408ed02e51f88a13a5d11014484bc4d80ee&v=4) -->
<!-- ### License
This project is available for use under the MIT License. -->
