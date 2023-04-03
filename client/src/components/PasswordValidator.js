import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import { BsCheck2All } from 'react-icons/bs'
import { useAppContext } from '../context/appContext'

const PasswordValidator = ({ password }) => {
  const { setPasswordValidity } = useAppContext()
  const [uCase, setUCase] = useState(false)
  const [num, setNum] = useState(false)
  const [sChar, setSChar] = useState(false)
  const [passLength, setPassLength] = useState(false)

  const timesIcon = <FaTimes color='red' size={15} />
  const checkIcon = <BsCheck2All color='green' size={15} />

  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon
    }
    return timesIcon
  }
  const validator = () => {
    let count = 0
    // Check Lower and Uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUCase(true)
      count++
    } else {
      setUCase(false)
    }
    // Check for numbers
    if (password.match(/([0-9])/)) {
      setNum(true)
      count++
    } else {
      setNum(false)
    }
    // Check for special character
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSChar(true)
      count++
    } else {
      setSChar(false)
    }
    // Check for PASSWORD LENGTH
    if (password.length > 8) {
      setPassLength(true)
      count++
    } else {
      setPassLength(false)
    }
    if (count === 4) {
      setPasswordValidity(true)
    } else {
      setPasswordValidity(false)
    }
  }

  useEffect(() => {
    validator()
  }, [password])
  return (
    <Wrapper>
      <div className='req'>Password requirements</div>
      <ul className='checklist'>
        <li>
          <span className='indicator'>
            {switchIcon(uCase)}
            &nbsp; Lowercase & Uppercase
          </span>
        </li>
        <li>
          <span className='indicator'>
            {switchIcon(num)}
            &nbsp; Number (0-9)
          </span>
        </li>
        <li>
          <span className='indicator'>
            {switchIcon(sChar)}
            &nbsp; Special Character (!@#$%^&*)
          </span>
        </li>
        <li>
          <span className='indicator'>
            {switchIcon(passLength)}
            &nbsp; At least 8 Character
          </span>
        </li>
      </ul>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .req {
    font-weight: 600;
    margin-top: 0.5rem;
    text-decoration: underline;
  }
  .checklist {
    border: 1px solid lightblue;
    border-radius: ${global.radius};
    padding: 0.3rem;
  }
  .indicator {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: black;
    font-size: 0.8rem;
  }
`
export default PasswordValidator
