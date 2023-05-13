import { db } from "../../components/firebase.js";
import { setDoc, doc, addDoc, collection } from "firebase/firestore";

export default function AddTracker(
  userUID,
  trackerName,
  isNumber,
  isBoolean,
  isTime,
  isNotes,
  trackerDescription
) {
  add();
  async function add() {
    console.log(trackerName);
    if (trackerName === "") {
      alert("Please enter a tracker name");
      return;
    } else if (
      isNumber === false &&
      isBoolean === false &&
      isTime === false &&
      isNotes === false
    ) {
      alert("Please select a type of tracker");
      return;
    }
    try {
      const newTracker = await addDoc(collection(db, "trackers"), {
        trackerName: trackerName,
        trackerDescription: trackerDescription,
        isNumber: isNumber,
        isBoolean: isBoolean,
        isTime: isTime,
        isNotes: isNotes,
        userUID: userUID,
      }).then(() => {
        window.location.reload();
      });
    } catch (e) {
      alert(e.message);
      return;
    }
    console.log("added tracker");
  }
}
