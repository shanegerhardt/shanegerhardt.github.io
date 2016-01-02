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

loadCSS();

setInterval(function(){ siteLoaded(); }, 5000);
