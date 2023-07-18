import React, {useContext} from 'react'
import './Favorites.css'
import { FavoritesContext } from '../../contexts/FavoritesContext';
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import { ThemeContext } from '../../contexts/ThemeContext';




function Favorites() {
  //Now change to global state
  //Note { } not [ ]
  const {favorites} = useContext(FavoritesContext)

  //use global state
  //NOTE { } NOT []
  const {darkMode, setDarkMode} = useContext(ThemeContext)

  return (
    <div className={darkMode?"favorites-container favorites-dark":"favorites-container"}>
      <h1>My Favorite Characters</h1>
      <div className='favorites-characters'>
      {
        favorites.length > 0 ?
        favorites.map(item => <CharacterCard key={item.id} character={item}/>)
        :
        <p>No favorite characters selected yet</p>
      }
      </div>
    </div>
  )
}

export default Favorites