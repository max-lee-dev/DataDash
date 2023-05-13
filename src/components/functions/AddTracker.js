import { db } from "../../components/firebase.js";
import { setDoc, doc } from "firebase/firestore";

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
  function add() {
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
      setDoc(doc(db, "trackers", trackerName + userUID), {
        trackerName: trackerName,
        trackerDescription: trackerDescription,
        isNumber: isNumber,
        isBoolean: isBoolean,
        isTime: isTime,
        isNotes: isNotes,
        userUID: userUID,
        entries: [],
      }).then(() => {
        window.location.reload();
      });
    } catch (e) {
      alert("Tracker name already exists");
      return;
    }
    console.log("added tracker");
  }
}
