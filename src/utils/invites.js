import { firestore } from "./firebase"
import { getPollID } from "./polls"

const getInvites = async () => {
    const snapshot = await firestore.collection("invites").get()
    let invites = []
    snapshot.docs.forEach(doc => invites.push(doc.data()))
    invites.forEach(invite => console.log(invite))
    return invites
}

const setInvite = async (email, username, title) => {
    const userDb = firestore.collection('invites').doc()
    await userDb.set({
        owner: username,
        email_to_invite: email,
        title: title
    });
}

export {getInvites, setInvite}