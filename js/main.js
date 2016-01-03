var projectDirectory = "../img/projects/";

function loadCSS() {
  var a = document.createElement('link');
  var n = document.getElementsByTagName('link')[0];
  a.rel  = 'stylesheet';
  a.type = 'text/css';
  a.href = 'css/main.css';
  a.media = 'all';
  n.parentNode.insertBefore(a, n);
}

function siteLoaded() {
  var body = document.getElementsByTagName('body')[0];
  body.className = "loaded";
}

function loadJSON(file, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function createProjectList() {
  var ul = document.createElement("ul");
  ul.setAttribute("id", "projectList");
  var content = document.getElementById("content");
  content.appendChild(ul);
}

function createProjectItem(id, name, link) {
  var ul = document.getElementById("projectList");
  var li = document.createElement("li");
  var a = document.createElement('a');
  var div = document.createElement('div');
  var img = document.createElement('img');
  var span = document.createElement('span');
  a.className = "project-link";
  a.setAttribute("href", link);
  img.src = projectDirectory+id+".png";
  img.className = "project-image";
  div.className = "project-image-wrap";
  span.innerHTML = name;
  span.className = "project-title";
  div.appendChild(img);
  a.appendChild(div);
  a.appendChild(span);
  li.appendChild(a);
  li.setAttribute("id", "project"+id);
  ul.appendChild(li);
}
function createProfilePicture() {
  var header = document.getElementsByTagName('header')[0];
  var div = document.createElement('div');
  var img = document.createElement('img');
  img.src = "../img/profile.jpg";
  img.className = "profile-image";
  div.className = "profile-image-container";
  div.appendChild(img);
  header.appendChild(div);
}

loadCSS();
createProjectList();
setTimeout(function(){
  loadJSON("../data.json", function(response) {
    // Parse JSON string into object
    var json = JSON.parse(response);
    json = json[0]['projects'];
    for(var i of json) {
      createProjectItem(i['id'], i['name'], i['link']);
    }
   });
  createProfilePicture();
  siteLoaded();
}, 2000);
