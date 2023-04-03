import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { FaTrashAlt } from 'react-icons/fa'
import styled from 'styled-components'
import ChangeGroup from './ChangeGroup'

const UserTable = ({ users }) => {
  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete This User',
      message: 'Are you sure to do delete this user?',
      buttons: [
        {
          label: 'Delete',
          // onClick: () => removeUser(id), // todo
        },
        {
          label: 'Cancel',
          onClick: () => alert('Click No'),
        },
      ],
    })
  }
  return (
    <Wrapper>
      {users.length === 0 ? (
        <p>No user found...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>s/n</th>
              <th>Username</th>
              <th>Email</th>
              <th>Group</th>
              <th>Change Group</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const { _id, username, email, group } = user
              return (
                <tr key={_id}>
                  <td>{index + 1}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{group}</td>
                  <td>
                    <ChangeGroup _id={_id} email={email} userGroup={group} />
                  </td>
                  <td>
                    <span className='delete'>
                      <FaTrashAlt
                        size={20}
                        color='red'
                        onClick={() => confirmDelete(_id)}
                      />
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  table {
    border-collapse: collapse;
    width: 100%;
    font-size: 1.4rem;

    thead {
      border-top: 2px solid var(--light-blue);
      border-bottom: 2px solid var(--light-blue);
    }

    th {
      border: 1px solid #eee;
    }

    th,
    td {
      vertical-align: top;
      text-align: left;
      padding: 8px;

      &.icons {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        > * {
          margin-right: 7px;
          cursor: pointer;
          vertical-align: middle;
          align-self: center;
        }
      }
    }

    tr {
      border-bottom: 1px solid #ccc;
    }

    tr:nth-child(even) {
      background-color: #fff;
    }
    tbody {
      tr:hover {
        // cursor: pointer;
        background-color: rgba(121, 136, 149, 0.3);
      }
    }
  }
  label {
    font-size: 1.4rem;
    font-weight: 500;
    margin: 0 5px;
  }
  .delete {
    cursor: pointer;
  }
`
export default UserTable
