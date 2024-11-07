// Get the modal, open button, and close button elements
const modal = document.getElementById("modal");
const filterButton = document.getElementById("filter-button");
const closeButton = document.getElementById("close-button");

// Show the modal when the filter button is clicked
filterButton.onclick = function() {
    modal.classList.add("show");
}

// Hide the modal when the close button is clicked
closeButton.onclick = function() {
    modal.classList.remove("show");
}

// Optionally, close the modal when clicking outside of the modal content
window.onclick = function(event) {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
}

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    const passengerButton = document.getElementById('passenger');
    const driverButton = document.getElementById('driver');

    // Add event listeners for each button
    passengerButton.addEventListener("click", function() {
        selectType('passenger');
    });
    driverButton.addEventListener("click", function() {
        selectType('driver');
    });
});

// Type selection function
function selectType(type) {
    const passengerButton = document.getElementById('passenger');
    const driverButton = document.getElementById('driver');
    
    if (type === 'passenger') {
        passengerButton.classList.add('selected');
        driverButton.classList.remove('selected');
    } else {
        driverButton.classList.add('selected');
        passengerButton.classList.remove('selected');
    }
}

// Adjust time by 15 minutes
function adjustTime(type, increment) {
    const inputField = document.getElementById(type + '-time');
    let time = inputField.value;

    // Parse the time and increment it
    let [hoursMinutes, period] = time.split(" ");
    let [hours, minutes] = hoursMinutes.split(":").map(Number);

    // Adjust minutes by the increment (±15 minutes)
    minutes += increment * 15;

    // Adjust hours and minutes if necessary
    if (minutes >= 60) {
        minutes -= 60;
        hours += 1;
    } else if (minutes < 0) {
        minutes += 60;
        hours -= 1;
    }

    // Handle AM/PM transition and hour wrap-around
    if (hours === 12) {
        period = period === "AM" ? "PM" : "AM";
    } else if (hours === 0) {
        hours = 12;
        period = period === "AM" ? "PM" : "AM";
    } else if (hours > 12) {
        hours -= 12;
    }

    // Format the adjusted time back to 12-hour format
    const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
    inputField.value = formattedTime;
}

function updateRangeValue() {
    const range = document.getElementById('seats-range');
    const value = range.value;

    // Remove 'highlighted' class from all labels
    const labels = document.querySelectorAll('.range-labels span');
    labels.forEach((label) => {
        label.classList.remove('highlighted');
    });

    // Add 'highlighted' class to the current value label
    document.getElementById(`label-${value}`).classList.add('highlighted');
}

