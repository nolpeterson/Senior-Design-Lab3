import { firestore } from "./firebase"

const getUsers = async () => {
    const snapshot = await firestore.collection("users").get()
    let users = []
    snapshot.docs.forEach(doc => users.push(doc.data()))
    users.forEach(user => console.log(user))
    return users
}

const setUser = async (email, first_name, last_name, password, username) => {
    const userDb = firestore.collection('users').doc()
    await userDb.set({
        email: email,
        first_name: first_name,
        last_name: last_name,
        password: password,
        username: username
    });
}

const getUserID = async (username) => {
    const snapshot = await firestore.collection('users').where('username', '==', username).get()
    snapshot.docs.forEach(doc => console.log(doc.id))
    snapshot.docs.forEach(doc => {return doc.id})
}

const Login = async (username, password) => {
    const snapshot = await firestore.collection('users').where('username', '==', username).where('password', '==', password).get()
    var users = []
    snapshot.docs.forEach(user => users.push(user))
    console.log(users.length)
    return (users.length == 1)
}

export {getUsers, setUser, getUserID, Login}