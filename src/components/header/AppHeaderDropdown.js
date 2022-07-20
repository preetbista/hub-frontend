import React from 'react'
import {
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { FaHouseUser, FaUnlock } from 'react-icons/fa'
import { clearToken } from 'src/app/auth/AuthUtil'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {

  const navigate = useNavigate()

  const handleLogout = () => {
    console.log("Handling log out")
      clearToken()
      navigate('/login')
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <FaHouseUser></FaHouseUser>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>

          <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        
        <CDropdownItem >

        <FaUnlock onClick = {handleLogout}>   </FaUnlock>
          <label  onClick = {handleLogout}> Sign Out </label> 
         
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
