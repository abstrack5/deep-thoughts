const jwt = require("jsonwebtoken");

const secret = "mysecretsshhhhh";
const expiration = "2h";

module.exports = {
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  authMiddleware: function  ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // separate "Bearer" from "<tokenvalue>"
    if (req.headers.authorization) {
        token = token
            .split(' ')
            .pop()
            .trim()
    }

    // if no token, return request object 
    if (!token) {
        return req;
    }

    // We don't want an error thrown on every request, though. 
    // Users with an invalid token should still be able to request and see all thoughts. 
    // Thus, we wrapped the verify() method in a try...catch statement to mute the error.
    try {
        // decode and attach user data to request object
        // This is where the secret becomes important. If the secret on jwt.verify() doesn't match the secret that was used with jwt.sign(), 
        //the object won't be decoded. When the JWT verification fails, an error is thrown.
        const { data } = jwt.verify(token, secret, {maxAge: expiration});
        req.user = data;
    } catch {
        console.log('Invalid Token');
    }

    // return updated request object
    return req;
  }


};
