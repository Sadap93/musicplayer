import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay,
    faAngleLeft,
    faAngleRight,
    faPause,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({ audioRef, isPlaying, setIsPlaying, setSongInfo, songInfo, songs, currentSong, setCurrentSong, setSongs }) => {

    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) => {
            if (song.id === nextPrev.id) {
                return {
                    ...song,
                    active: true,
                };
            } else {
                return {
                    ...song,
                    active: false,
                }
            }
        });
        setSongs(newSongs);
    }
   
    //Event Handlers
    const playSongHandler = () => {
        if (isPlaying === true) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };



    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    };

    const dragHandler = (e) => {
        setSongInfo({ ...songInfo, currentTime: e.target.value });
        audioRef.current.currentTime = e.target.value;
    };

    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (direction === 'skip-forward') {
            setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        }
        if (direction === 'skip-back') {
            if ((currentIndex - 1) % songs.length === -1) {
                setCurrentSong(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1])
                return;//return, mert így az alsó nem fog végrehajtódni, ha nics akkor vérehajtódik és így is becrash-sel    
            }
            setCurrentSong(songs[currentIndex - 1 % songs.length]);
            activeLibraryHandler(songs[currentIndex - 1 % songs.length])
        }
    };

    //Add the styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>  {/*Start Time*/}
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
                    <input
                        min={0}
                        max={songInfo.duration}
                        value={songInfo.currentTime}
                        onChange={dragHandler}
                        type="range"
                    />
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>  {/*End Time*/}
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler('skip-back')}
                    className="skip-back"
                    size="2x"
                    icon={faAngleLeft}
                />
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className="play"
                    size="2x"
                    icon={isPlaying ? faPause : faPlay}
                />
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler('skip-forward')}
                    className="skip-forward"
                    size="2x"
                    icon={faAngleRight}
                />
            </div>
        </div>
    );
};


export default Player;