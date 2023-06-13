<p align="center">
  <img src="/img/logo.jpg" alt="Logo" height="180">
</p>

<h1 align="center">boothUP! Web Service</h1>

<div align="center">

[![CC Member](https://img.shields.io/github/contributors/Bangkit-Capstone-CR23-PR565/Cloud-Computing?color=blue)](#cc-member)
  
</div>

boothUP! Web Service is a web service that allows SMEs to search for stall availability for them to sell their products based on their preferences, which are their location and what category of events/tradeshows they're interested to.

> Base URL of this service is: http://localhost:8080/ (The deployed base url is not included due to protecting data such as user information)

Services available:

- Authentications
  <pre>POST /register</pre>
  <pre>POST /login</pre>
  <pre>POST /logout</pre>

- Users
  <pre>GET  /users</pre>
  <pre>GET  /users/{user_id}</pre>

- Events
  <pre>GET  /events</pre>
  <pre>GET  /events/{event_id}</pre>

- Ratings
  <pre>GET  /ratings</pre>
  <pre>GET  /ratings/{rating_id}</pre>
  <pre>GET  /events/{event_id}/ratings</pre>
  <pre>GET  /users/{user_id}/ratings</pre>
  <pre>POST /ratings</pre>
  <pre>DEL  /ratings/{rating_id}</pre>

- User Likes
  <pre>GET  /users/{user_id}/likes</pre>
  <pre>POST /users/{user_id}/likes</pre>
  <pre>DEL  /users/{user_id}/likes/{event_id}</pre>

- Recommendation Results
  <pre>GET  /users/{user_id}/recommendation-results</pre>
  
# Quick Look

## Architecture

<p align="center">
  <img src="img/gcp_architecture.png" alt="GCP Architecture" height="360"/>
</p>

# Authentications
This service uses token authentication for secure access. To access the service, create an account and obtain a token. The token is composed of two parts: accessToken and refreshToken, with the accessToken valid for 30 days. To refresh the token, send the refreshToken to the service. 
Follow these steps to ensure secure access: 
- Create an account, obtain a token.
- Use the token to access the service,
- And refresh the token if it expires.

By following these steps, you can ensure secure access to the service and keep your data safe.

# Features
## Recommendations Service
Recommendation service is work based on user's preferences; location and what kind of event/tradeshow category they're interested to. Those two are inputted in the registration process. After the system get the user's data, the machine learning process will match the user's preferences with the even/tradeshow preferences. The results are the best match of both.
## Search Events by Location

## Dependencies

* [Express](https://www.npmjs.com/package/express)
* [JWT](https://www.npmjs.com/package/@hapi/jwt)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [DotEnv](https://www.npmjs.com/package/dotenv)
* [CORS](https://www.npmjs.com/package/cors)
* [MySQL2](https://www.npmjs.com/package/mysql2)
* [Sequelize](https://www.npmjs.com/package/sequelize)
* [Cookie-parser](https://www.npmjs.com/package/cookie-parser)
