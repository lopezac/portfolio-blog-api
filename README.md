# members-only

This is the RESTful API of my Portfolio Blog. It has CRUD operations for posts
and comments and user authentication.

It does validation with
[express-validator](https://express-validator.github.io/docs/) of everything
from creating a post, to sign in. It encrypts passwords and uses Passport with the
Bearer Token, and JWT Web Token for the authentication.

Is used by 2 front ends, my
[portfolio blog](https://www.lopezaxel.netlify.app/blog) to get posts and comments,
and write comments, and my [portfolio blog CMS](https://www.lopezaxel-blog-cms) to
create and update posts and comments.

This is the [API url](https://shielded-lowlands-16962.herokuapp.com).

# Technologies Used

- [Express](https://expressjs.com/)
- [NodeJS](https://nodejs.dev/en/)
- [Heroku](https://www.heroku.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [PassportJS](https://www.passportjs.org/)
- [JWT Web Token](https://jwt.io/)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
