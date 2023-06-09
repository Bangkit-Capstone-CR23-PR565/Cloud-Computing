<p align="center">
  <img src="img/eventmu.png" alt="Logo" height="180" />
</p>

<h1 align="center">Event.mu Web Service</h1>

Lorem ipsum dolor sit amet.

> Base url of this service is: http://localhost:8080/

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
  <pre>DEL  /ratings</pre>

- User Likes
  <pre>GET  /users/{user_id}/likes</pre>
  <pre>GET  /users/{user_id}/likes/{like_id}</pre>
  <pre>POST /users/likes</pre>
  <pre>DEL  /users/likes</pre>

- Recommendation Results (not yet done)
  <pre>GET  /users/{user_id}/recommendation-results</pre>
  <pre>GET  /users/{user_id}/recommendation-results/{event_id}</pre>
