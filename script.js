const checkInForm = document.getElementById("checkInForm");

const attendeeName = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

const greeting = document.getElementById("greeting");

const attendeeCount = document.getElementById("attendeeCount");

const waterCount = document.getElementById("waterCount");
const zeroCount = document.getElementById("zeroCount");
const powerCount = document.getElementById("powerCount");

const progressBar = document.getElementById("progressBar");

const attendeeList = document.getElementById("attendeeList");

const celebrationMessage = document.getElementById("celebrationMessage");

// Attendance goal
const attendanceGoal = 50;

// Load saved data
let totalAttendees = Number(localStorage.getItem("totalAttendees")) || 0;

let waterTeam = Number(localStorage.getItem("waterTeam")) || 0;

let zeroTeam = Number(localStorage.getItem("zeroTeam")) || 0;

let powerTeam = Number(localStorage.getItem("powerTeam")) || 0;

let attendees = JSON.parse(localStorage.getItem("attendees")) || [];

// Display saved information when page opens
updateDisplay();
updateProgressBar();
displayAttendees();
checkCelebration();

// Check-In Form
checkInForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = attendeeName.value.trim();
  const team = teamSelect.value;

  // Make sure a name was entered
  if (name === "") {
    return;
  }

  // Increase total attendance
  totalAttendees++;

  // Increase team attendance
  if (team === "water") {
    waterTeam++;
  } else if (team === "zero") {
    zeroTeam++;
  } else if (team === "power") {
    powerTeam++;
  }

  // Save attendee
  attendees.push({
    name: name,
    team: team,
  });

  // Display greeting
  greeting.textContent = `Welcome, ${name}! You have successfully checked in.`;

  greeting.style.display = "block";

  greeting.classList.add("success-message");

  // Update everything
  updateDisplay();

  updateProgressBar();

  displayAttendees();

  saveData();

  checkCelebration();

  // Clear form
  attendeeName.value = "";

  teamSelect.selectedIndex = 0;

  attendeeName.focus();
});

// Update numbers on page
function updateDisplay() {
  attendeeCount.textContent = totalAttendees;

  waterCount.textContent = waterTeam;

  zeroCount.textContent = zeroTeam;

  powerCount.textContent = powerTeam;
}

// Update Progress Bar
function updateProgressBar() {
  let progress = (totalAttendees / attendanceGoal) * 100;

  if (progress > 100) {
    progress = 100;
  }

  progressBar.style.width = progress + "%";
}

// Save data to localStorage
function saveData() {
  localStorage.setItem("totalAttendees", totalAttendees);

  localStorage.setItem("waterTeam", waterTeam);

  localStorage.setItem("zeroTeam", zeroTeam);

  localStorage.setItem("powerTeam", powerTeam);

  localStorage.setItem("attendees", JSON.stringify(attendees));
}

// Display Attendee List
function displayAttendees() {
  attendeeList.innerHTML = "";

  attendees.forEach(function (attendee) {
    const listItem = document.createElement("li");

    const nameSpan = document.createElement("span");

    const teamSpan = document.createElement("span");

    nameSpan.textContent = attendee.name;

    nameSpan.classList.add("attendee-name");

    let teamName = "";

    if (attendee.team === "water") {
      teamName = "🌊 Team Water Wise";
    } else if (attendee.team === "zero") {
      teamName = "🌿 Team Net Zero";
    } else if (attendee.team === "power") {
      teamName = "⚡ Team Renewables";
    }

    teamSpan.textContent = teamName;

    teamSpan.classList.add("attendee-team");

    listItem.appendChild(nameSpan);

    listItem.appendChild(teamSpan);

    attendeeList.appendChild(listItem);
  });
}

// Celebration Feature
function checkCelebration() {
  if (totalAttendees >= attendanceGoal) {
    let winningTeam = "";

    const highestCount = Math.max(waterTeam, zeroTeam, powerTeam);

    if (
      waterTeam === highestCount &&
      zeroTeam === highestCount &&
      powerTeam === highestCount
    ) {
      winningTeam = "all three teams";
    } else if (waterTeam === highestCount && zeroTeam === highestCount) {
      winningTeam = "Team Water Wise and Team Net Zero";
    } else if (waterTeam === highestCount && powerTeam === highestCount) {
      winningTeam = "Team Water Wise and Team Renewables";
    } else if (zeroTeam === highestCount && powerTeam === highestCount) {
      winningTeam = "Team Net Zero and Team Renewables";
    } else if (waterTeam === highestCount) {
      winningTeam = "Team Water Wise";
    } else if (zeroTeam === highestCount) {
      winningTeam = "Team Net Zero";
    } else {
      winningTeam = "Team Renewables";
    }

    celebrationMessage.textContent = `🎉 Attendance goal reached! Congratulations to ${winningTeam}!`;

    celebrationMessage.style.display = "block";
  } else {
    celebrationMessage.style.display = "none";
  }
}
