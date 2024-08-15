function ensureAuthorOrAdmin(req, res, next) {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'author')) {
      return next();
    } else {
      res.status(403).send('Access denied');
    }
  }
  
  module.exports = { ensureAuthorOrAdmin };
  