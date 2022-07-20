import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { deleteUser, listUser } from '../rest-api/User-RestAPI'
import { NavLink } from 'react-router-dom'
import { FaTrashAlt, FaPen } from 'react-icons/fa'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
const ViewUser = () => {
  const [rows, setRows] = useState([])

  const [deleteModal, setDeleteModal] = useState({
    visible: false,
    id: '',
  })

  useEffect(() => {
    loadUser()
  }, [])

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: 'Address',
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: 'Age',
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div>
          <NavLink to={`/users/edit/${row.id}`}>
            <FaPen />
          </NavLink>
          &nbsp; &nbsp;
          <FaTrashAlt onClick={() => setDeleteModal({ visible: true, id: row.id })} />
        </div>
      ),
    },
  ]

  const handleDelete = (id) => {
    console.log('Deleting users ' + id)
    deleteUser(id)
      .then((res) => {
        console.log('User deleted successfully')
        window.location.reload(false)
      })
      .catch((error) => {
        console.log('User deletion failed')
      })
  }
  const loadUser = () => {
    listUser()
      .then((res) => res.data)
      .then((rows) => {
        setRows(rows)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <DataTable striped columns={columns} data={rows} pagination />

      <CModal visible={deleteModal.visible} onClose={() => setDeleteModal({ visible: false })}>
        <CModalHeader>
          <CModalTitle>Deletion Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Deleted user are lost permanently. <br />
          Are you sure , you want to delete user ?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary"
           onClick={() => setDeleteModal({ visible: false })}
           >
            Cancle
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
              setDeleteModal({ visible: false })
              handleDelete(deleteModal.id)
            }}
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default ViewUser