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