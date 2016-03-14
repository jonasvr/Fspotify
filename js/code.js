$(document).ready(function(){
  $("#download").click(function() {
    //https://developers.google.com/youtube/v3/getting-started#intro
    var youtubeKey    = 
    // https://developer.spotify.com/web-api/console/get-playlist-tracks/#complete
    var tokenSpotify  = $("#spotifykey").val();
    var str           = $("#URL").val().split(":");
    var userID        = str[2]
    var playlistID    = str[4];
    // http://stackoverflow.com/questions/28617587/spotify-web-api-ajax
      $.ajax({
          url: 'https://api.spotify.com/v1/users/'+ userID +'/playlists/'+ playlistID +'/tracks',
          type: 'GET',
          headers: {
              'Authorization' : 'Bearer ' + tokenSpotify,
          },
          success: function(data) {
              $.each(data.items,function( index, object ) {
              $.ajax({
                // https://developers.google.com/youtube/v3/docs/search/list#http-request
                  url: 'https://www.googleapis.com/youtube/v3/search?q='+ object.track.name + " - " + object.track.artists[0].name + '&key='+youtubeKey+'=1&part=snippet',
                  type: 'GET',
                    success: function(data) {
                    // www.youtube.com/watch?v=
                    window.open('http://www.youtubeinmp3.com/fetch/?video=http://www.youtube.com/watch?v=' + data.items[0].id.videoId);
                    }
                  });//end of ajax
            });
          } //end of succes call
      }); //end of $.ajax
  });//end of download button
});//end of page load
