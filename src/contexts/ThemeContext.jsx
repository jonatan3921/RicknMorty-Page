import {useState, createContext, useEffect} from 'react'

//create context using hook
export const ThemeContext = createContext()

export default function ThemeContextProvider(props){
    //create global state here
    const [darkMode, setDarkMode] = useState(false)

    useEffect(
        ()=>{
            //is there a value in localStorage
            const storedDarkMode = localStorage.getItem('darkMode')
            console.log("retrieved value ", storedDarkMode)
            //only use if there was a value
            if (storedDarkMode){
                //use this to initialize
                setDarkMode(JSON.parse(storedDarkMode))
            }

        }, [] //runs once when component loads
    )

    useEffect(
        ()=>{
            console.log("darkmode is now", darkMode)
            //save new value to localStorage
            localStorage.setItem('darkMode', JSON.stringify(darkMode))

        }, [darkMode] //runs anytime darkMode changes
    )

    return(
        <ThemeContext.Provider value={{darkMode, setDarkMode}}>
            {props.children}
        </ThemeContext.Provider>
    )
}