import React, { useState, useRef } from "react";
//Import Styles
import './styles/app.scss';
//Adding compontents
import Player from './componenets/Player';
import Song from './componenets/Song';
import Library from './componenets/Library';
import Nav from './componenets/Nav';
//Import data
import data from "./data";
//Import Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

function App() {

  //Ref
  const audioRef = useRef(null);

  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [mute, setMute] = useState(false);

  //Handlers
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //Calculate Percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({ ...songInfo, currentTime: current, duration: duration, animationPercentage: animation })
  };
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };
  //check if the song is playing
  const autoPlayHandler = () => {
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  const muteHandler = () => {
    setMute(!mute);
  };

  const volumeHandler = (e) => {
    audioRef.current.volume = e.target.value / 100
  };



  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <Song
        currentSong={currentSong}
        songInfo={songInfo}
      />
      <Player
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <div className="volume-container">
        <button onClick={muteHandler} className="mute">
          <FontAwesomeIcon icon={mute ? faVolumeMute : faVolumeUp} />
        </button>
        <div className="bar-container">
           <input onChange={volumeHandler} id="volume" type="range" />
        </div>
      </div>
      <Library
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedData={autoPlayHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
        muted={mute}
      ></audio>
    </div>
  );
}

export default App;
