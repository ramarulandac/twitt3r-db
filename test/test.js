'use strict'

const Db = require('../')
const config = require('../config').db
const test = require('ava')
const fixtures = require('./fixtures');

const db = new Db(config);

db.connect();

test('newUser & getUser', async t => {

  let user = fixtures.newUser()
  let result = await db.newUser(user)
  let userSaved = await db.getUser(result.ops[0].username)
  t.truthy(result.ops[0]);
  t.truthy(userSaved)
  t.deepEqual(result.ops[0], userSaved)

})
