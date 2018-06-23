const mongo = require('mongodb').MongoClient
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

}

module.exports = Db
