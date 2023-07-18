import {useState, createContext, useEffect} from 'react'

//create context using hook
export const FavoritesContext = createContext()

export default function FavoritesContextProvider(props){
    //create global state here
    const [favorites, setFavorites] = useState([])

    
    useEffect(
        ()=>{
            //is there a value in localStorage
            const storedFavorites = localStorage.getItem('favoritesList')
            //only use if there was a value
            if (storedFavorites){
                //use this to initialize
                setFavorites(JSON.parse(storedFavorites))
            }

        }, [] //runs once when component loads
    )

    useEffect(
        ()=>{
            //save new value to localStorage
            localStorage.setItem('favoritesList', JSON.stringify(favorites))

        }, [favorites] //runs anytime favorites changes
    )

    const addCharacter = (charToAdd) => {
        console.log("adding", charToAdd)
        //add charToAdd to Favorites
        let newFavorites = [...favorites, charToAdd]
        console.log(newFavorites);
        //replace state
        setFavorites(newFavorites);
    }

    const removeCharacter = (charId) => {
        console.log('remove', charId)
        //remove charId
        //keep all the ones that are NOT charId
        let newFavorites = favorites.filter(item => item.id != charId)
        //replace state
        setFavorites(newFavorites);
    }

    return(
        <FavoritesContext.Provider value={{favorites, addCharacter, removeCharacter}}>
            {props.children}
        </FavoritesContext.Provider>
    )
}