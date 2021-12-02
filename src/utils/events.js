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
    let eventIDs = []
    snapshot.docs.forEach(doc => events.push(doc.data()))
    snapshot.docs.forEach(doc => eventIDs.push(doc.id))
    return [events, eventIDs]
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
    console.log(userDb.id)
}

export const setEventEvents = async (events, username, title, num_users) => {
    for (var i = 0; i < num_users; i++) {
        events.forEach(event => setEvent(event.start, event.end, "", username, title))
    }
}

export const verifyUserEventCount = async (username, poll_title, participant, numOptions) => {
    console.log(username)
    console.log(numOptions)
    var events = await getEventPollID(username, poll_title)
    console.log(events[0])
    var count = 1
    events[0].forEach(event => {
        if (event.participant_name == participant) {
            count++
        }
    })
    console.log(count)
    if (count > numOptions) {
        return false
    } else {
        return true
    }
}

export const updateEvent = async (ID, name) => {
    console.log(ID)
    const eventDb = firestore.collection('events').doc(ID)
    console.log(eventDb)
    await eventDb.update({participant_name: name})
}

export {getEvents, setEvent}