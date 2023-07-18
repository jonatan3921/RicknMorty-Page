import React, {useContext} from 'react'
import './Episodes.css'
import axios from 'axios'
import CharacterCard from '../../components/CharacterCard/CharacterCard'
import { ThemeContext } from '../../contexts/ThemeContext'

function Episodes() {

  //use global state
  //NOTE { } NOT []
  const {darkMode, setDarkMode} = useContext(ThemeContext)

  //create state to hold the numbers
  const [options, setOptions] = React.useState([])
  //state for option selected by user
  const [selectedOption, setSelectedOption] = React.useState(1)
  //state for data for this episode
  const [selectedEpisode, setSelectedEpisode] = React.useState('')
  //state for the characters
  const [characterList, setCharacterList] = React.useState([])

  //https://rickandmortyapi.com/api/episode

  //I need to find out number of episodes when this page loads
  React.useEffect(
    ()=>{
      //make api call to get the number of episodes
      axios.get(`https://rickandmortyapi.com/api/episode`)
      .then(res =>{
        console.log(res.data.info.count)
        //this is the number of episodes
        //use a for loop to create array of numbers from 1 to 51
        const newOptions = []
        for (let i = 1; i <= res.data.info.count; i++){
          newOptions.push(i)
        }
        setOptions(newOptions)
      })
      .catch(err => console.log(err))

      //call function to get data the first time
   // fetchEpisodeData()


    }, [] //run once when page loads
  )

  const handleSelectChange = (e) =>{
    console.log( e.target.value)
    setSelectedOption(e.target.value)
    //call function to get data
   // fetchEpisodeData()
  }

  //need to get data anytime user selects another episode
  
  React.useEffect(
    ()=>{
      console.log('get data for episode', selectedOption)
      //call function to get data
      fetchEpisodeData()

    }, [selectedOption] //runs anytime this value changes

  )
  

  const fetchEpisodeData = async () =>{
    console.log('make api calls')
    //https://rickandmortyapi.com/api/episode/28

    try{
      //make api call to get data for this episode
      const res = await axios.get(`https://rickandmortyapi.com/api/episode/${selectedOption}`)
      console.log(res.data)
      //store this episode data in state
      setSelectedEpisode(res.data)
      //console.log(res.data.characters)
      //we need to make all these api calls to get character data
      const episodeCharacters = await Promise.all(
        res.data.characters.map(url => {
          return axios.get(url).then(res => res.data)
        })
      )
      console.log(episodeCharacters)
      //store this data in state
      setCharacterList(episodeCharacters)


    } catch(err){
      //ANY api errors will go here
      console.log(err)
    }
  }

  return (
    <div className={darkMode?"episodes-container episodes-dark":"episodes-container"}>
      <div>
        <label htmlFor="select-episode"> Select an episode:</label>
        <select id="select-episode" onChange={handleSelectChange}>
          {
            options.map(num => <option key={num} value={num}>{`Episode ${num}`}</option>)
          }

        </select>
      </div>

      <div>
        <div className="episode-info">
          <p>Episode Name: {selectedEpisode?.name}</p>
          <p>Air Date: {selectedEpisode?.air_date}</p>
        </div>
        <div className="character-container">
          {
                characterList.map(item=><CharacterCard 
                    key={item.id} character={item} />)
                // characters.map(item=><p>{item.name}</p>)
            }
        </div>

      </div>

    </div>
  )
}

export default Episodes