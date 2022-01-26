//drag and drop
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("image", ev.target.id);
}

function drop(ev, el) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("image");
  el.innerHTML = el.innerHTML == "Layout cell"? "": el.innerHTML;

  //console.log(data.search("cell"));

  if (data.search("cell") == 0) {
	  var temp=el.innerHTML;
	  el.innerHTML= document.getElementById(data).innerHTML;
	  document.getElementById(data).innerHTML = temp;
  }
  else
	el.appendChild(document.getElementById(data));
}


//add cell
var cell_id = 5;

function addcell() {
  document.getElementById("layoutA").innerHTML += '<div id="cell'+cell_id+'" class="cell_style grid-container" ondrop="drop(event, this)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)">Layout cell</div>';
  cell_id++;
}

//save layout to file
function savelayout() {
  var layoutname = prompt("Enter layout name:", "New Layout");
  if (layoutname == null || layoutname == "") {
    window.alert("User cancelled the prompt.");
	return;
  }

  //write data to local storage
  var data = document.getElementById("bodycontainer").innerHTML;
  localStorage.setItem(layoutname, data);

  window.alert("Save layout '" + layoutname + "' successful.");
  getsavelist();
}

//update load button list
function getsavelist() {
  var list = document.getElementById("loadlist");
  list.innerHTML = '';
  for (var key in localStorage) list.innerHTML += '<li><a class="dropdown-item" href="#" onclick="loaddata(this)">' + key + '</a></li>';
}

//load data
function loaddata(el) {
	document.getElementById("bodycontainer").innerHTML = localStorage.getItem(el.innerHTML);
}
