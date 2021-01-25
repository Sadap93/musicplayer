import React from 'react';

const Song = ({currentSong, songInfo}) => {
    //Add style
    let time = songInfo.currentTime
    const rotateStyle = {
            transform: `rotate(${time}deg)` 
    }

    return(
        <div className="song-container">
            <img style={rotateStyle} alt={currentSong.name} src={currentSong.cover}></img>
            <h2>{currentSong.name}</h2>
            <h3>{currentSong.artist}</h3>
        </div>
    );
};


export default Song;