'use strict'

async function newUser (user, connection, dbName) {

  try {

    let conn = await connection
    let db = await conn.db(dbName)
    let result = await db.collection('users').insertOne(user)
    return  result

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

    return  Promise.resolve(new Error('User not found'))

    } catch (e) {
      return Promise.resolve(new Error(e.message))
    }

}

module.exports = {
  newUser,
  getUser
}
