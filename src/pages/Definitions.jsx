import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom";
import NotFound from "../components/NotFound";
import DefinitionSearch from "../components/DefinitionSearch";

function Definitions() {
    const [meanings, setMeanings] = useState()
    const [notFound, setNotFound] = useState(false)
    const [error, setError] = useState(false)
    const {search} = useParams()
    const navigate = useNavigate()

    const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'+ search;
    // const url = 'https://httpstat.us/200'
    useEffect(() => {
        fetch(url)
        .then(response => {
            if(response.status === 404){
                setNotFound(true)
            }else if(response.status === 401){
                navigate('/login')
            }

            if(!response.ok){
                setError(true)
                throw new Error("something went wrong")
            }
            return response.json()
        })
        .then(data => {
            setMeanings(data[0].meanings)
        })
        .catch(error => {
            setError(false)
            console.log(error.message)
        })
    },[]);

    if(notFound === true){
        return(
            <>
                <NotFound/>
                <Link to='/dictionary'>Search another</Link>
            </>
        )
    }

    if(error === true){
        return(
            <>
                <p>error occured</p>
                <Link to='/dictionary'>Search another</Link>
            </>
        )
    }
        

    return (
        <div>
            <h2>Definitions</h2>
            {meanings ? (meanings.map((meaning, index) => {
                return (
                    <div key={index}>
                        <p>{'('+ meaning.partOfSpeech+')'}: {meaning.definitions[0].definition}</p>
                    </div>
                );
               
            })) :  <p>loading...</p> }

            <DefinitionSearch/>
  
        </div>
    )
}

export default Definitions