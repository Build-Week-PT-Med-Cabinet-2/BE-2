const express = require('express')
const router = express.Router()
const strains = require('./strains-model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

function filter (obj) {
    const allowed = ['Ailment','Description','Effects_x','Effects_y','Flavor','Rating','Strain','Type','user_id']
    let filtered = Object.keys(obj)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
            obj[key] = obj[key];
            return obj;
          }, {})
        console.log(filtered)
        return filtered 
}

router.get('/', (req, res) => {
    let id = req.decodedJwt.userid
    strains.findById(id)
        .then(response => res.status(200).json(response))
        .catch(err=> res.status(500).json({error: err.message}))
})

router.post('/', (req, res) =>{ 
        let newBody = Object.assign(req.body,{'user_id': req.decodedJwt.userid})
        // delete newBody.Unnamed;
        // delete newBody.id;
        // delete newBody.fitness;
    
       
        let finalBody = filter(newBody)
        console.log(finalBody)
    strains.add(finalBody)
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