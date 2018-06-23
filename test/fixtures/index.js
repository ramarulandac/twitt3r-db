'use strict'

const uuid = require('uuid-base62')
const fixtures = {

  newUser () {
    return {
      name: 'Fulanito',
      username: `user_${uuid.v4()}`,
      password: uuid.uuid(),
      email: `${uuid.v4()}@twitt3r.es`
    }
  }
}
module.exports = fixtures
