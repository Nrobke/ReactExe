import Employee from '../components/Employee'
import { useState } from 'react';
import AddEmployee from '../components/AddEmployee';
import { v4 as uuidv4 } from 'uuid';
import EditEmployee from '../components/EditEmployee';
import Header from '../components/Header';

function Employees() {

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Natnael",
      role: "Developer",
      img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 2,
      name: "John",
      role: "Intern",
      img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    },
    {
      id: 3,
      name: "Mike",
      role: "Developer",
      img: "https://images.pexels.com/photos/4120661/pexels-photo-4120661.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    },    
    {
      id: 4,
      name: "Natnael",
      role: "Developer",
      img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 5,
      name: "John",
      role: "Intern",
      img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    },
    {
      id: 6,
      name: "Mike",
      role: "Devveloper",
      img: "https://images.pexels.com/photos/4120661/pexels-photo-4120661.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    }
])

function updateEmployee(id, newName, newRole){
  const updatedEmployees = employees.map((employee) => {
    if(id === employee.id){
      return {...employee, name: newName, role: newRole}
    }
    return employee;

  });

  setEmployees(updatedEmployees)
}

function newEmployee(name, role, img){
  const employee = {
    id: uuidv4(),
    name: name,
    role:role,
    img: img
  };

  setEmployees(prevEmployees => [...prevEmployees, employee]);
};

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {employees.map((employee) => {
          const editEmployee = <EditEmployee 
                                  id={employee.id}
                                  name={employee.name} 
                                  role={employee.role} 
                                  updateEmployee={updateEmployee}
                                />;
          return(
            <Employee 
              key={employee.id} 
              id={employee.id}
              name={employee.name} 
              role={employee.role} 
              img={employee.img} 
              editEmployee={editEmployee}
            />
          );        
        })}
      </div>  
      <AddEmployee newEmployee={newEmployee}/>  
    </div>
  )
}

export default Employees;
