import { firestore } from "./firebase"

const getEvents = async () => {
    const snapshot = await firestore.collection("events").get()
    let events = []
    snapshot.docs.forEach(doc => events.push(doc.data()))
    events.forEach(event => console.log(event))
    return events
}

const setEvent = async (datetime, lenght, participant_name, poll_id) => {
    const userDb = firestore.collection('users').doc()
    await userDb.set({
        datetime: datetime,
        length: lenght,
        participant_name: participant_name,
        poll_id: poll_id
    });
}

export {getEvents, setEvent}