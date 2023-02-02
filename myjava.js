function github() {
  window.open("https://github.com/Lubos-source");
}


function mail(){
window.open("./blank.html")
}



function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000)); // 365 days
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"+";"+ "SameSite" + "=" + "Lax"; // valid on everysite
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let username = getCookie("username");
  if ((username != "")&&(username!=null)) {
   //alert("Welcome again " + username);
   console.log("cookie found");
   document.getElementById("user").textContent="user " + username; //SECURE
   //document.getElementById("myspan").innerHTML="newtext"; //INSCURE!
  } else {
    username = getmyJSON();
    console.log("cookie NOT found");
    if (username != "" && username != null) {
      setCookie("username", username, 365);
      document.getElementById("user").textContent="user " + username;
    }
    else{checkCookie()}
  }
}

var country=null;
var countryCD=null;
function getmyJSON(){
  var usersip=null;
  console.log(location.protocol);
  //HTTPS ip finder //https://ipapi.co/json/
  if (location.protocol == 'https:') {
    console.log("HTTPS");
        $.getJSON('https://ipapi.co/json/', function(data) {  //https://www.google.com/search?q=%http://ip-api.com/json&btnI=Im+Feeling+Lucky
          usersip = ((data.ip)); 
          country=(data.country_name)
          countryCD=(data.country_code)
          console.log(JSON.stringify(data, null, 2)); //returns all data
          console.log(location.protocol);
        });

        
  }else if((location.protocol == 'http')||(location.protocol =='file:')){ //if(location.protocol == 'http:') 
    console.log("HTTP:");
        $.getJSON('http://ip-api.com/json', function(data) {  //https://www.google.com/search?q=%http://ip-api.com/json&btnI=Im+Feeling+Lucky
          usersip = ((data.query)); // strip what i need // maybe? JSON.stringify()
          //document.getElementById("user").textContent="user " + ip; //SECURE
          country=(data.country)
          countryCD=(data.countryCode)
          console.log(JSON.stringify(data, null, 2)); //returns all data
          console.log(location.protocol);
        });
  };
  
  //console.log(usersip);          //testing
  console.log(country, countryCD)
  return usersip;
};

// setup to make Jquery asynchonious --> I need user ip to change after calling ajax. Not BEST idea! 
$.ajaxSetup({
  async: false
});

function checkGeo(){  //France FR --> redirects to subdomain or specific folder(should be found by githubIO directory visibility)?
if ((country=="France")&&(countryCD=="FR")) {
  //console.log("You are my FRANCE friend :)")
  location.href = 'http://lubossourcesubweb.42web.io/';
};
}