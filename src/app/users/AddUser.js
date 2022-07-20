import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CForm, CFormLabel, CFormInput, CButton, CFormSelect } from '@coreui/react'
import { addUser } from '../rest-api/User-RestAPI'
import listRole from '../rest-api/Role-api'

const AddUser = () => {
  const navigate = useNavigate()

  const roleDropDown = () => {
    const rolesOption = roles.map(item => 
      <option key={item} value={item}>{item.name}</option>
    );
    return rolesOption;
  };

  const loadRoles = () => {
    listRole()
      .then((res) => res.data)
      .then((rows) => {
        setRoles(rows)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const [user, setUser] = useState({
    username: '',
    password: '',
    fullName: '',
    address: '',
    age:''
  })

  const [roles, setRoles] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    addUser(user).then( data => {
    console.log("User Added Successfully"); 
    navigate("/dashboard")
  }).catch( error  => {
    console.log(error); 
    console.log("Error when adding user");
  })
  }

  useEffect(() => {
    loadRoles()
  }, [])
  return (
    <div>
      <CForm>
        <div className="mb-3">
          <CFormLabel>Email address</CFormLabel>
          <CFormInput
            type="email"
            placeholder="name@example.com"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <CFormLabel>Password</CFormLabel>
          <CFormInput
            type="password"
            placeholder="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <CFormLabel>Name</CFormLabel>
          <CFormInput
            type="text"
            placeholder="Cena"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <CFormLabel>Address</CFormLabel>
          <CFormInput
            type="text"
            placeholder="Kathmandu"
            name="address"
            value={user.address}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <CFormLabel>Age</CFormLabel>
          <CFormInput
            type="number"
            placeholder="Kathmandu"
            name="age"
            value={user.age}
            onChange={handleChange}
          />
        </div>

<div>
  <CFormLabel>
    Role
  </CFormLabel>
<CFormSelect aria-label="Default select example">
                <option>Select Role</option>
                {roleDropDown()}
              </CFormSelect>
</div>



        <CButton color="primary" onClick={handleSubmit}> Submit</CButton>
      </CForm>
    </div>
  )
}

export default AddUser
