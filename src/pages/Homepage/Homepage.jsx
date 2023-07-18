import React, {useEffect, useState, useContext} from 'react'
import './Homepage.css'
import axios from 'axios'
import CharacterCard from '../../components/CharacterCard/CharacterCard';
import Search from '../../components/Search/Search';
import {ThemeContext} from '../../contexts/ThemeContext';

function Homepage() {

    //Now change to global state
    //Note { } not [ ]
    const {darkMode, setDarkMode} = useContext(ThemeContext)
    //show all the characters when the page loads

    //create state for characters
    const [characters, setCharacters] = useState([]);

    //get the api https://rickandmortyapi.com/api/character

    useEffect(
        () =>{
            //call api to get the character data
            axios.get(`https://rickandmortyapi.com/api/character`)
            .then(res => {
                console.log(res.data.results);
                //I have the date, what do I do with it?
                //store it in state
                setCharacters(res.data.results);
            })
            .catch(err => console.log(err))


        }, [] //means it runs only once when the page loads

    )

  return (
    <div className={darkMode?'home-container home-dark':'home-container'}>
        <Search setCharacters={setCharacters} />
        <h1>Main Characters</h1>
        <div className='characters-container'>
            {/* Characters go here */}
            {
                characters.map(item => <CharacterCard key={item.id} character={item}/>)
            // characters.map(item => <p>{item.name}</p>)
            }
        </div>
    </div>
  )
}

export default Homepage