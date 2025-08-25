let canvas = document.getElementById("canvas");
let drawing = false;
let path;

canvas.onmousedown = function(e) {
    drawing = true;
    path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M" + e.offsetX + "," + e.offsetY);
    path.setAttribute("stroke", "black");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-width", "2");
    canvas.appendChild(path);
};

canvas.onmousemove = function(e) {
    if (drawing) {
        let d = path.getAttribute("d");
        path.setAttribute("d", d + " L" + e.offsetX + "," + e.offsetY);
    }
};

canvas.onmouseup = function() {
    drawing = false;
};

document.getElementById("clear").onclick = function() {
    canvas.innerHTML = "";
};
