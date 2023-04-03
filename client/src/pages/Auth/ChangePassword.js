import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import PasswordInput from '../../components/PasswordInput'
import PasswordValidator from '../../components/PasswordValidator'
import { global } from '../../globalStyle'
import { useAppContext } from '../../context/appContext'
import Alert from '../../components/Alert'

const ChangePassword = () => {
  const {
    success,
    showAlert,
    displayAlert,
    passwordNotMatching,
    passwordValidity,
    passwordValidityError,
    changePassword,
  } = useAppContext()
  const navigate = useNavigate()
  const [values, setValues] = useState({
    oPassword: '',
    nPassword: '',
    cPassword: '',
  })
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { oPassword, nPassword, cPassword } = values
    if (!oPassword || !nPassword || !cPassword) {
      displayAlert()
      return
    }
    if (nPassword !== cPassword) {
      passwordNotMatching()
      return
    }
    if (!passwordValidity) {
      passwordValidityError()
      return
    }
    changePassword(oPassword, nPassword)
  }
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }, [success, navigate])
  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <h1>Change Password</h1>
        {showAlert && <Alert />}
        <PasswordInput
          placeholder='Old Password'
          name='oPassword'
          value={values.oPassword}
          onChange={handleChange}
        />
        <PasswordInput
          placeholder='New Password'
          name='nPassword'
          value={values.nPassword}
          onChange={handleChange}
        />
        <PasswordInput
          placeholder='Confirm Password'
          name='cPassword'
          value={values.cPassword}
          onChange={handleChange}
        />
        <PasswordValidator password={values.nPassword} />
        <button type='submit'>Reset Password</button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30vw;
  min-height: 60vh;
  padding: 1rem;
  h1 {
    margin-bottom: 3rem;
  }
  button {
    cursor: pointer;
    margin-top: 1rem;
    display: block;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    background: green;
    color: white;
    border-radius: ${global.radius};
    border: transparent;
  }
`
export default ChangePassword
