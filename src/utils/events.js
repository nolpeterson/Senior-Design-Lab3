import { firestore } from "./firebase"
import { getPollID } from "./polls"

const getEvents = async () => {
    const snapshot = await firestore.collection("events").get()
    let events = []
    snapshot.docs.forEach(doc => events.push(doc.data()))
    events.forEach(event => console.log(event))
    return events
}

export const getEventPollID = async (username, poll_title) => {
    const snapshot = await firestore.collection("events").where("owner", "==", `${username}`).where("poll", "==", `${poll_title}`).get()
    let events = []
    snapshot.docs.forEach(doc => events.push(doc.data()))
    return events
}

const setEvent = async (datetime, lenght, participant_name, username, title) => {
    const userDb = firestore.collection('events').doc()
    await userDb.set({
        datetime: datetime,
        length: lenght,
        participant_name: participant_name,
        owner: username,
        poll: title
    });
}

export {getEvents, setEvent}