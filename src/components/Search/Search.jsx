import React from 'react'
import './Search.css'
import axios from 'axios'


function Search({setCharacters}) {
  //Create state to hold user input
  const [query, setQuery] = React.useState('')

  //https://rickandmortyapi.com/api/character/?name=rick

  const handleSubmit = (e) => {
    //stop the form from refreshing
    e.preventDefault()
    
    //Make api call to get the matching characters
    axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`)
    .then(res => {
      //I have the data, what do I do with it?
      //I Want to change what is in characters
      setCharacters(res.data.results)
    })
    .catch(err => {
      console.log(err.response.status)
      //Display a message when people search for a character that does not exist
      if (err.response.status === 404) {
        alert(`No characters named ${query}`);
      } else {
        console.log(err);
      }
    })
    //clear the textbox
    setQuery('')
  }
  return (
    <form className='search-container' onSubmit={handleSubmit}>
      <input type="text" value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder='Search all characters' />

    </form>
  )
}

export default Search