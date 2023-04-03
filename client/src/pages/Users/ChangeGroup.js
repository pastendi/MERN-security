import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import styled from 'styled-components'
import { useAppContext } from '../../context/appContext'

const ChangeGroup = ({ _id, email, userGroup }) => {
  const [group, setGroup] = useState('')
  const { changeUserGroup, getUsers } = useAppContext()
  const changeGroup = async (e) => {
    e.preventDefault()
    if (userGroup !== group && group !== '') {
      changeUserGroup(email, group)
      getUsers()
    }
    setGroup('')
  }

  return (
    <Wrapper className='sort'>
      <form onSubmit={changeGroup}>
        <select value={group} onChange={(e) => setGroup(e.target.value)}>
          <option value=''>-- select --</option>
          <option value='member'>member</option>
          <option value='suspended'>suspended</option>
        </select>
        <button type='submit'>
          <FaCheck size={15} />
        </button>
      </form>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  select {
    font-size: 1.2rem;
    font-weight: 300;
    padding: 4px 8px;
    margin: 0 5px 0 0;
    border: none;
    border-bottom: 2px solid #777;
    outline: none;
  }
  button {
    display: inline-block;
    background: green;
    color: white;
    padding: 0.1rem 0.5rem;
    border: none;
    cursor: pointer;
  }
`

export default ChangeGroup
