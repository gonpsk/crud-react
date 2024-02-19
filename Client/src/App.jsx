import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'


function App() {
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [age, setage] = useState(0)
  const [position, setposition] = useState('')
  const [salary, setsalary] = useState(0)
  const [newsalary, setnewsalary] = useState(0)

  const [employeelist, setemployeelist] = useState([]);



  const getemployees = () => {
    axios.get('http://localhost:3001/employees').then((response) =>{ 
      setemployeelist(response.data)
    })

  }
 
  const addemployees = () => {
    // Check if any of the required fields are null or empty
    if (!firstname || !lastname || !age || !position || !salary) {
      alert('Please fill in all required fields.');
      return; // Stop execution if any field is missing
    }
  
    axios.post("http://localhost:3001/create", {
      firstname: firstname,
      lastname: lastname,
      age: age,
      position: position,
      salary: salary,
    }).then(() => {
      setemployeelist([
        ...employeelist,
        {
          firstname: firstname,
          lastname: lastname,
          age: age,
          position: position,
          salary: salary,
        },
      ]);
    });
  };

  const updateEmployeesalary = (id) => {
    axios.put("http://localhost:3001/update", { salary: newsalary, id: id }).then(
      (response) => {
        setemployeelist(
          employeelist.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  firstname: val.firstname,
                  lastname: val.lastname,
                  age: val.age,
                  position: val.position,
                  salary: val.salary,
                }
              : val;
          })
        );
      }
    );
  };
    
  const deleteEmployee = (id) => {
    // Display a confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
  
    // If the user confirms, proceed with the deletion
    if (confirmDelete) {
      axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
        setemployeelist(
          employeelist.filter((val) => {
            return val.id !== id;
          })
        );
      });
    }
  };   

   



  




  return (
    <div className="App container">
      <h1>Employees Infomation</h1>
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              FirstName:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              onChange={(event) => {
                setfirstname(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age">Lastname:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter lastname"
              onChange={(event) => {
                setlastname(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="country">Age:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter age"
              onChange={(event) => {
                setage(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Position">Position:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Position"
              onChange={(event) => {
                setposition(event.target.value)
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Wage">Salary:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Salary"
              onChange={(event) => {
                setsalary(event.target.value)
              }}
            />
          </div>
          <button onClick={addemployees} class="btn btn-success">
            Add Employee
          </button>
        </form>
      </div>
      <hr />
      <div className="employees">
        <button class="btn btn-primary" onClick={getemployees}>
          Show Employees
        </button>
        <br />
        <br />
        {employeelist.map((val, key) => {
          return (
            <div className="employee card">
              <div className="card-body text-left">
                <p className="card-text">Name: {val.firstname}</p>
                <p className="card-text">lastname: {val.lastname}</p>
                <p className="card-text">Age: {val.age}</p>
                <p className="card-text">Position: {val.position}</p>
                <p className="card-text">salary: {val.salary}</p>
                <div className="d-flex">
                  <input
                    className="form-control"
                    style={{ width: "300px" }}
                    type="number"
                    placeholder="15000..."
                    onChange={(event) => {
                      setnewsalary(event.target.value)
                    }}
                  />
                  <button className="btn btn-warning" onClick={() => {updateEmployeesalary(val.id)}}>Update</button>

                  <button className="btn btn-danger" onClick={() => {deleteEmployee(val.id)}}>Delete</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
