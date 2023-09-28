import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from "../Main/Main";
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="page">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;

// function App() {
//   return (
//     <div className="page">
//       <Routes>
//         <Route path="/" element={<Main/>}/>
//         <Route path="/movies" element={<Movies/>}/>
//         <Route path="/saved-movies" element={<SavedMovies/>}/>
//         <Route path="/profile" element={<Profile/>}/>
//         <Route path="/signin" element={<Login/>}/>
//         <Route path="/signup" element={<Register/>}/>
//         <Route path="*" element={<NotFound/>}/>
//       </Routes>
//     </div>
//   );
// }

// export default App;