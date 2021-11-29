import { firestore } from "./firebase"

const getUsers = async () => {
    const snapshot = await firestore.collection("users").get()
    snapshot.docs.forEach(doc => console.log(doc.data()))
}

const setUsers = async (mail, first, last, pass, user) => {
    const userDb = firestore.collection('users').doc()
    await userDb.set({
        email: mail,
        first_name: first,
        last_name: last,
        password: pass,
        username: user
    });
}

export {getUsers, setUsers}