import { useState} from "react"
import { useNavigate } from "react-router-dom"

export default function DefinitionSearch() {
  
    const [word, setWord] = useState('')
    const navigate = useNavigate()
  
    return (
      <div>
          <form onSubmit={() => {navigate('/dictionary/' + word)}} className="w-full max-w-sm">
              <div className="flex items-center border-b border-gray-500 py-2">
                  <input onChange={(e) => {setWord(e.target.value) }} 
                      value={word} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                      type="text" placeholder="search any word" 
                      aria-label="Full name"/>
              
                  <button
                      className="flex-shrink-0 bg-purple-500 hover:bg-teal-700 border-purple-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                  >
                      Search
                  </button>
                  <button onClick={() => setWord('')} 
                      className="flex-shrink-0 border-transparent border-4 text-purple-800 hover:text-teal-800 text-sm py-1 px-2 rounded" 
                      type="button"
                  >
                      Clear
                  </button>
              </div>
          </form>
      </div>
    )
}
