import { firestore } from "./firebase"
import { getUserID } from "./users"

const getPolls = async () => {
    const snapshot = await firestore.collection("Polls").get()
    snapshot.docs.forEach(doc => console.log(doc.data()))
}

const setPoll = async (deadline, location, notes, owner_id, timezone, title, vote_limit_options, vote_limit_users) => {
    const pollDb = firestore.collection('Polls').doc()
    await pollDb.set({
        deadline: deadline,
        location: location,
        notes: notes,
        owner_id: owner_id,
        timezone: timezone,
        title: title,
        vote_limit_options: vote_limit_options,
        vote_limit_user: vote_limit_users
    });
}

const getPollID = async (username, title) => {
    const snapshot = await firestore.collection('Polls').where('owner_id', '==', `/users/${getUserID(username)}`).where('title', '==', title).get()
    snapshot.docs.forEach(doc => console.log(doc.id))
    snapshot.docs.forEach(doc => {return doc.id})
}

export {getPolls, setPoll, getPollID}