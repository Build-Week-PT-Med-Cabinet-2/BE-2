const db = require('../../../data/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove
}

 async function add(user) {
    const {id} = await db('users').insert(user);
  
    return findById(id);
  
    //  return db('users').insert(user)
    //     .then(user => findById(user.id))
  
    
  }

function find() {
    return db('users').select("id","username").orderBy("id")
}

function findBy(filter) {
    return db('users').where(filter).orderBy('id')
}

function findById(id) {
    return db('users').where('id',id);
}

function update(id, changes) {
     return db('users')
      .where({ id })
      .update(changes);
  }
  
function remove(id) {
    return db('users')
      .where('id', id)
      .del();
  }