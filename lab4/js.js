window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if(!window.indexedDB) {
    window.alert("Your browser doesnt support an IndexedDB");
}

const clientData = [
    {
        name: "Mateusz",
        lastName: "Rybczyński",
        age: "24",
        email: "216129@edu.p.lodz.pl",
        pesel: '12345678901',
        addres: "Stefanowskiego 22",
        phoneNumber: "500500200"
    },
    {
        name: "Andrzej",
        lastName: "Kowalski",
        age: "34",
        email: "marcin@marcin.com",
        pesel: '12345678902',
        address: "Zachodnia 2",
        phoneNumber: "500400200"
    },
  ];

let db;
let request = window.indexedDB.open("newDatabase", 1);

request.onerror = function (event) {
    console.log("Error. Database failed.");
};

request.onsuccess = function (event) {
    db = request.result;
    console.log("Success: The database is opened successfully");
    drawTable();
};

request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("client", {
        autoIncrement: true,
    });

    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("lastName", "lastName", { unique: false });
    objectStore.createIndex("age", "age", { unique: false });
    objectStore.createIndex("email", "email", { unique: true });
    objectStore.createIndex("pesel", "pesel", { unique: true });
    objectStore.createIndex("address", "address", { unique: false });
    objectStore.createIndex("phoneNumber", "phoneNumber", { unique: true });

    for (var i in clientData) {
        objectStore.add(clientData[i]);
    }
};

function add(event) {
    event.preventDefault();

    var formElements = document.getElementById("addForm")
;}