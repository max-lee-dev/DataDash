export default function ConvertMinutesToTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  let formattedHours = hours.toString().padStart(2, "0");
  let formattedMins = mins.toString().padStart(2, "0");

  let period = "AM";

  if (hours >= 12) {
    formattedHours = (hours % 12).toString().padStart(2, "0");
    period = "PM";
  }

  if (formattedHours === "00") {
    formattedHours = "12";
  }

  return `${formattedHours}:${formattedMins} ${period}`;
}
