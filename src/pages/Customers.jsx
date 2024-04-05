import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../Shared";
import AddCustomer from "../components/AddCustomer";
import { useLocation } from 'react-router-dom'

function Customers() {
  const [customers, setCustomers] = useState([])
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  function toggleShow() {
    setShow(!show)
  }

  const url = baseUrl + 'api/customers'
  useEffect(() => {
    fetch(url,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access'),
      }
    })
    .then(response => {
      if(response.status === 401){
        navigate("/login", {
          state: {
            previousUrl: location.pathname
          }
        })
      }
     return response.json()
    })
    .then(data => {
      setCustomers(data.customers)
    })
  },[])

  const handleNewCustomer = (name, industry) =>{
    const data = {name: name, industry: industry}
    if(data.name !== '' && data.industry !== ''){
      fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + localStorage.getItem('access'),
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if(!response.ok){
          throw new Error("Something is went wrong")
        }
       return response.json()
      })
      .then(data => {
          toggleShow()
          setCustomers([...customers, data.customer])
      })
      .catch(e => {
        console.log(e)
      })
    }
    
  }

  return (
    <>
      <h2>Customers</h2>
      <ul>
      {customers ? customers.map(customer => {
        return <li key={customer.id}><Link to={"/customers/" + customer.id}>{customer.name}</Link></li>
      }) : null}
      </ul>
      <AddCustomer newCustomer={handleNewCustomer} show={show} toggleShow={toggleShow}/>
    </> 
  )
}

export default Customers