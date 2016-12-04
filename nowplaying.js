$(document).ready(function(){
  $.getJSON('today-top-hits.json', function (data) {
    $('#subheader').html(data.playlistName);

    var i = 0;
    console.log(i);
    var eachtrack = data.tracks.map(function (track) {
        return '<img src="' + track.artwork + '" alt="art" />' 
            + '<div id="songtitle">' + track.title +'</div>' 
            + '<div id="artist">' + track.artists + '</div>'
            + '<audio id="songtrack" src="' + track.preview_url + '"/>';
        });
    
    //play
    $('#play').on('click', function() {
      document.getElementById('songtrack').play();
      $('#play').hide();
      $('#pause').show();
      showDuration();
    });

    //pause
    $('#pause').on('click', function() {
      document.getElementById('songtrack').pause();
      $('#pause').hide();
      $('#play').show();
    });

    //initializer -play first song
    $('#pause').hide();
    $('#eachtrack').html(eachtrack[0]);

    //seekbar
    function showDuration(){
    $('#songtrack').on('timeupdate', function() {
      $('#seekbar').attr("value", this.currentTime / this.duration);
    });
    }

    //next
    var i = 0;
    var track_length = data.tracks.length;
    $('#next').on('click', function(){
      i = i + 1; // increase i by one
      i = i % track_length // if we've gone too high, start from `0` again
      return $('#eachtrack').html(eachtrack[i]) // give us back the item of where we are now
             + document.getElementById('songtrack').play()
             + showDuration()
             + $('#play').hide()
             + $('#pause').show();;
    });  
    //previous  
    $('#prev').on('click', function(){
      if (i === 0){
        i = track_length;
      }
      i = i - 1;
      return $('#eachtrack').html(eachtrack[i])
             + document.getElementById('songtrack').play()
             + showDuration()
             + $('#play').hide()
             + $('#pause').show();;           
    });

  });

});