import React, {useState, useEffect} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './components/LoginPage/LoginPage'
import BrowsePage from './components/BrowsePage/BrowsePage'
import MatchPage from './components/MatchPage/MatchPage'

function App() {

  const [favoritesIds, setFavoritesIds] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favoritesIds));
  }, [favoritesIds]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/browse' element={<BrowsePage favoritesIds={favoritesIds} setFavoritesIds={setFavoritesIds}/>} />
        <Route path='/match' element={<MatchPage favoritesIds={favoritesIds} setFavoritesIds={setFavoritesIds}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App