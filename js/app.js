$(document).ready(function() {

  'use strict';

  /*VARIABLES*/
  var userList = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "brunofin", "comster404", "kittyplays", "ms_vixen", "streamerhouse", "syndicate", "captainsparklez", "sodapoppin", "riotgames", "summit1g", "paradoxinteractive", "ESL_CSGO", "jaeyoong", "germanletsplay", "artemis", "cretetion"];
  var callback = "?client_id=jcif7s4k8pvn8opy8zhp3qf3gvraavk&callback=?";
  var noLogo = "../img/icon.png";
  var name, logo, link, status;
    
    
/*CONTROLS FOR SORTING MENU*/
  //clear info on refresh
  $("#dataUl").empty();
  
//this button shows all streamers
  $('#all').click(function(e) {
    e.preventDefault();
    $(".closed").show();
    $(".online").show();
    $(".offline").show();
  });

  //shows online streamers
  $('#online').click(function(e) {
    e.preventDefault();
    $(".online").show();
    $(".offline").hide();
    $(".closed").hide();
  });

  //shows offline streamers
  $('#offline').click(function(e) {
    e.preventDefault();
    $(".offline").show();
    $(".online").hide();
    $(".closed").hide();
  });
    
    
/*FUNCTIONS*/
    
   //if streamer is online 
  function stream(data) {
    name = data.stream.channel.display_name;
      //console.log(name);
    link = data.stream.channel.url;
    status = data.stream.game;
      
    if (data.stream.logo === null) {
      logo = noLogo;
    } else {
      logo = data.stream.channel.logo;
    }

    $("#dataUl").prepend("<li class='online'>" + "<div class='listBg'>" + "<img id='logoImg' src='" + logo + "' alt='Logo for account'>" + "<h3>" + name + "</h3>" + "<a href='" + link + "' target='_blank'>" + "<br>" + "<h4 class='status'>" + status + "</h4>" + "</a>" + "</div>" + "</li>");
  }
    

  //function to run if user is offline
  function streamNull(data) {
    var urlChannel = data._links.channel + callback;
    $.getJSON(urlChannel, function(userData) {
        //console.log(userData);
      if(userData.status === 404){
          streamError(userData);
      }else{
          //console.log(userData);
        name = userData.display_name;
         // console.log(name);
        status = "Offline"; 
        if (userData.logo === null) {
          logo = noLogo;
        } else {
          logo = userData.logo;
        }
        link = userData.url;
        
    $("#dataUl").prepend("<li class='offline'>" + "<div class='listBg'>" + "<img id='logoImg' src='" + logo + "' alt='Logo for account'>" + "<h3>" + name + "</h3>" + "<a href='" + link + "' target='_blank'>" + "<br>" + "<h4 class='status'>" + status + "</h4>" + "</div>" + "</a>" + "</li>");
      }
    });
  }
    
    //function to run if account doesn't exist
  function streamError(data) {
    logo = noLogo;
    name = data.message;
    name = name.replace("Channel '", "");
    name = name.replace("' is unavailable", "");
    name = name.replace("' does not exist", "");
    status = "Account Closed";
    $("#dataUl").prepend("<li class='closed'>" + "<div class='listBg'>" + "<img id='logoImg' src='" + logo + "' alt='Logo for account'>" + "<h3>" + name + "</h3>" + "<br>" + "<h4 class='status'>" + status + "</h4>" + "</div>" + "</li>");
  }
    
    function getInfo(user){
      var urlStreams = "https://api.twitch.tv/kraken/streams/" + user + callback;
      $.getJSON(urlStreams, function(streamData){
        if(streamData.stream === null){
          streamNull(streamData);
        } else {
          stream(streamData);
        }
    });    
    }
    
/*ITERATIONS FOR AJAX CALLS*/
    
  for(var i = 0; i < userList.length; i++){
    var user = userList[i];
    getInfo(user);
      
  }    
    
  
});
