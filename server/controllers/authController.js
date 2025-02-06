

const path = require('path');
exports.login = function(req, res) 
{
 const filePath = path.join(__dirname, '../../views/Partials/login.html');
 res.sendFile(filePath);
}