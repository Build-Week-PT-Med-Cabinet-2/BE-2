const express = require('express')
const router = express.Router()
const strains = require('./strains-model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const filter = require('../../helpers/reqFilter')


router.get('/', (req, res) => {
    let id = req.decodedJwt.userid
    strains.findById(id)
        .then(response => res.status(200).json(response))
        .catch(err=> res.status(500).json({error: err.message}))
})

router.post('/', (req, res) =>{ 
        let firstBody = filter(req.body)
        let newBody = Object.assign(firstBody,{'user_id': req.decodedJwt.userid})
        console.log(newBody)
    strains.add(newBody)
        .then( response => res.status(200).json(response))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err.message})
        })
})

router.put('/:id', (req, res) => {
    console.log("PUT REQUEST",req.body)
    strains.update(req.params.id,req.body)
        .then(response => res.status(200).json(response[0]))
        .catch(err => res.status(500).json({error: err.message}))
})

router.delete('/:id', (req, res) => {
    strains.remove(req.params.id)
        .then(response=> res.status(200).json({message:`Strain #${req.params.id} Deleted`}))
        .catch(err => res.status(500).json({error: err.message}))
})

module.exports = router