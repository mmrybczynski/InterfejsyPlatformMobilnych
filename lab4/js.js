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

//add client to database
function add(event) {
    event.preventDefault();

    var formElements = document.getElementById("addForm");

    var request = db
        .transaction(["client"],"readwrite")
        .objectStore("client")
        .add({
            name: formElements[0].value,
            lastName: formElements[1].value,
            age: formElements[2].value,
            email: formElements[3].value,
            pesel: formElements[4].value,
            address: formElements[5].value,
            phoneNumber: formElements[6].value,
        });

        request.onsuccess = function(event) {
            console.log("Client added correctly");
            drawTable();
        };

        request.onerror = function(event) {
            alert(
                "Unable to add data."
            );
        };
}

//search field
function search(event) {
    event.preventDefault();
    let searchInputs = document.getElementById("searchBar").value.split(' ');
    drawTable(searchInputs);
}

//I will add remove option
function remove(id) {
    let request = db
        .transaction(["client"],"readwrite")
        .objectStore("client")
        .delete(id);
    request.onsuccess = function(ecent){
        console.log(`Client ${id} removed`);
        drawTable();
    };
}

//Generate Table
function generateTableHead(table,data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    let th = document.createElement("th");
    let text = document.createNode(key);
    th.appendChild(text);
    row.appendChild(th);

    for(let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}
//draw table
function drawTable(filterItems) {
    if(document.getElementById("tbody") !== null) {
        document.querySelector("#tbody").remove();
    }

    let table = document.createElement("table");
    table.setAttribute("id", "tbody");
    let data = Object.keys(clientData[0]);

    generateTable(table, filterItems);
    generateTableHead(table, data);
    document.getElementById("tableDiv").appendChild(table);
}