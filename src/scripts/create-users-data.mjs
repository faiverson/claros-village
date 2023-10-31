import fs from 'fs'
import path from 'path'
import admin from 'firebase-admin'
import serviceAccount from '../../claros-village-firebase-admin.json' assert { type: 'json' }
// create users data in the firebase database

const jsonFilePath = path.join(process.cwd(), 'static/privates/users.json')
const jsonData = fs.readFileSync(jsonFilePath, 'utf-8')
const users = JSON.parse(jsonData)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()
let batch = db.batch()

users.forEach(user =>
{
  let userRef = db.collection('users').doc(user.id)
  batch.set(userRef, user, { merge: true })
})

batch.commit()
  .then(() => console.log(`Users added successfully`))
  .catch(error => console.error(`Error adding users: `, error))
