import { firestore } from "./firebase"
import { getUserID } from "./users"

const getPolls = async () => {
    const snapshot = await firestore.collection("Polls").get()
    snapshot.docs.forEach(doc => console.log(doc.data()))
}

const setPoll = async (dead, loc, note, owner, zone, title, options, users) => {
    const pollDb = firestore.collection('Polls').doc()
    await pollDb.set({
        deadline: dead,
        location: loc,
        notes: note,
        owner_id: owner,
        timezone: zone,
        title: title,
        vote_limit_options: options,
        vote_limit_user: users
    });
}

const getPollID = async (username, title) => {
    const snapshot = await firestore.collection('Polls').where('owner_id', '==', `/users/${getUserID(username)}`).where('title', '==', title).get()
    snapshot.docs.forEach(doc => console.log(doc.id))
    snapshot.docs.forEach(doc => {return doc.id})
}

export {getPolls, setPoll, getPollID}