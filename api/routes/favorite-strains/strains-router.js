const express = require('express')
const router = express.Router()
const strains = require('./strains-model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    let id = req.decodedJwt.userid
    console.log(id)
    strains.findById(id)
        .then(
            response => res.status(200).json(response)
            
        )
        .catch(
            err => res.status(400).json(err.message)
        )
})

router.post('/', (req, res) =>{ 
    let newBody = Object.assign(req.body,{'user_id': req.decodedJwt.userid})
    strains.add(newBody)
        .then( response => res.status(200).json(response))
        .catch(
            err => res.status(404).json(err.message)
        )
})

router.put('/:id', (req, res) => {
    strains.update(req.params.id,req.body)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(404).json(err.message))
})

router.delete('/:id', (req, res) => {
    strains.remove(req.params.id)
        .then(response=> res.status(200).json({message:`Strain #${req.params.id} Deleted`}))
        .catch(err => res.status404.json
    )
})

module.exports = router