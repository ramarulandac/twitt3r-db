'use strict'

const Db = require('../')
const config = require('../config').db
const test = require('ava')
const fixtures = require('./fixtures');

//const db = new Db(config);



test.beforeEach('Setup database', async t => {

  const db = new Db(config);
  db.connect()
  t.context.db = db
  t.true(db.connected, 'Should be connected')

})

test('newUser & getUser', async t => {

  let db = t.context.db

 // new user created
  let user = fixtures.newUser()
  let result = await db.newUser(user)
// new user found and matched
  let userSaved = await db.getUser(result.ops[0].username)
  t.truthy(result.ops[0]);
  t.truthy(userSaved)
  t.deepEqual(result.ops[0], userSaved)

})

test('new Note & get Note & get Notes', async t => {
  let db = t.context.db

  // User creation
  let user = fixtures.newUser()
  let userSaved = await db.newUser(user)
  let userId = userSaved.ops[0]._id

  // 3 new notes created
  let note1st = await fixtures.newNote1st(userId)
  let note2nd = await fixtures.newNote2nd(userId)
  let note3rd = await fixtures.newNote3rd(userId)

  let result1st = await db.newNote(note1st)
  let result2nd = await db.newNote(note2nd)
  let result3rd = await db.newNote(note3rd)

  // 1st note found
  let note1 = await db.getNotes(result1st.ops[0]._id)
  t.deepEqual(note1, note1st)
 // notes recovered
  let resultArray = await db.getNotes(null, 3)
  t.truthy(resultArray)

})

test('new favourite & get Favourites', async t => {

  let db = t.context.db
  // New user
  let user = fixtures.newUser()
  let userSaved = await db.newUser(user)

  // New note
  let note = await fixtures.newNote1st(userSaved.ops[0]._id)
  let noteSaved = await db.newNote(note)
  // New user -> new favourite note
  let favourite = fixtures.newFavourite(userSaved.ops[0].username, noteSaved.ops[0]._id)
  let result = await db.newfavourite(favourite)
  // Number of rows updated
  t.is(result.length,1)
  // New user
   note = await fixtures.newNote2nd(userSaved.ops[0]._id)
   noteSaved = await db.newNote(note)
  // New note -> new favourite for the same user
   favourite = fixtures.newFavourite(userSaved.ops[0].username, noteSaved.ops[0]._id)
   result = await db.newfavourite(favourite)
  // Number of favourites for the same user
   let favourites = await db.getFavourites(userSaved.ops[0].username, 3)
   t.is(favourites.length,2)
})
