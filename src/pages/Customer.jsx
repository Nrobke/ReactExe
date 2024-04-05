import { Link, useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import NotFound from '../components/NotFound'
import { baseUrl } from "../Shared";

export default function Customer() {
  const [customer, setCustomer] = useState({});
  const [tempCustomer, setTempCustomer] = useState({});
  const [changed, setChanged] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState()
  const {id} = useParams()
  const navigate = useNavigate()
  const url = baseUrl + 'api/customers/'+ id

  useEffect(() => {
    if(!customer) return
    let equal = true
    if(tempCustomer.name !== customer.name || tempCustomer.industry !== customer.industry) equal = false;
    if(equal && !error) setChanged(false);
    else if(equal && error) setChanged(true);
  })


  useEffect(() =>{
    fetch(url,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access'),
      }})
    .then(response => {
      if(response.status === 404){
        setNotFound(true)
      }
      else if(response.status === 401) navigate("/login")

      if(!response.ok) throw new Error("something went wrong!")
      

      return response.json()
    })
    .then(data => {
      setCustomer(data.customer)
      setTempCustomer(data.customer)
      setError(undefined)
    })
    .catch(e => setError(e.message))
  }, [])

  const handleInputChange = (e) => {
    var name = e.target.name;
    const newObj = {...tempCustomer, [name]: e.target.value};
    setTempCustomer(newObj);
    setChanged(true)
  }

  function updateCustomer (e){
    e.preventDefault();
    fetch(url,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access')
      },
      body: JSON.stringify(tempCustomer)
    })
    .then(response => {
      if(response.status === 401){
        navigate("/login")
      }
      if(!response.ok){
        throw new Error("something went wrong")
      }
      return response.json()
    })
    .then(data => {
      setCustomer(data.customer)
      setTempCustomer(data.customer)
      setChanged(false)
      setError(undefined)
    })
    .catch(e => {
      setError(e.message)
    })
  }

  function handleDelete(){
    fetch(url,{method: 'DELETE', headers:{
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access')
    }})
    .then(response => {
      if(response.status === 401){
        navigate("/login")
      }
      if(!response.ok){
        throw new Error("something went wrong")
      }
      setError(undefined)
      navigate('/customers')
    })
    .catch(e => setError(e.message))
  }
  

  return (
    <>
      { notFound ? <NotFound/> :  
        customer ? (
          <div className="flex justify-center grid">
            <form id="customer" onSubmit={updateCustomer}>
              <p>Id: {customer.id}</p>
              <label htmlFor="name">Name</label>
              <input id="name" onChange={handleInputChange} name="name" type="text" className="m-2 px-2" value={tempCustomer.name}/>
              <label htmlFor="industry">Industry</label>
              <input id="industry" onChange={handleInputChange} name="industry" type="text" className="m-2 px-2" value={tempCustomer.industry}/>
            </form>
            
            {changed ? <>
              <button onClick={() => {
                setTempCustomer({...customer})
                setChanged(false)
              }}>Cancel</button> <button form="customer">Save</button>
            </> : null}
            <button className="bg-gray-500 p-2"  onClick={handleDelete}>delete</button>     
          </div>
        ) : null        
      }
       
      <Link to='/customers'>Go back</Link>
      
      {error ? <p>{error}</p> : null}
    </>
    
  )
}
