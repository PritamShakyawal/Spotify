// import { createContext, useEffect, useRef, useState } from "react";
// import axios from 'axios';
// // import { songsData } from "../assets/assets";

// export const PlayerContext = createContext();

// const PlayerContextProvider = (props) => {

//     const audioRef = useRef();
//     const seekBg = useRef();
//     const seekBar = useRef();

//     const url = 'http://localhost:4000'

//     const [songsData, setSongsData] = useState([]);
//     const [albumsData, setAlbumData] = useState([]);


//     const [track, setTrack] = useState(songsData[0]);
//     const [playerStatus, setPlayStatus] = useState(false);
//     const [time, setTime] = useState({
//         currentTime: {
//             second: 0,
//             minute: 0
//         },
//         totalTime: {
//             second: 0,
//             minute: 0
//         }
//     });



//     const play = () => {
//         audioRef.current.play();
//         setPlayStatus(true);
//     }

//     const pause = () => {
//         audioRef.current.pause();
//         setPlayStatus(false);
//     }

//     // const playWithId = async (id) => {
//     //     await setTrack(songsData[id]);
//     //     await audioRef.current.play();
//     //     setPlayStatus(true);
//     // }

//     const playWithId = async (id) => {
//          songsData.map((item) => {
//             if (id === item._id) {
//                 setTrack(item);
//             }
//         })
//         await audioRef.current.play();
//         setPlayStatus(true);
//     }


//     // const previous = async () => {
//     //     if(track.id>0){
//     //         await setTrack(songsData[track.id-1]);
//     //         await audioRef.current.play();
//     //         setPlayStatus(true);
//     //     }
//     // }


//     const previous = async () => {
//         songsData.map(async (item, index) => {
//             if (track._id === item._id && index > 0) {
//                 setTrack(songsData[index - 1]);
//                 await audioRef.current.play();
//                 setPlayStatus(true);
//             }
//         })
//     }

//     // const next = async () => {
//     //     if(track.id<songsData.length-1){
//     //         await setTrack(songsData[track.id+1]);
//     //         await audioRef.current.play();
//     //         setPlayStatus(true);
//     //     }
//     // }



//     const next = async () => {
//         songsData.map(async (item, index) => {
//             console.log(item._id);
//             if (track._id === item._id && index < songsData.length-1) {
//                 setTrack(songsData[index + 1]);
//                 await audioRef.current.play();
//                 setPlayStatus(true);
//             }
//         })
//     }



//     const seekSong = async (e) => {
//         audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
//     }


//     const getSongsData = async () => {
//         try {

//             const response = await axios.get(`${url}/api/song/list`);
//             // console.log(response);
//             setSongsData(response.data.songs);
//             setTrack(response.data.songs[0]);

//         } catch (error) {

//         }
//     }


//     const getAlbumsData = async () => {
//         try {

//             const response = await axios.get(`${url}/api/album/list`);
//             setAlbumData(response.data.albums);

//         } catch (error) {

//         }
//     }



//     useEffect(() => {
//         setTimeout(() => {
//             audioRef.current.ontimeupdate = () => {
//                 seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
//                 setTime({
//                     currentTime: {
//                         second: Math.floor(audioRef.current.currentTime % 60),
//                         minute: Math.floor(audioRef.current.currentTime / 60)
//                     },
//                     totalTime: {
//                         second: Math.floor(audioRef.current.duration % 60),
//                         minute: Math.floor(audioRef.current.duration / 60)
//                     }
//                 })
//             }
//         }, 1000)
//     }, [audioRef]);


//     useEffect(() => {
//         getSongsData();
//         getAlbumsData();
//     }, []);


//     const contextValue = {
//         audioRef,
//         seekBg,
//         seekBar,
//         track, setTrack,
//         playerStatus, setPlayStatus,
//         time, setTime,
//         play, pause,
//         playWithId,
//         previous, next,
//         seekSong,
//         songsData, albumsData
//     }




//     return (
//         <PlayerContext.Provider value={contextValue}>
//             {props.children}
//         </PlayerContext.Provider>
//     )
// }

// export default PlayerContextProvider;







// import { createContext, useEffect, useRef, useState } from "react";
// import axios from 'axios';

// export const PlayerContext = createContext();

// const PlayerContextProvider = (props) => {
//     const audioRef = useRef(null);
//     const seekBg = useRef(null);
//     const seekBar = useRef(null);

//     const url = 'http://localhost:4000';

//     const [songsData, setSongsData] = useState([]);
//     const [albumsData, setAlbumData] = useState([]);
//     const [track, setTrack] = useState(null);
//     const [playerStatus, setPlayStatus] = useState(false);
//     const [time, setTime] = useState({
//         currentTime: { second: 0, minute: 0 },
//         totalTime: { second: 0, minute: 0 }
//     });

//     useEffect(() => {
//         if (track && audioRef.current) {
//             audioRef.current.src = track.file;
//             if (playerStatus) {
//                 audioRef.current.play().catch(error => console.error('Error playing the audio:', error));
//             }
//         }
//     }, [track]);

//     useEffect(() => {
//         getSongsData();
//         getAlbumsData();
//     }, []);

//     useEffect(() => {
//         const updateTime = () => {
//             if (audioRef.current && audioRef.current.duration) {
//                 const currentTime = audioRef.current.currentTime;
//                 const duration = audioRef.current.duration;

//                 if (seekBar.current) {
//                     seekBar.current.style.width = `${(currentTime / duration) * 100}%`;
//                 }

//                 setTime({
//                     currentTime: {
//                         second: Math.floor(currentTime % 60),
//                         minute: Math.floor(currentTime / 60)
//                     },
//                     totalTime: {
//                         second: Math.floor(duration % 60),
//                         minute: Math.floor(duration / 60)
//                     }
//                 });
//             }
//         };

//         const audioElement = audioRef.current;
//         if (audioElement) {
//             audioElement.ontimeupdate = updateTime;
//         }

//         return () => {
//             if (audioElement) {
//                 audioElement.ontimeupdate = null;
//             }
//         };
//     }, [audioRef, track]);

//     const play = () => {
//         if (audioRef.current && track) {
//             audioRef.current.play().then(() => {
//                 setPlayStatus(true);
//             }).catch(error => {
//                 console.error('Error playing the audio:', error);
//             });
//         }
//     };

//     const pause = () => {
//         if (audioRef.current) {
//             audioRef.current.pause();
//             setPlayStatus(false);
//         }
//     };

//     const playWithId = (id) => {
//         const selectedTrack = songsData.find(item => item._id === id);
//         if (selectedTrack) {
//             setTrack(selectedTrack);
//             play();  // Ensure it plays immediately
//         }
//     };

//     const previous = () => {
//         if (!track) return;

//         const index = songsData.findIndex(item => item._id === track._id);
//         if (index > 0) {
//             const prevTrack = songsData[index - 1];
//             setTrack(prevTrack);
//         }
//     };

//     const next = () => {
//         if (!track) return;

//         const index = songsData.findIndex(item => item._id === track._id);
//         if (index < songsData.length - 1) {
//             const nextTrack = songsData[index + 1];
//             setTrack(nextTrack);
//         }
//     };

//     const seekSong = (e) => {
//         if (audioRef.current && seekBg.current) {
//             const rect = seekBg.current.getBoundingClientRect();
//             const offsetX = e.clientX - rect.left;
//             const width = seekBg.current.offsetWidth;
//             const seekTime = (offsetX / width) * audioRef.current.duration;
//             audioRef.current.currentTime = seekTime;
//         }
//     };

//     const getSongsData = async () => {
//         try {
//             const response = await axios.get(`${url}/api/song/list`);
//             setSongsData(response.data.songs);
//             if (response.data.songs.length > 0) {
//                 setTrack(response.data.songs[0]);
//             }
//         } catch (error) {
//             console.error('Error fetching songs data:', error);
//         }
//     };

//     const getAlbumsData = async () => {
//         try {
//             const response = await axios.get(`${url}/api/album/list`);
//             setAlbumData(response.data.albums);
//         } catch (error) {
//             console.error('Error fetching albums data:', error);
//         }
//     };

//     const contextValue = {
//         audioRef,
//         seekBg,
//         seekBar,
//         track,
//         setTrack,
//         playerStatus,
//         setPlayStatus,
//         time,
//         setTime,
//         play,
//         pause,
//         playWithId,
//         previous,
//         next,
//         seekSong,
//         songsData,
//         albumsData
//     };

//     return (
//         <PlayerContext.Provider value={contextValue}>
//             {props.children}
//         </PlayerContext.Provider>
//     );
// };

// export default PlayerContextProvider;







import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef(null);
    const seekBg = useRef(null);
    const seekBar = useRef(null);

    const url = 'https://spotify-backend-2ycj.onrender.com';

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumData] = useState([]);
    const [track, setTrack] = useState(null);
    const [playerStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 }
    });

    useEffect(() => {
        if (track && audioRef.current) {
            audioRef.current.src = track.file;
            if (playerStatus) {
                audioRef.current.play().catch(error => console.error('Error playing the audio:', error));
            }
        }
    }, [track]);

    useEffect(() => {
        getSongsData();
        getAlbumsData();
    }, []);

    useEffect(() => {
        const updateTime = () => {
            if (audioRef.current && audioRef.current.duration) {
                const currentTime = audioRef.current.currentTime;
                const duration = audioRef.current.duration;

                if (seekBar.current) {
                    seekBar.current.style.width = `${(currentTime / duration) * 100}%`;
                }

                setTime({
                    currentTime: {
                        second: Math.floor(currentTime % 60),
                        minute: Math.floor(currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(duration % 60),
                        minute: Math.floor(duration / 60)
                    }
                });
            }
        };

        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.ontimeupdate = updateTime;
        }

        return () => {
            if (audioElement) {
                audioElement.ontimeupdate = null;
            }
        };
    }, [audioRef, track]);

    const play = () => {
        if (audioRef.current && track) {
            audioRef.current.play().then(() => {
                setPlayStatus(true);
            }).catch(error => {
                console.error('Error playing the audio:', error);
            });
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayStatus(false);
        }
    };

    const playWithId = (id) => {
        const selectedTrack = songsData.find(item => item._id === id);
        if (selectedTrack) {
            setTrack(selectedTrack);
            play();  // Ensure it plays immediately
        }
    };

    const previous = () => {
        if (!track) return;

        const index = songsData.findIndex(item => item._id === track._id);
        if (index > 0) {
            const prevTrack = songsData[index - 1];
            setTrack(prevTrack);
        }
    };

    const next = () => {
        if (!track) return;

        const index = songsData.findIndex(item => item._id === track._id);
        if (index < songsData.length - 1) {
            const nextTrack = songsData[index + 1];
            setTrack(nextTrack);
        }
    };

    const seekSong = (e) => {
        if (audioRef.current && seekBg.current) {
            const rect = seekBg.current.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const width = seekBg.current.offsetWidth;
            const seekTime = (offsetX / width) * audioRef.current.duration;
            audioRef.current.currentTime = seekTime;
        }
    };

    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            setSongsData(response.data.songs);
            if (response.data.songs.length > 0) {
                setTrack(response.data.songs[0]);
            }
        } catch (error) {
            console.error('Error fetching songs data:', error);
        }
    };

    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            setAlbumData(response.data.albums);
        } catch (error) {
            console.error('Error fetching albums data:', error);
        }
    };

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playerStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        songsData,
        albumsData
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
