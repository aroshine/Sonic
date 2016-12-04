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
    $('#play').on('click', function() {
    document.getElementById('songtrack').play();
    });

    $('#pause').on('click', function() {
    document.getElementById('songtrack').pause();
    });
    $('#eachtrack').html(eachtrack[0]);
    $('#songtrack').on('timeupdate', function() {
    $('#seekbar').attr("value", this.currentTime / this.duration);
    });
    var i = 0;
    var track_length = data.tracks.length;
    console.log(track_length);

    $('#next').on('click', function(){
      i = i + 1; // increase i by one
      i = i % track_length // if we've gone too high, start from `0` again
      console.log(i);
      return $('#eachtrack').html(eachtrack[i]) 
             + $('songtrack').html(songtrack[i]); // give us back the item of where we are now
    });
    $('#prev').on('click', function(){
      if (i === 0){
        i = track_length;
      }
      i = i - 1;
      return $('#eachtrack').html(eachtrack[i]) 
             + $('songtrack').html(songtrack[i]);  
    });

  });

});