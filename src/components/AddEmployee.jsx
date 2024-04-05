import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function AddEmployee(props) {
  const [show, setShow] = useState(false);
  const [formObjs, setFormObjs] = useState({name: '', role: '', img: ''})

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    var name = e.target.name;

    const newObj = {...formObjs, [name]: e.target.value};
    setFormObjs(newObj);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.newEmployee(formObjs.name, formObjs.role, formObjs.img)
  }

  return (
    <>

      <button onClick={handleShow} className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
        + Add Employee
      </button>
      
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleOnSubmit} id="editform" className="w-full max-w-sm">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="name">
                Full Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                id="name"
                placeholder='John smith' 
                type="text" 
                value={formObjs.name}
                name="name"
                onChange={handleInputChange}/>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="role">
                Role
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="role" 
                placeholder='Manager'
                type="text"
                name="role"
                value={formObjs.role}
                onChange={handleInputChange}/>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="img">
                Image URL
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="img" 
                placeholder='www.google.com/images...'
                type="text"
                name="img"
                value={formObjs.img}
                onChange={handleInputChange}/>
            </div>
          </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} className="bg-slate-400 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded" form="editform">Close</button>
          <button onClick={handleClose} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" form="editform">Add</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddEmployee;