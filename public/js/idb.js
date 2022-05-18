let db;
const request = indexedDB.open('tracker_forMy_budget', 1);

request.onupgradeneeded = function (event) {
    const db = event.target.result;
    db.createObjectStore('big_funds', {
        autoIncrement: true
    });
};

request.onsuccess = function (event) {
    db = event.target.result;
    // checks if app is online
    if (navigator.onLine) {
        uploadBudget();
    }
};

request.onerror = function (event) {
    console.log(event.target.errorCode);
};

function saveRecord(record) {
    const transaction = db.transaction(['big_funds'], 'readwrite');

    const budgetObjectStore = transaction.objectStore('big_funds');

    //adds record
    budgetObjectStore.add(record);
}

function uploadBudget() {
    //opens transaction
    const transaction = db.transaction(['big_funds'], 'readwrite');

    const budgetObjectStore = transaction.objectStore('big_funds');

    //gets all records and gives them a variable
    const getAll = budgetObjectStore.getAll();

    getAll.onsuccess = function () {

        if (getAll.result.length > 0) {
            fetch('/api/transaction/bulk', {
                    method: 'POST',
                    body: JSON.stringify(getAll.result),
                    headers: {
                        Accept: 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(serverResponse => {
                    if (serverResponse.message) {
                        throw new Error(serverResponse);
                    }
                    const transaction = db.transaction(['big_funds'], 'readwrite');
                    const budgetObjectStore = transaction.objectStore('big_funds');
                    // clears items
                    budgetObjectStore.clear();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };
}

window.addEventListener('online', uploadBudget);