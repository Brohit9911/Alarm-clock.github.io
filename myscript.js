

const currentTime = document.querySelector("#current-time");
const setHours = document.querySelector("#hours");
const setMinutes = document.querySelector("#minutes");
const setSeconds = document.querySelector("#seconds");
const setAmPm = document.querySelector("#am-pm");
const setAlarmButton = document.querySelector("#submitButton");
const alarmContainer = document.querySelector("#alarms-container");

var storedAlarms=[];

window.addEventListener("DOMContentLoaded", (event) => {
  
    dropDownMenu(1, 12, setHours);
   
    dropDownMenu(0, 59, setMinutes);
  
    dropDownMenu(0, 59, setSeconds);
  
    setInterval(getCurrentTime, 1000);
    storedAlarms= checkAlarams();
    fetchAlarm();
  });

  setAlarmButton.addEventListener("click", getInput);



  function dropDownMenu(start, end, element) {
    for (let i = start; i <= end; i++) {
      const dropDown = document.createElement("option");
      dropDown.value = i < 10 ? "0" + i : i;
      dropDown.innerHTML = i < 10 ? "0" + i : i;
      element.appendChild(dropDown);
    }
  }
  function getCurrentTime() {
    let time = new Date();
    time = time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    currentTime.innerHTML = time;
  
    return time;
  }

  function fetchAlarm() {
    
    storedAlarms.forEach((time) => {
      setAlarm(time, true);
    });
  }

  function checkAlarams() {
    let alarms = [];
    const storedAlarms = localStorage.getItem("alarms");
    if (storedAlarms) alarms = JSON.parse(storedAlarms);
  
    return alarms;
  }

  function setAlarm(time, fetching = false) {
    const alarm = setInterval(() => {
      if (time === getCurrentTime()) {
        alert("Alarm Ringing");
      }
    }, 500);
  
    addAlaramToDom(time, alarm);
    if (!fetching) {
      saveAlarm(time);
    }
  }

  function addAlaramToDom(time, intervalId) {
    const alarm = document.createElement("div");
    alarm.classList.add("alarm", "mb", "display-flex");
    alarm.innerHTML = `
                <div class="time">${time}</div>
                <button class="btn delete-alarm" data-id=${intervalId}>Delete</button>
                `;
    const deleteButton = alarm.querySelector(".delete-alarm");
    deleteButton.addEventListener("click", (e) => deleteAlarm(e, time, intervalId));
  
    alarmContainer.prepend(alarm);
  }

  function saveAlarm(time) {
    const alarms = storedAlarms;
  
    alarms.push(time);
    localStorage.setItem("alarms", JSON.stringify(alarms));
  }

  function getInput(e) {
    e.preventDefault();
    const hourValue = setHours.value;
    const minuteValue = setMinutes.value;
    const secondValue = setSeconds.value;
    const amPmValue = setAmPm.value;
  
    const alarmTime = convertToTime(
      hourValue,
      minuteValue,
      secondValue,
      amPmValue
    );
    setAlarm(alarmTime);
  }

  function convertToTime(hour, minute, second, amPm) {
    return `${parseInt(hour)}:${minute}:${second} ${amPm}`;
  }

  

function deleteAlarm(event, time, intervalId) {
    clearInterval(intervalId);
    deleteAlarmFromLocal(time);
    event.target.parentElement.remove();
  }
  
  function deleteAlarmFromLocal(time) {
    const alarms = checkAlarams();
  
    const index = alarms.indexOf(time);
    alarms.splice(index, 1);
    localStorage.setItem("alarms", JSON.stringify(alarms));
  }
  
  