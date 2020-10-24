const express = require('express')
const router = express.Router()
const strains = require('./strains-model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    let id = req.decodedJwt.userid
    strains.findById(id)
        .then(response => res.status(200).json(response))
        .catch(err=> res.status(500).json({error: err.message}))
})

router.post('/', (req, res) =>{ 
    
    const allowed = ['Ailment','Description','Effects_x','Effects_y','Flavor','Rating','Strain','Type']
    let filtered = Object.keys(req.body)
        .filter(key => allowed.includes(key))
        .reduce((obj,key) => {
            return {
                ...obj,
                [key]: newBody[key]
            }
        })
        let newBody = Object.assign(filtered,{'user_id': req.decodedJwt.userid})
    strains.add(newBody)
        .then( response => res.status(200).json(response))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err.message})
        })
})

router.put('/:id', (req, res) => {
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