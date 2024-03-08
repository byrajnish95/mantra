import React, { useState, useEffect } from 'react';
import './index.css'; // Import the CSS file

function App() {
  const [formDataValue, setFormDataValue] = useState({
    name: '',
    employeeID: '',
    city: '',
    gender: ''
});
const [outputValue, setOutputValue] = useState({});

const saveValues = () => {
    localStorage.setItem('customerData', JSON.stringify(formDataValue));
}

const getObjectValues = () => {
    return JSON.parse(localStorage.getItem('customerData')) || {};
}

// Function to handle form field changes
const handleChange = (event) => {
  const { name, value } = event.target;
  setFormDataValue(prevState => ({
      ...prevState,
      [name]: value
  }));
}

// Function to handle form submission
const handleSubmit = (event) => {
  event.preventDefault();
  saveValues();
  setOutputValue(formDataValue); 
}

useEffect(() => {
    const savedData = getObjectValues();
    setFormDataValue(savedData); 
    setOutputValue(savedData); 
}, []);

return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formDataValue.name} placeholder="Enter Name" onChange={handleChange} required /><br /><br />

            <label htmlFor="employeeID">Employee ID:</label>
            <input type="number" id="employeeID" name="employeeID" value={formDataValue.employeeID} placeholder="Enter Employee ID" onChange={handleChange} required />
            <label htmlFor="city">City:</label>
            <select id="city" name="city" value={formDataValue.city} onChange={handleChange} required>
                <option value="" disabled>Select City</option>
                <option value="New York">New York</option>
                <option value="London">London</option>
                <option value="Tokyo">Tokyo</option>
            </select>
            <label>Gender:</label>
            <input type="radio" id="male" name="gender" value="Male" checked={formDataValue.gender === 'Male'} onChange={handleChange} required />
            <label htmlFor="male">Male</label>
            <input type="radio" id="female" name="gender" value="Female" checked={formDataValue.gender === 'Female'} onChange={handleChange} required />
            <label htmlFor="female">Female</label>
            <button type="submit">Save</button>
        </form>
        <div>
            <h2>Customer Information</h2>
            <p>Name: {outputValue.name}</p>
            <p>Employee ID: {outputValue.employeeID}</p>
            <p>City: {outputValue.city}</p>
            <p>Gender: {outputValue.gender}</p>

        </div>
    </div>
);
}
export default App;
