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

// Modify savePost function to store data in IndexedDB
export function savePost(type) {
    let postData;
    if (type === 'passenger') {
        postData = {
            type: 'passenger',
            from: document.getElementById('from').value,
            destination: document.getElementById('destination').value,
            time: document.getElementById('Time').value,
            date: document.getElementById('date').value,
            people: document.getElementById('people').value,
            extraInfo: document.getElementById('extraInfo').value
        };
    } else if (type === 'driver') {
        postData = {
            type: 'driver',
            from: document.getElementById('fromDriver').value,
            destination: document.getElementById('destinationDriver').value,
            time: document.getElementById('TimeDriver').value,
            date: document.getElementById('dateDriver').value,
            availableSeats: document.getElementById('availableSeats').value,
            extraInfo: document.getElementById('extraInfoDriver').value
        };
    }

    storePostInDB(postData);
    clearFormFields(type);
}


function clearFormFields(type) {
    if (type === 'passenger') {
        document.getElementById('from').value = '';
        document.getElementById('destination').value = '';
        document.getElementById('Time').value = '';
        document.getElementById('date').value = '';
        document.getElementById('people').value = '';
        document.getElementById('extraInfo').value = '';
    } else if (type === 'driver') {
        document.getElementById('fromDriver').value = '';
        document.getElementById('destinationDriver').value = '';
        document.getElementById('TimeDriver').value = '';
        document.getElementById('dateDriver').value = '';
        document.getElementById('availableSeats').value = '';
        document.getElementById('extraInfoDriver').value = '';
    }
}

// IndexedDB setup
export function openDatabase() {
    return new Promise((resolve, reject) => {
        console.log("trying to open database...");
        const request = indexedDB.open('PostDatabase', 1);
        
        request.onupgradeneeded = (event) => {
            console.log("database upgrading...");
            const db = event.target.result;
            if (!db.objectStoreNames.contains('posts')) {
                db.createObjectStore('posts', { keyPath: 'id', autoIncrement: true });
                console.log("create 'posts' data stored successfully");
            }
        };
        
        request.onsuccess = (event) => {
            console.log("open database successfully");
            resolve(event.target.result);
        };
        
        request.onerror = (event) => {
            console.error('fail to open IndexedDB: ' + event.target.errorCode);
            reject('Error opening IndexedDB: ' + event.target.errorCode);
        };
    });
}

function storePostInDB(postData) {
    console.log("ready to store data to IndexedDB...", postData);
    openDatabase().then((db) => {
        const transaction = db.transaction('posts', 'readwrite');
        const store = transaction.objectStore('posts');
        store.add(postData);
        transaction.oncomplete = () => {
            console.log('Post saved to IndexedDB successfully!');
        };
        transaction.onerror = (event) => {
            console.error('Error saving post to IndexedDB:', event.target.error);
        };
    }).catch((error) => {
        console.error('fail to open database to store post 出错:', error);
    });
}

// document.querySelector('#post-passenger').addEventListener('click', savePost('passenger'));
window.savePost = savePost;