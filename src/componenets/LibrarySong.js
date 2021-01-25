import React from 'react';

const LibrarySong = ({song, songs, setSongs, id, setCurrentSong, audioRef, isPlaying}) => {
    const songSelectHandler = () => {
        setCurrentSong(song);
        //Add Active State
        const newSongs = songs.map((song) => {
            if(song.id === id){
                return{
                    ...song,
                    active: true,
                };
            }else{
                return{
                    ...song,
                    active: false,
                }
            }
        });
        setSongs(newSongs);

        //check if the song is playing
        // const playPromise = audioRef.current.play();
        // if(isPlaying){
        //     if(playPromise !== undefined){
        //         playPromise.then((audio) => {
        //             audioRef.current.play(); 
        //         });
        //     } 
        // }
        // console.log(playPromise);
           
    };
    return(
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ""}`}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};


export default LibrarySong;