
module.exports = function (req, res, next){
 // 401 unauthorized
 // 403 Forbidden (you're authethicated but not authorized to access that data)
     if(!req.user.isAdmin) return res.status(403).send('Access denied');
     next();
}