import { firestore } from "./firebase"
import emailjs from "emailjs-com"

const getInvites = async () => {
    const snapshot = await firestore.collection("invites").get()
    let invites = []
    snapshot.docs.forEach(doc => invites.push(doc.data()))
    invites.forEach(invite => console.log(invite))
    return invites
}

const setInvite = async (email, username, title, url) => {
    const userDb = firestore.collection('invites').doc()
    await userDb.set({
        owner: username,
        email_to_invite: email,
        title: title,
        url: url
    });
}

export const resendEmail = async (username, title) => {
    const snapshot = await firestore.collection("invites").where('owner', '==', username).where('title', '==', title).get()
    let invites = []
    snapshot.docs.forEach(invite => invites.push(invite.data()))
    invites.forEach(invite => console.log(invite.email_to_invite))
    invites.forEach(invite => emailjs.send("service_4da7hz1","template_ixccgdi",{reply_to: invite.email_to_invite, message: invite.url},"user_C9QFMXD2JTZf0mLcSM271")
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    ))
}

export {getInvites, setInvite}