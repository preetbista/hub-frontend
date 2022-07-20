import React, { useState, useEffect } from 'react'

import { CForm, CFormInput, CFormLabel, CButton } from '@coreui/react'

import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { editUser, getUser } from '../rest-api/User-RestAPI'

const EditUser = () => {
    let { id } = useParams()


    const navigate = useNavigate()
    const [user, setUser] = useState({})
  
    useEffect(() => {
      loadUser(id)
    }, [])

    const loadUser = (id) => {
        getUser(id)
          .then((res) => res.data)
          .then((rows) => {
            setUser(rows)
          })
          .catch((error) => {
            console.log(error)
          })
      }

      const handleChange = (event) => {
        const { name, value } = event.target
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }))
        console.log(user.email)
      }
    
      const handleSubmit = () => {
        user.role =null;
        editUser(user)
          .then((data) => {
            console.log('User added successfully')
            navigate('/users')
          })
          .catch((error) => {})
      }

      
 return (
    <div>
      <CForm>
        <div div className="mb-3">
          <CFormLabel>Name</CFormLabel>
          <CFormInput
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            placeholder="Martin"
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
      </CForm>
      <CButton color="primary" onClick={handleSubmit}>
        Submit
      </CButton>
    </div>
  )
}

export default EditUser