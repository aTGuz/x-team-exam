var path = require('path')
var funcs = require('./funcs')
var encodeName = funcs.encodName

var session = {
  username: process.argv[2],
  lastMessageHash: process.argv[3]
}

if (!session.username || !session.lastMessageHash) {
  console.log('Usage: node index.js <username> <hash>')
  process.exit(0)
}

// 1. load the database
var dbFile = path.join(__dirname, 'db', 'index.json')
funcs.loadDb(dbFile, function (err, db) {

  // 2. encode the name
  /*
  Changed by Alejandro: alejandro.tarafa@gmail.com
 */
  //Corrections notes: the changes are marked by brackets
  //Changed encodeName(session.username) => [funcs.]encodeName(session.username)
  //Changed encodeName(session.usrename) => funcs.encodeName(session.[username])
  var encoded = funcs.encodeName(session.username)

  // 3. find the user's inbox
  var inbox = funcs.findInbox(db, encoded)

  // 4. find the next message
  var nextMessage = funcs.findNextMessage(inbox, session.lastMessageHash)

  // 5. print out the message.
  // Paste the console output into the "Solution" field and you're done!
  console.log(nextMessage)
})
