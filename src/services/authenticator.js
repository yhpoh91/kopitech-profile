const { L } = require('./logger')('Authenticator');

const authenticate = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers['authorization'];
    if (authorizationHeader == null) {
      res.status(401).send('invalid authorization header');
      return;
    }

    const prefix = 'Bearer ';
    if (authorizationHeader.indexOf(prefix) < 0) {
      res.status(401).send('invalid authorization header');
      return;
    }

    const token = authorizationHeader.slice(prefix.length);

    // TODO: Validate Token
    let hasAccess = true;


    if (!hasAccess) {
      res.status(401).send('unauthorized');
      return;
    }

    next();
  } catch (error) {
    L.error(error.message); 
    res.status(401).send('unauthorized');
  }
};

module.exports = {
    authenticate,
};
