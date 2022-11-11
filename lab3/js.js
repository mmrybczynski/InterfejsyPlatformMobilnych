var letters = '0123456789ABCDEF';
var color = '#';

function setRandomColorOfBox() {
	color = randomColor();
    console.log(color)
	document.getElementById('box').style.background = color;
  }
function randomColor() {
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
