<div align='center'>

<img src="./public/logo-rect.svg" alt="Tickits" width="144"/>
<h2 style="">Tickits</h2>
<h3 align="center">Rest API for tickits</h3>

[Demo](https://github.com/nyannss/jokopi-react) · [Related Project](#related-project)

<hr>
<h3 align="center">Powered by Vercel ⚡</h3>
</div>

## Table of Contents

- [Overview](#overview)
  - [Features](#features)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Postman Documentation](#postman-documentation)
- [Table Structure](#table-structure)
- [License](#license)
- [Contributors](#contributors)
- [Related Project](#related-project)
- [Report](#report)

## Overview

Tickits is an open-source web application designed to simplify the process of booking movie tickets online. The project aims to provide users with a convenient and user-friendly platform to browse movie listings, select seats, and purchase tickets from the comfort of their homes.

This is rest api repository for [tickits-fe](https://github.com/purapuraturtle/tickits-fe)

 ### Features

  - Authentication & Authorization
  - Customer Side: Booking Seat Movies, Profile
  - Admin Side: New Movie, Set Cinemas Time, Update Movie, Delete Movie
  - Upload Images, Whitelisting JWT

## Technologies Used

[My Skills](https://skillicons.dev/icons?i=nodejs,express,postgres,redis)

- Node.js
- Express.js
- PostgreSQL (for storing data)
- Cloudinary (for storing images)
- Redis (blacklisting jwt)
- JSON Web Token (authorization)
- Vercel (for deploying)

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org)
- [PostgreSQL Database](https://postgresql.org)
- [Redis](https://redis.io)
- [Cloudinary Account](https://cloundinary.com)

### Installation

1. Clone this repository to your local

   ```bash
   git clone https://github.com/nyannss/jokopi.git
   ```

2. Install dependencies

   ```bash
   cd jokopi && npm install
   ```

3. Setup environments (you can see in `.env.example`)

   - Server port (default 8080)
  
     ```env
     SERVER_PORT = (put your server port)
     ```

   - Database server using postgreSQL

     ```env
     DB_HOST = (put your db host)
     DB_PORT = (put your port of db host)
     DB_USER = (put your db username)
     DB_PASS = (put your db password)
     DB_NAME = (put your db  name)
     ```

   - JSON Web Token Secret Key (prefer using random string) [[see more information]](<https://jwt.io/introduction>)

     ```env
     JWT_SECRET_KEY = (put your secret key)
     ```

   - Redis account [[you can create account in here]](<https://mongodb.com>)

     ```env
      REDIS_HOST = (your redis host)
      REDIS_PORT = (your redis port)
      REDIS_PASSWORD = (your redis password)
     ```

   - Image server using Cloudinary [[you can create account in here]](<https://cloudinary.com/>)

     ```env
     CLOUDINARY_NAME = (put your cloudinary name)
     CLOUDINARY_KEY = (put your cloudinary key)
     CLOUDINARY_SECRET = (put your cloudinary secret)
     ```

   - SMTP Account

     ```env
     SMTP_EMAIL = (your smtp email)
     SMTP_PASSWORD = (your smtp password)
     ```

4. Run project

      ```bash
      npm start
      ```

## Postman Documentation

You can download the documentation from [Postman](https://elements.getpostman.com/redirect?entityId=26209677-86cf2f53-ba40-473a-bbc7-7858774e9b95&entityType=collection) or [JSON File](/tickits-postman-collection.json).

If you using JSON File, you can import them into your workspace, its easy

## Table Structure

You can download table structure (sql) from [this link](/ddl.sql)

For Redis, You just setup and define it to env the database, it will be automatically created by redis.

## License

This project using ISC License

## Contributors

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/afif-buchori"><img src="https://avatars.githubusercontent.com/u/123707908?v=4" width="100px;" alt="Afif Buchori"/><br /><sub><b>Afif Buchori</b></sub></a><br />Project Manager</td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nyannss"><img src="https://avatars.githubusercontent.com/u/80017838?v=4" width="100px;" alt="Farhan Brillan W"/><br /><sub><b>Farhan Brillan W</b></sub></a><br />Fullstack Developer</td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/abdulrosid21"><img src="https://avatars.githubusercontent.com/u/80371735?v=4" width="100px;" alt="Abdul Latif Rosid"/><br /><sub><b>Abdul Latif Rosid</b></sub></a><br />Back-end Developer</td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/raihanirvana"><img src="https://avatars.githubusercontent.com/u/83262495?v=4" width="100px;" alt="Raihan Irvana"/><br /><sub><b>Raihan Irvana</b></sub></a><br />Front-end Developer</td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/zikriaulia28"><img src="https://avatars.githubusercontent.com/u/103765843?v=4" width="100px;" alt="Zikri Aulia"/><br /><sub><b>Zikri Aulia</b></sub></a><br />Front-end Developer</td>
    </tr>
  </tbody>
</table>

## Related Project

- [tickits-fe](https://github.com/purapuraturtle/tickits-fe) - Front-end side

## Report

Any error report you can pull request
or contact: <purapuraturtle69@gmail.com>
