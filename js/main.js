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

var XMLHttpFactories = [
    function () {return new XMLHttpRequest()},
    function () {return new ActiveXObject("Msxml2.XMLHTTP")},
    function () {return new ActiveXObject("Msxml3.XMLHTTP")},
    function () {return new ActiveXObject("Microsoft.XMLHTTP")}
];

function createXMLHTTPObject() {
    var xmlhttp = false;
    for (var i=0;i<XMLHttpFactories.length;i++) {
        try {
            xmlhttp = XMLHttpFactories[i]();
        }
        catch (e) {
            continue;
        }
        break;
    }
    return xmlhttp;
}

function sendRequest(url,callback) {
    var req = createXMLHTTPObject();
    if (!req) return;
    var method = "GET";
    req.open(method,url,true);
    req.onreadystatechange = function () {
        if (req.readyState != 4) return;
        if (req.status != 200 && req.status != 304) {
            return;
        }
        callback(req.responseText);
    }
    req.send(null);
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
sendRequest("../data.json", function(response) {
  // Parse JSON string into object
  var json = JSON.parse(response);
  json = json[0]['projects'];
  for(var i of json) {
    createProjectItem(i['id'], i['name'], i['link']);
  }
 });
setTimeout(function(){
  createProfilePicture();
  siteLoaded();
}, 2000);
