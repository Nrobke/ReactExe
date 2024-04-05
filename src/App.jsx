import './App.css'
import Header from './components/Header';
import Employees from './pages/Employees';  
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Customers from './pages/Customers';
import Dictionary from './pages/Dictionary';
import Definitions from './pages/Definitions';
import NotFound from './components/NotFound';
import Customer from './pages/Customer';
import Login from './pages/Login';

function App() {

  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path='/employees' element={<Employees/>}/>
          <Route path='/customers' element={<Customers/>}/>
          <Route path='/customers/:id' element={<Customer/>}/>
          <Route path='/dictionary' element={<Dictionary/>}/>
          <Route path='/dictionary/:search' element={<Definitions/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/404' element={<NotFound/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Header>
    </BrowserRouter>
  )
  
}

export default App
