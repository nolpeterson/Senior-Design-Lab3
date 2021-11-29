import { firestore } from "./firebase"

const getUsers = async () => {
    const snapshot = await firestore.collection("users").get()
    let users = []
    snapshot.docs.forEach(doc => users.push(doc.data()))
    users.forEach(user => console.log(user))
    return users
}

const setUser = async (mail, first, last, pass, user) => {
    const userDb = firestore.collection('users').doc()
    await userDb.set({
        email: mail,
        first_name: first,
        last_name: last,
        password: pass,
        username: user
    });
}

const getUserID = async (username) => {
    const snapshot = await firestore.collection('users').where('username', '==', username).get()
    snapshot.docs.forEach(doc => console.log(doc.id))
    snapshot.docs.forEach(doc => {return doc.id})
}

export {getUsers, setUser, getUserID}