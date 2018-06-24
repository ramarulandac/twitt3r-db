'use strict'

const uuid = require('uuid-base62')
const fixtures = {

  newUser () {
    return {
      name: `Fulanito${uuid.v4()}`,
      username: `user_${uuid.v4()}`,
      email: `${uuid.v4()}@twitt3r.es`
    }
  },

  newNote1st (userId) {
    const date = new Date()
    return {
      sentence: 'Primero lo primero',
      userId: userId,
      favourite: 0,
      createdAt: date.toISOString()
    }
  },

 newNote2nd (userId) {
    const date = new Date()
      return {
        sentence: 'Al mal tiempo buena cara',
        userId: userId,
        favourite: 0,
        createdAt: date.toISOString()
      }
  },

  newNote3rd (userId) {
    const date = new Date()
       return {
         sentence: 'El que no corre vuela',
         userId: userId,
         favourite: 0,
         createdAt: date.toISOString()
       }
   },

   newFavourite (username, noteId) {

     return {
       username:username,
       noteId:noteId
     }

   }
}

module.exports = fixtures
