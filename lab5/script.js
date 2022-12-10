
        //prefixes of implementation that we want to test
        window.indexedDB =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB;

        //prefixes of window.IDB objects
        window.IDBTransaction =
        window.IDBTransaction ||
        window.webkitIDBTransaction ||
        window.msIDBTransaction;
        window.IDBKeyRange =
        window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

        if (!window.indexedDB) {
        window.alert(
            "Your browser doesn't support a stable version of IndexedDB."
        );
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

    const NAMES = ["Olek","Sebastian","Mateusz","Krystian"];
    const SURNAMES = ["Kowalski","Sodol","Nowak","Stefanowski"];
    const ADDRESSES = ["Politechnikki","Zgierska","Graniczna"];

        let db;
        let request = window.indexedDB.open("newDatabase", 1);

        request.onerror = function (event) {
        console.log("Error: The database failed");
        };

        request.onsuccess = function (event) {
        db = request.result;
        console.log("success: The database is opened successfully");
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

        var formElements = document.getElementById("addForm");

        var request = db
            .transaction(["client"], "readwrite")
            .objectStore("client")
            .add({
            name: formElements[1].value,
            lastName: formElements[2].value,
            age: formElements[3].value,
            email: formElements[4].value,
            pesel: formElements[5].value,
            address: formElements[6].value,
            phoneNumber: formElements[7].value,
            });

        request.onsuccess = function (event) {
            console.log("Client added");
            document.getElementById("idInput").value = "";
            document.getElementById("nameInput").value = "";
            document.getElementById("lastNameInput").value = "";
            document.getElementById("ageInput").value = "";
            document.getElementById("emailInput").value = "";
            document.getElementById("peselInput").value = "";
            document.getElementById("addressInput").value = "";
            document.getElementById("phoneNumberInput").value = "";
            drawTable();
        };

        request.onerror = function (event) {
            alert(
            "Unable to add data. The email address is already in the database."
            );
        };
        }

        function search(event) {
        event.preventDefault();

        let searchInputs = document.getElementById("searchBar").value.split(' ');
        
        drawTable(searchInputs);
        }

        document
        .getElementById("searchBar")
        .addEventListener("input", (event) => {
        drawTable(event.target.value.split(" "));
        });

        function editData(event) {
        event.preventDefault();
        let formElements = document.getElementById("addForm");

        console.log(`Editing ${parseInt(formElements[0].value)}`);

        var objectStore = db
            .transaction(["client"], "readwrite")
            .objectStore("client");

        var request = objectStore.get(parseInt(formElements[0].value));
        request.onerror = function (event) {
        // Handle errors!
            console.log(
                "Something went wrong, prob client with that id does not exits"
            );
        };
        request.onsuccess = function (event) {
        // Get the old value that we want to update
            let data = event.target.result;

        let client = {
            name: formElements[1].value,
            lastName: formElements[2].value,
            age: formElements[3].value,
            email: formElements[4].value,
            pesel: formElements[5].value,
            address: formElements[6].value,
            phoneNumber: formElements[7].value,
        };

        console.log(client);

        // Get the old value that we want to update
        let requestUpdate = db
            .transaction(["client"], "readwrite")
            .objectStore("client")
            .put(client, parseInt(formElements[0].value));

            requestUpdate.onsuccess = function (event) {
                console.log("Record updated");
                drawTable();
            };
        };
    }

    function cancelEdit(event) {
        event.preventDefault();
        document.getElementById("editBtn").disabled = true;
        document.getElementById("cancelBtn").disabled = true;
        document.getElementById("submitBtn").disabled = false;
        document.getElementById("idInput").value = "";
        document.getElementById("nameInput").value = "";
        document.getElementById("lastNameInput").value = "";
        document.getElementById("ageInput").value = "";
        document.getElementById("emailInput").value = "";
        document.getElementById("peselInput").value = "";
        document.getElementById("addressInput").value = "";
        document.getElementById("phoneNumberInput").value = "";
    }

    function fillEditData(id) {
            document.getElementById("submitBtn").disabled = true;
            document.getElementById("editBtn").disabled = false;
            document.getElementById("cancelBtn").disabled = false;

        var objectStore = db
            .transaction(["client"], "readwrite")
            .objectStore("client");

        var request = objectStore.get(id);
        request.onerror = function (event) {
        // Handle errors!
            console.log("Something went wrong");
        };
        request.onsuccess = function (event) {
        // Get the old value that we want to update
            let data = event.target.result;

            document.getElementById("idInput").value = id;
            document.getElementById("nameInput").value = data.name;
            document.getElementById("lastNameInput").value = data.lastName;
            document.getElementById("ageInput").value = data.age;
            document.getElementById("emailInput").value = data.email;
            document.getElementById("peselInput").value = data.pesel;
            document.getElementById("addressInput").value = data.address;
            document.getElementById("phoneNumberInput").value = data.phoneNumber;
            };
    }

    function remove(id) {
        let request = db
            .transaction(["client"], "readwrite")
            .objectStore("client")
            .delete(id);

            request.onsuccess = function (event) {
                console.log(`Client ${id} removed...`);
                drawTable();
            };
        }

    function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();

    // Create id column
    let th = document.createElement("th");
    let text = document.createTextNode("id");
    th.appendChild(text);
    row.appendChild(th);

        for (let key of data) {
            let th = document.createElement("th");
            let text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
        }
    }

    function generateTable(table, filterItems = []) {
    let objectStore = db.transaction("client").objectStore("client");

        objectStore.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;

            if (cursor) {
                if (filterItems.length > 0 && filterItems[0] !== "") {
                    let exists = false;
                    for (let i = 0; i < filterItems.length; i++) {
                        const element = filterItems[i].toLowerCase();
                        if (element === "") continue;
                        for (objValue of Object.values(cursor.value)) {
                        if (objValue.toLowerCase().includes(element)) {
                            exists = true;
                            break;
                        }
                        }
                    }

                    if (!exists) {
                        cursor.continue();
                        return;
                    }
                }

                let row = table.insertRow();
                let cell = row.insertCell();
                let text = document.createTextNode(cursor.key);
                cell.appendChild(text);
                for (const [key, value] of Object.entries(cursor.value)) {
                    let cell = row.insertCell();
                    let text = document.createTextNode(value);
                    cell.appendChild(text);
                }

                cell = row.insertCell();

                let removeButton = document.createElement("button");
                removeButton.setAttribute("id", "removeButton" + cursor.key);
                removeButton.setAttribute("onclick", `remove(${cursor.key})`);
                removeButton.setAttribute("class","removeBtnClass");
                removeButton.innerHTML = "remove";
                cell.appendChild(removeButton);

                let editButton = document.createElement("button");
                editButton.setAttribute("id", "editButton" + cursor.key);
                editButton.setAttribute("onclick", `fillEditData(${cursor.key})`);
                editButton.setAttribute("class","editBtnClass");
                editButton.innerHTML = "edit";
                cell.appendChild(editButton);

                cursor.continue();
            } else {
                console.log("No more data");
            }
        };
        }

        function drawTable(filterItems) {
            if (document.getElementById("tbody") !== null) {
                document.querySelector("#tbody").remove();
            }

            let table = document.createElement("table");
            table.setAttribute("id", "tbody");
            let data = Object.keys(clientData[0]);
            generateTable(table, filterItems);
            generateTableHead(table, data);
            document.getElementById("tableDiv").appendChild(table);
        }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    
    function insertRandomCell() {
        let minAge = Math.ceil(18);
        let maxAge = Math.floor(60);

        let mails = ["@gmail.com","@wp.pl","onet.pl","@icloud.com","@poczta.onet.pl","@imp.p.lodz.pl"];
        var numberOfMail = getRandomInt(5);

        let formElements = document.getElementById("addForm");

        formElements[1].value = NAMES[Math.floor(Math.random() * NAMES.length)];
        formElements[2].value =
        SURNAMES[Math.floor(Math.random() * SURNAMES.length)];
        formElements[3].value = `${Math.floor(
        Math.random() * (maxAge - minAge) + minAge
        )}`;
        formElements[4].value = `${NAMES[
        Math.floor(Math.random() * NAMES.length)
        ].toLowerCase()}${mails[numberOfMail]}`;
        formElements[5].value = `${Math.floor(
        10000000000 + Math.random() * 90000000000
        )}`;
        formElements[6].value =
        ADDRESSES[Math.floor(Math.random() * ADDRESSES.length)];
        formElements[7].value = `${Math.floor(
        100000000 + Math.random() * 700000000
        )}`;
    }