const express = require('express')
const router = express.Router()
const user = require('./user-model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    let id = req.decodedJwt.userid
    user.findById(id)
        .then(success => {
            res.status(200).json(success)
        })
})

router.put('/',(req,res)=> {
    let id = req.decodedJwt.userid
    if (req.body.password){
        let hashed = bcrypt.hashSync(req.body.password,10)
        let newPassword = {'password': hashed}
        user.update(id, newPassword)
            .then(success => {res.status(200).json(success)})
            .catch(err => res.status(500).json({error: err.message}))
    }
    else{
        user.update(id, req.body)
        .then(success => res.status(200).json(success))
        .catch(err => res.status(500).json({error: err.message}))
    }
})

router.delete('/', (req,res) => {
    let id = req.decodedJwt.userid
    user.remove(id)
        .then(success => res.status(200).json({message: "user deleted"}))
        .catch(err => res.status(500).json({error: err.message}))
})

module.exports = router