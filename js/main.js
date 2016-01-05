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

function createProjectItem(id, name, link, tags) {
  var ul = document.getElementById("projectList");
  var li = document.createElement("li");
  var a = document.createElement('a');
  var div = document.createElement('div');
  var containingDiv = document.createElement('div');
  var aboutDiv = document.createElement('div');
  var img = document.createElement('img');
  var h2 = document.createElement('h2');
  a.className = "project-link";
  a.setAttribute("href", link);
  img.src = projectDirectory+id+".png";
  img.className = "project-image";
  div.className = "project-image-wrap";
  h2.innerHTML = name;
  h2.className = "project-title";
  aboutDiv.className = "project-about";
  div.appendChild(img);
  a.appendChild(div);
  containingDiv.appendChild(h2);
  containingDiv.appendChild(createTagList(tags));
  a.appendChild(containingDiv);
  li.appendChild(a);
  li.appendChild(aboutDiv);
  li.setAttribute("id", "project"+id);
  ul.appendChild(li);
}

function createTagList(tags) {
  var tagArray = tags.split(",");
  var div = document.createElement("div");
  div.className = "tag-list";
  for(var i of tagArray) {
    var span = document.createElement("span");
    span.className = "tag";
    span.innerHTML = i+" ";
    div.appendChild(span);
  }
  return div;
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

function createNav() {
  var header = document.getElementsByTagName('header')[0];
  var nav = document.createElement('nav');
  nav.setAttribute("id", "nav");

  var a = document.createElement('a');
  a.setAttribute("id", "menuControl");

  var topSpan = document.createElement('span');
  var midSpan = document.createElement('span');
  var bottomSpan = document.createElement('span');
  topSpan.className = "menu-part menu-part--top";
  midSpan.className = "menu-part menu-part--mid";
  bottomSpan.className = "menu-part menu-part--bottom";
  a.appendChild(topSpan);
  a.appendChild(midSpan);
  a.appendChild(bottomSpan);
  nav.appendChild(a);
  header.appendChild(nav);
}



loadCSS();
createProjectList();
sendRequest("../data.json?"+Math.random().toString(36).substr(2, 5), function(response) {
  // Parse JSON string into object
  var json = JSON.parse(response);
  json = json[0]['projects'];
  for(var i of json) {
    console.log(i['tags']);
    createProjectItem(i['id'], i['name'], i['link'], i['tags']);
  }
 });
setTimeout(function(){
  createProfilePicture();
  siteLoaded();
  createNav();
}, 2000);
