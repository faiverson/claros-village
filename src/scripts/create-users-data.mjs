import fs from 'fs'
import path from 'path'
import admin from 'firebase-admin'
import serviceAccount from '../../claros-village-firebase-admin.json' assert { type: 'json' }

const jsonFilePath = path.join(process.cwd(), 'static/privates/users.json')
const jsonData = fs.readFileSync(jsonFilePath, 'utf-8')
const users = JSON.parse(jsonData)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()
let batch = db.batch()

// Check if the collection exists, otherwise create it
const neighborsCollectionRef = db.collection('neighbors')
neighborsCollectionRef.get()
  .then(snapshot => {
    if (snapshot.empty) {
      neighborsCollectionRef.doc().set({})
    }
  })
  .catch(error => console.error(`Error checking if collection exists: `, error))

users.forEach(user => {
  let userRef = db.collection('neighbors').doc(user.id)
  batch.set(userRef, user, { merge: true })
})

batch.commit()
  .then(() => console.log(`Neighbors added successfully`))
  .catch(error => console.error(`Error adding users: `, error))
