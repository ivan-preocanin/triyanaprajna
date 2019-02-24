function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", getLanguage() + "/" + file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function getLanguage() {
  let language = getCookie('language');
  if (language === '') {
    setCookie('language', 'sr', 365);    
    document.getElementById('language-sr').className = 'selected';
    return 'sr';
  }

  document.getElementById('language-' + language).className = 'selected';
  return language;
}

function getLink(page) {
  console.log(this);
  
  return '/' + getLanguage() + '/' + page;
}

function setTitle(pageName) {
  let language = getLanguage();
  document.title = 'Triyana Prajna';

  if (language === 'sr' || language === 'hr') {
    document.title = 'Triyana Prajna';

    if (pageName === 'index') {
      document.title = document.title + ' - O školi';
      return;
    }
    if (pageName === 'program') {
      document.title = document.title + ' - Program škole';
      return;
    }
    if (pageName === 'syllabus') {
      document.title = document.title + ' - Nastavni plan';
      return;
    }
    if (pageName === 'contact') {
      document.title = document.title + ' - Kontakt';
      return;
    }
  }

  if (language === 'en') {
    document.title = 'Triyana Prajna';

    if (pageName === 'index') {
      document.title = document.title + ' - About the School';
      return;
    }
    if (pageName === 'program') {
      document.title = document.title + ' - Course of Studies';
      return;
    }
    if (pageName === 'syllabus') {
      document.title = document.title + ' - Syllabus';
      return;
    }
    if (pageName === 'contact') {
      document.title = document.title + ' - Contact';
      return;
    }
  }
}