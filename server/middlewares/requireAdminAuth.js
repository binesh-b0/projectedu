const jwt = require('jsonwebtoken');
const connection = require('../database/conn');

module.exports = (req, res, next) => {
    const authorization = req.header('authorization');
    console.log(authorization);
    if(!authorization){
        return res.status(401).send({error: 'You must be logged in'});
    }

    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if(err){
            return res.status(401).send({error: 'You must be logged in'});
        }

        const { adminId, timestamp } = payload;
        if(!adminId){
            return res.status(401).send({error: 'You must be logged in'});
        }

        const curTimestamp = new Date();
        const tokenTimestamp = new Date(timestamp);

        const timeDifference = curTimestamp.getTime() - tokenTimestamp.getTime();
        const hoursDifference = Math.floor(timeDifference/1000/60/60);

        if(hoursDifference > 12){
            res.clearCookie('adminToken');
            return res.redirect('http://localhost:3000/sessionExpired');
        }

        connection.query(
          "SELECT * FROM AdminCredentials WHERE id = ? and Status = 'active'", [adminId], function(err, results, fields) {
              if(err){
                  return res.status(500).send({error: 'Internal Server Error'});
              }
              if(results.length == 0){
                  return res.status(401).send({error: 'You must be logged in'});
              }

              const user = results[0];
              req.user = user;
              next();
          }  
        );
    });
}