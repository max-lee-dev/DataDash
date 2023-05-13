import { db } from "../../components/firebase.js";
import { addDoc, collection, doc } from "firebase/firestore";

export default function AddEntry(
  trackerUID,
  numberValue,
  booleanValue,
  timeValue,
  notesValue
) {
  add();
  function add() {
    if (
      numberValue === null &&
      booleanValue === null &&
      timeValue === null &&
      notesValue === null
    ) {
      alert("Please fill in the values");
      return;
    }
    try {
      const dataEntry = addDoc(collection(db, "dataEntries"), {
        numberValue: numberValue,
        booleanValue: booleanValue,
        timeValue: timeValue,
        notesValue: notesValue,
        parentTracker: trackerUID,
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
