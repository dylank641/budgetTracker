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
