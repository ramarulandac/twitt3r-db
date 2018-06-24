'use strict'

async function newUser (user, connection, dbName) {

  try {

    let conn = await connection
    let db = await conn.db(dbName)
    let result = await db.collection('users').insertOne(user)
    return result

  } catch (e) {
    return Promise.resolve(new Error(e.message))
  }
}

async function getUser (username, connection, dbName) {

  try {

    let conn = await connection
    let db = await conn.db(dbName)
    let result = await db.collection('users').findOne({'username':username})
    if (result) {
      return result
    }

    return false

    } catch (e) {
      return Promise.resolve(new Error(e.message))
    }

}

async function newNote (note, connection, dbName) {

    try {

      let conn = await connection
      let db = await conn.db(dbName)
      let result = await db.collection('notes').insertOne(note)
      return result

    } catch (e) {
      return Promise.resolve(new Error(e.message))
    }

}

async function getNotes (noteId, connection, dbName, numNotes) {

  try {
    let result
    let conn = await connection
    let db = await conn.db(dbName)

    if (noteId) {

       result = await db.collection('notes').findOne({'_id':noteId})
       
    } else {
       result = await db.collection('notes').find({}).sort({'createdAt':-1}).limit(numNotes).toArray()
    }

    if (result) {
      return result
    }

    return false

    } catch (e) {
      return Promise.resolve(new Error(e.message))
    }

}

async function newFavourite (favourite, connection, dbName) {

    try {

      let conn = await connection
      let db = await conn.db(dbName)
      let resultUp = await db.collection('notes').updateOne({'_id':favourite.noteId},{'$inc':{'favourite':1}})
      let resultIns = await db.collection('favourites').insertOne(favourite)

      return resultIns

    } catch (e) {
      return Promise.resolve(new Error(e.message))
    }

}

async function getFavourites (userId, connection, dbName, numNotes) {

  try {
    let result
    let conn = await connection
    let db = await conn.db(dbName)

    if (userId) {
       result = await db.collection('favourites').find({'userId':userId}).sort({'createdAt':-1}).limit(numNotes).toArray()
       if (result.length > 0) {
         return result
       }
    }

    return false

    } catch (e) {
      return Promise.resolve(new Error(e.message))
    }

}


module.exports = {
  newUser,
  getUser,
  newNote,
  getNotes,
  newFavourite,
  getFavourites
}
