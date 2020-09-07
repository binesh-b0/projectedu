const jwt = require('jsonwebtoken');
const connection = require('../database/conn');

module.exports = (req, res, next) => {
    const { authorization } = req.header;
    if(!authorization){
        return res.status(401).send({error: 'You must be logged in'});
    }

    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if(err){
            return res.status(401).send({error: 'You must be logged in'});
        }

        const { studentId } = payload;
        if(!studentId){
            return res.status(401).send({error: 'You must be logged in'});
        }

        connection.query(
          "SELECT * FROM Credentials WHERE id = ? and IsVerified = 1", [studentId], function(err, results, fields) {
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