const db = require('../../../data/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove
}

async function add(strain) {
    
    const [id] = await db('strains').insert(strain);
  
    return findById(id);
  }

function find() {
    return db('strains').orderBy("id")
}

function findBy(filter) {
    return db('strains').where(filter).orderBy('id')
}

function findById(id) {
    return db('strains').where('user-id',id)
}

function update(id, changes) {
    return db('strains')
      .where({ id })
      .update(changes);
  }
  
function remove(id) {
    return db('strains')
      .where('id', id)
      .del();
  }

