var music_player;
    $(document).ready(function(){

    // Playlist array
    var files = [
        "songs/jingle_bell.mp3",
        "songs/aahatein.mp3",
        "songs/tuyou.mp3",
        "songs/tu_hi_yaar_mera.mp3",
        "songs/aankhon_se_batana.mp3",
        "songs/rab_dikhta_he.mp3"
    ];

    // Current index of the files array
    var i = 0;

    // Get the audio element
    music_player = document.querySelector("#music_list audio");
    $("#music_list").css("display", "none");
    music_player.autoplay = true;
    // music_player.muted = true;

    // function for moving to next audio file
    function next() {
        // Check for last audio file in the playlist
        if (i === files.length - 1) {
            i = 0;
        } else {
            i++;
        }

        // Change the audio element source
        music_player.src = files[i];
        console.log("Playing :",files[i]);
    }

    // Check if the player is selected
    if (music_player === null) {
        throw "Playlist Player does not exists ...";
    } else {
        // Start the player
        // music_player.src = files[i];
        var source= document.createElement('source');
        source.src= files[i];
        music_player.appendChild(source);

        music_player.play();
        console.log("Playing :",files[i]);
        
        // Listen for the music ended event, to play the next audio file
        music_player.addEventListener('ended', next, false);
    }

});

document.addEventListener("visibilitychange", (event) => {
    if (document.visibilityState == "visible") {
      console.log("tab is active");
      if(playMusic)
      {
        music_player.play();
      }   
      else
      {
        console.log("Play music is not selected.")
      }
    } else {
      console.log("tab is inactive");
      music_player.pause();
    }
  });