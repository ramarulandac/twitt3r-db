'use strict'

const mongo = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const dbUtils = require('./dbUtils')


class Db {

  constructor (config) {
    this.url = `${config.service}://${config.host}:${config.port}`
    this.db = `${config.db}`
    this.connection = null
    this.connected = false
  }

  connect () {
    this.connection = mongo.connect(this.url)
    this.connected = true
  }


  disconnect () {
    if (!this.connected) {
      return Promise.reject(new Error('DB not Connected'))
    }

   this.connected = false
   return this.connection.then(conn => conn.close(err => {(err)? console.log(`Error closing the DB`):console.log('DB connection closed')}))
  }

  newUser (user) {
    if (!this.connected) {
      return Promise.reject(new Error('DB not Connected'))
    }

   return (async () => { let result = await dbUtils.newUser(user, this.connection, this.db); return result })()
  }


  getUser (username) {
    if (!this.connected) {
      return Promise.reject(new Error('DB not Connected'))
    }

    return (async () => { let user = await dbUtils.getUser(username, this.connection, this.db); return user })()
  }

  newNote (note) {
    if (!this.connected) {
      return Promise.reject(new Error('DB not Connected'))
    }

   return (async () => { let result = await dbUtils.newNote(note, this.connection, this.db); return result })()
  }

  getNotes (noteId, numNotes) {
    if (!this.connected) {
      return Promise.reject(new Error('DB not Connected'))
    }

    return (async () => { let notes = await dbUtils.getNotes(noteId, this.connection, this.db, numNotes); return notes })()
  }


  newfavourite (favourite) {
    if (!this.connected) {
      return Promise.reject(new Error('DB not Connected'))
    }

   // ObjectId conversion
    (typeof favourite.noteId === 'String')? favourite.noteId = ObjectId(favourite.noteId):null;

    return (async () => {

      let user = await dbUtils.getUser(favourite.username, this.connection, this.db)

      if (user) {

        let note = await dbUtils.getNotes(favourite.noteId, this.connection, this.db)

        if (note) {
          let result = await dbUtils.newFavourite({'userId': user._id,'noteId':favourite.noteId }, this.connection, this.db);
          if (result.ops[0].insertCount = 1) {
            return result.ops
          }
        }
      }

     return false

    })()
  }

  getFavourites (username, numNotes) {

    if (!this.connected) {
      return Promise.reject(new Error('DB not Connected'))
    }

    // ObjectId conversion
    return (async () => {

      let user = await dbUtils.getUser(username, this.connection, this.db);
      if (user) { return await dbUtils.getFavourites(user._id, this.connection, this.db, numNotes) }

     return false

    })()
  }

}

module.exports = Db
