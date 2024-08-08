// import React, { useContext } from 'react'
// import Sidebar from './components/Sidebar'
// import Player from './components/Player'
// import Display1 from './components/Display1'
// import { PlayerContext } from './context/PlayerContext'





// const App = () => {

//   const { audioRef, track, songsData } = useContext(PlayerContext);

//   return (
//     <div className='h-screen bg-black'>
//       {
//         songsData.length !==0
//           ? <>
//             <div className='h-[90%] flex'>
//               <Sidebar />
//               <Display1 />
//             </div>
//             <Player />
//           </>
//           : null
//       }


//       <audio ref={audioRef} src={track?track.file:""} preload='auto'></audio>
//     </div>
//   )
// }

// export default App




// import React, { useContext } from 'react';
// import {Router, Routes,Route } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Player from './components/Player';
// import Display1 from './components/Display1';
// import { PlayerContext } from './context/PlayerContext';
// import PremiumPage from './pages/Premium'; // Import PremiumPage

// const App = () => {
//     const { audioRef, track, songsData } = useContext(PlayerContext);

//     return (
//         <Router>
//             <div className='h-screen bg-black'>
//                 <Routes>
//                     <Route exact path="/">
//                         {songsData.length !== 0 ? (
//                             <>
//                                 <div className='h-[90%] flex'>
//                                     <Sidebar />
//                                     <Display1 />
//                                 </div>
//                                 <Player />
//                             </>
//                         ) : null}
//                         <audio ref={audioRef} src={track ? track.file : ""} preload='auto'></audio>
//                     </Route>
//                     <Route path="/premium" element={PremiumPage} />
                    
//                 </Routes>
//             </div>
//         </Router>
//     );
// };

// export default App;




import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Display1 from './components/Display1';
import { PlayerContext } from './context/PlayerContext';
import PremiumPage from './pages/Premium';

const App = () => {
    const { audioRef, track, songsData } = useContext(PlayerContext);

    return (
        <div className='h-screen bg-black'>
            <Routes>
                <Route path="*" element={
                    songsData.length !== 0 ? (
                        <>
                            <div className='h-[90%] flex'>
                                <Sidebar />
                                <Display1 />
                            </div>
                            <Player />
                            <audio ref={audioRef} src={track ? track.file : ""} preload='auto'></audio>
                        </>
                    ) : null
                } />
                <Route path="/premium" element={<PremiumPage />} />
            </Routes>
        </div>
    );
};

export default App;