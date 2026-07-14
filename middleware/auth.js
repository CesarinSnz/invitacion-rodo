function requireAuth(req, res, next) {
  if (req.signedCookies && req.signedCookies.admin_session === 'valido') {
    return next();
  }
  return res.redirect('/admin/login');
}

module.exports = { requireAuth };