function switchTab(tab) {

    // Get the Tabs and Posts
    const passengerTab = document.getElementById('passenger-tab');
    const driverTab = document.getElementById('driver-tab');
    const passengerForm = document.getElementById('passenger-post');
    const driverForm = document.getElementById('driver-post');

    // Switch the ACTIVE tab
    if (tab === 'passenger') {
        passengerTab.classList.add('active');
        driverTab.classList.remove('active');
        passengerForm.style.display = 'block';
        driverForm.style.display = 'none';
    } else if (tab === 'driver') {
        driverTab.classList.add('active');
        passengerTab.classList.remove('active');
        driverForm.style.display = 'block';
        passengerForm.style.display = 'none';
    }
}

function savePost(type) {
    let postData;
    //grab data from post and save it to an object to be saved (postData)
    if (type === 'passenger') {
        postData = {
            from: document.getElementById('from').value,
            destination: document.getElementById('destination').value,
            time: document.getElementById('time').value,
            people: document.getElementById('people').value,
            extraInfo: document.getElementById('extraInfo').value
        };
    } else if (type === 'driver') {
        postData = {
            from: document.getElementById('fromDriver').value,
            destination: document.getElementById('destinationDriver').value,
            time: document.getElementById('timeDriver').value,
            availableSeats: document.getElementById('availableSeats').value,
            extraInfo: document.getElementById('extraInfo').value
        };
    }

    clearFormFields(type);
}

function clearFormFields(type) {
    if (type === 'passenger') {
        document.getElementById('from').value = '';
        document.getElementById('destination').value = '';
        document.getElementById('time').value = '';
        document.getElementById('people').value = '';
        document.getElementById('extraInfo').value = '';
    } else if (type === 'driver') {
        document.getElementById('fromDriver').value = '';
        document.getElementById('destinationDriver').value = '';
        document.getElementById('timeDriver').value = '';
        document.getElementById('availableSeats').value = '';
        document.getElementById('extraInfo').value = '';
    }
}
