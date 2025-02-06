
const path = require('path');

  exports.onboarding = function(req, res)
{
  const filePath =
   path.join(__dirname, 
    '../../views/Onboarding/index.html');
  res.sendFile(filePath)
       
  }