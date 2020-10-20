const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authenticate = require('./auth/authenticate-middleware')
const authRouter = require('./auth/auth-router')
const userRouter = require('./routes/user/user-router.js')
const strainRouter = require('./routes/favorite-strains/strains-router')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth',authRouter);
server.use('/api/user',authenticate,userRouter)
server.use('/api/strains',authenticate,strainRouter)
server.get("/", (req, res) => {
    res.json({ api: "up" });
  });
  

module.exports = server;