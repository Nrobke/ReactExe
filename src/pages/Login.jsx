import { useState } from "react"
import { baseUrl } from "../Shared"
import { useLocation, useNavigate } from 'react-router-dom'

export default function Login() {
    const [user, setUser] = useState({username: '', password: ''})
    const location = useLocation()
    const navigate = useNavigate()
    
    const handleOnChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        const loginObj = {...user, [name]: value}
        setUser(loginObj)
    }
    const login = (e) => {
        e.preventDefault()
        const url = baseUrl + 'api/token/'
        const obj = {username: user.username, password:user.password}
        fetch(url,
            {method: 'POST', 
             headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(obj)
        })
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('access', data.access)
          localStorage.setItem('refresh', data.refresh)
          navigate(location?.state?.previousUrl ? location.state.previousUrl : '/customers')
          console.log(location)
        })
    }
  return (
    <div>
         <form id="customer" onSubmit={login}>
              <label htmlFor="username">Name</label>
              <input id="username" onChange={handleOnChange} name="username" type="text" className="m-2 px-2" value={user.username}/>
              <label htmlFor="password">Password</label>
              <input id="password" onChange={handleOnChange} name="password" type="password" className="m-2 px-2" value={user.password}/>
              <button className="bg-purple-500 hover:bg-teal-700 border-purple-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">Login</button>
        </form>
    </div>
  )
}
