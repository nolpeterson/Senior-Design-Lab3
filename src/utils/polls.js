import { firestore } from "./firebase"
import { getUserID } from "./users"

const getPolls = async () => {
    const snapshot = await firestore.collection("Polls").get()
    snapshot.docs.forEach(doc => console.log(doc.data()))
}

export const getPollsUser = async (username) => {
    const snapshot = await firestore.collection("Polls").where("owner_id", "==", `${username}`).get()
    let userPolls = []
    snapshot.docs.forEach(doc => userPolls.push(doc.data()))
    return userPolls
}

const setPoll = async (deadline, location, notes, username, timezone, title, vote_limit_options, vote_limit_users) => {
    const pollDb = firestore.collection('Polls').doc()
    await pollDb.set({
        deadline: deadline,
        location: location,
        notes: notes,
        owner_id: username,
        timezone: timezone,
        title: title,
        vote_limit_options: vote_limit_options,
        vote_limit_user: vote_limit_users
    });
    return pollDb.id
}

const getPollID = async (username, title) => {
    const snapshot = await firestore.collection('Polls').where('owner_id', '==', `${username}`).where('title', '==', title).get()
    snapshot.docs.forEach(doc => console.log(doc.id))
    snapshot.docs.forEach(doc => {return doc.id})
}

export const verifyDeadline = async (username, title) => {
    var data = await getPoll(username, title)
    console.log(data.deadline.seconds)
    console.log(Date.now())
    console.log(Date.now()/1000 > data.deadline.seconds)
    if (Date.now()/1000 > data.deadline.seconds) {
        return false
    } else {
        return true
    }
}

export const getPoll = async (username, title) => {
    const snapshot = await firestore.collection('Polls').where('owner_id', '==', `${username}`).where('title', '==', title).get()
    snapshot.docs.forEach(doc => console.log(doc.data()))
    return snapshot.docs[0].data()
}

export {getPolls, setPoll, getPollID}