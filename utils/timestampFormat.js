const createDateSuffix = (date) => {
  let date = date.toString();
  let endChar = date.charAt(date.length - 1);

  if (endChar === "1" && date !== "11") {
    date = `${date}st`;
  } else if (endChar === "2" && date !== "12") {
    date = `${date}nd`;
  } else if (endChar === "3" && date !== "13") {
    date = `${date}rd`;
  } else {
    date = `${date}th`;
  }
  return date;
};

module.exports = (
  timestamp,
  { lengthOfMonth = "short", dateSuffix = true } = {}
) => {
  const months = {
    0: lengthOfMonth === "short" ? "Jan" : "January",
    1: lengthOfMonth === "short" ? "Feb" : "February",
    2: lengthOfMonth === "short" ? "Mar" : "March",
    3: lengthOfMonth === "short" ? "Apr" : "April",
    4: lengthOfMonth === "short" ? "May" : "May",
    5: lengthOfMonth === "short" ? "Jun" : "June",
    6: lengthOfMonth === "short" ? "Jul" : "July",
    7: lengthOfMonth === "short" ? "Aug" : "August",
    8: lengthOfMonth === "short" ? "Sep" : "September",
    9: lengthOfMonth === "short" ? "Oct" : "October",
    10: lengthOfMonth === "short" ? "Nov" : "November",
    11: lengthOfMonth === "short" ? "Dec" : "December",
  };
  const dateObject = new Date(timestamp);
  const Month = months[dateObject.getMonth()];

  const dayOfMonth = dateSuffix
    ? createDateSuffix(dateObject.getDate())
    : dateObject.getDate();

  const Year = dateObject.getFullYear();
  let hour =
    dateObject.getHours() > 12
      ? Math.floor(dateObject.getHours() - 12)
      : dateObject.getHours();
  if (hour === 0) {
    hour = 12;
  }
  const minutes =
    (dateObject.getMinutes() < 10 ? `0` : "") + dateObject.getMinutes();
  const dayOrNight = dateObject.getHours() >= 12 ? "PM" : "AM";
  const formattedTimestamp = `${Month} ${dayOfMonth}, ${Year} at ${hour}:${minutes} ${dayOrNight}`;
  return formattedTimestamp;
};
