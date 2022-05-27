const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'habuild',
  password: 'password',
  port: 5432,
})
const jwt = require("jsonwebtoken");

const {v4 : uuidv4}=require('uuid');

const getRating = (request, response) => {
    pool.query('SELECT t.id, t.name, r.rating from topics as t, ratings as r where t.id=r.tid order by r.rating desc', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}


const getRatingById = (request, response) => {
    const id = request.params.id;
    pool.query('SELECT t.id, t.name, r.rating from topics as t, ratings as r where t.id=$1 and r.tid=$1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const login = (req, res) => {
  const user = {
    id: 1,
    username: "bob",
    email: "bob@test.com",
  };

  jwt.sign({ user }, "secretkey", {expiresIn: '2m'}, (err, token) => {
    res.json({
      token,
    });
  });
};

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).send('No Token Found');
  }
}

const createEntry = (request, response) => {
  jwt.verify(request.token, 'secretkey', (err) => {

    if(err){
      response.status(403).send(`Unauthorized Access!`);
    }else{

      const { name, rating } = request.body;
      
      const id=uuidv4();
      const rid=uuidv4();
      
      
      pool.query(
        "INSERT INTO topics (id,name) VALUES ($1,$2)",
        [id,name],
        (error, result) => {
          if (error) {
            throw error;
          }
          pool.query(
            'insert into ratings(rid,rating,tid) values($1,$2,(select id from topics where name=$3))',
            [rid,rating,name], (error,result) => {
              if(error) {
                throw error
              }
            }
          );
            response.status(201).send(`Entry Added to both Topics and Ratings Table.`);
        }
      );
    }
  })
};

const updateRating = (request, response) => {
  jwt.verify(request.token, 'secretkey', (err) => {

    if(err){
      response.status(403).send(`Unauthorized Access!`);
    }else{
    const name = request.params.name;
    const { rating } = request.body;

    pool.query(
      "UPDATE ratings SET rating = $1 WHERE rid = (select rid from ratings where tid = (select id from topics where name=$2))",
      [rating, name],
      (error, results) => {
        if (error) {
          console.log('Hello');
          throw error
        }
        response.status(200).send(`Movie ${name} rated as ${rating}`)
      }
    );
    }
  })
}

module.exports = {
    getRating,
    getRatingById,
    updateRating,
    createEntry,
    login,
    verifyToken
}




