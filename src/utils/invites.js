import { firestore } from "./firebase"

const getInvites = async () => {
    const snapshot = await firestore.collection("invites").get()
    let invites = []
    snapshot.docs.forEach(doc => invites.push(doc.data()))
    invites.forEach(invite => console.log(invite))
    return invites
}

const setInvites = async (poll_id, email) => {
    const userDb = firestore.collection('invites').doc()
    await userDb.set({
        Poll_id: poll_id,
        email_to_invite: email
    });
}

export {getInvites, setInvites}