let dropIndex;
let width = 10;
let height = 5;
var letters = '0123456789ABCDEF';
var color = '#';

function init(event)
{
    let platform = document.getElementById('dropPlace');
	array = new Array(height);

    console.log("Welcome on drag & drop web page");

	for (var i = 0; i < height; i++) {
        array[i] = new Array(width);
        let newTr = document.createElement("tr");
        platform.appendChild(newTr);
        for (var j = 0; j < width; j++) {
            array[i][j] = false;
            let newTd = document.createElement("td");
            newTd.id = i + "_" + j;
            newTd.className = "cell";
            // newTd.textContent="CELL"+i+"-"+j;
            newTr.appendChild(newTd);
        }
    }
}

document.addEventListener("dragover", (event) => {
    event.preventDefault();
});

document.addEventListener("drop", ({target}) => {
    if(target.className == "cell") {
        let parsedId = boxID(target.id);

        console.log("ParseID: " + parsedId);
        let yCoordinate = parsedId[0];
        while (yCoordinate + 1 < height) {
            yCoordinate++;
            if (array[yCoordinate][parsedId[1]] == true) {
                let cell = document.getElementById((yCoordinate - 1) + "_" + parsedId[1]);
                cell.style.background = color;
                array[yCoordinate - 1][parsedId[1]] = true;
                return;
            }
        }
        let cell = document.getElementById(height - 1 + "_" + parsedId[1]);
        cell.style.background = color;
        array[height - 1][parsedId[1]] = true;
        } 
  });



function setRandomColorOfBox() {
	color = getRandomColor();
    console.log("Created color: " + color)
	document.getElementById('box').style.background = color;
}

function getRandomColor() {
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function boxID(id) {
	let parsedId = id.split("_");
	parsedId[0] = parseInt(parsedId[0]);
	parsedId[1] = parseInt(parsedId[1]);
	return parsedId;
  }