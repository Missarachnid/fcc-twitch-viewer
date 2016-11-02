$(document).ready(function() {

  var userList = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "brunofin", "comster404", "kittyplays", "ms_vixen", "streamerhouse", "syndicate", "captainsparklez", "sodapoppin", "riotgames", "summit1g", "paradoxinteractive", "ESL_CSGO", "jaeyoong", "germanletsplay", "artemis", "cretetion"];

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

  //function to run if user is online
  function stream(data) {
    name = data.stream.channel.display_name;
    if (data.stream.logo === null) {
      logo = "https://crossorigin.me/http://www.mmkepler.com/other/icon.png";
    } else {
      logo = data.stream.channel.logo;
    }

    link = data.stream.channel.url;
    status = data.stream.game;
    $("#dataUl").prepend("<li class='online'>" + "<div class='listBg'>" + "<img id='logoImg' src='" + logo + "'>" + "<h3>" + name + "</h3>" + "<a href='" + link + "' target='_blank'>" + "<br>" + "<h4 class='status'>" + status + "</h4>" + "</a>" + "</div>" + "</li>");
  }

  //function to run if account doesn't exist
  function streamError(data) {
    logo = "https://crossorigin.me/http://www.mmkepler.com/other/icon.png";
    var name = data.message;
    name = name.replace("Channel '", "");
    name = name.replace("' is unavailable", "");
    name = name.replace("' does not exist", "");
    status = "Account Closed";
    $("#dataUl").prepend("<li class='closed'>" + "<div class='listBg'>" + "<img id='logoImg' src='" + logo + "'>" + "<h3>" + name + "</h3>" + "<br>" + "<h4 class='status'>" + status + "</h4>" + "</div>" + "</li>");
  }

  //function to run if user is offline
  function streamNull(data) {
    var urlChannel = data._links.channel + callback;
    $.getJSON(urlChannel, function(userData) {
      name = userData.display_name;
      status = "Offline";
      if (userData.logo === null) {
        logo = "https://crossorigin.me/http://www.mmkepler.com/other/icon.png";
      } else {
        logo = userData.logo;
      }
      link = userData.url;
      $("#dataUl").prepend("<li class='offline'>" + "<div class='listBg'>" + "<img id='logoImg' src='" + logo + "'>" + "<h3>" + name + "</h3>" + "<a href='" + link + "' target='_blank'>" + "<br>" + "<h4 class='status'>" + status + "</h4>" + "</div>" + "</a>" + "</li>");
    });
  }

  //iterate through array of users
  for (var i = 0; i < userList.length; i++) {
    var user = userList[i];
    var callback = "?client_id=jcif7s4k8pvn8opy8zhp3qf3gvraavk&callback=?";
    var urlStreams = "https://api.twitch.tv/kraken/streams/" + user + callback;

    //JSONP request to get initial information
    $.getJSON(urlStreams).done(function(streamData) {
      var name, logo, link, status;

      //check for function to use
      if (streamData.error) {
        streamError(streamData);
      } else if (streamData.stream === null) {
        streamNull(streamData);
      } else {
        stream(streamData);
      }
    });

  }
});