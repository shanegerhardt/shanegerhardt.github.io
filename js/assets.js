function loadCSS(file){
  var head  = doc.getElementsByTagName('head')[0];
  var css  = doc.createElement('link');
  css.rel  = 'stylesheet';
  css.type = 'text/css';
  css.href = file;
  css.media = 'all';
  head.appendChild(css);
}
loadCSS('//' + doc.location.host + 'css/main.css');
loadCSS("https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css");
