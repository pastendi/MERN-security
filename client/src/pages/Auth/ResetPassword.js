import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import PasswordInput from '../../components/PasswordInput'
import PasswordValidator from '../../components/PasswordValidator'
import { global } from '../../globalStyle'
import { useAppContext } from '../../context/appContext'
import Alert from '../../components/Alert'

const ResetPassword = () => {
  const navigate = useNavigate()
  const {
    showAlert,
    success,
    passwordNotMatching,
    passwordValidity,
    passwordValidityError,
    resetPassword,
  } = useAppContext()
  const [values, setValues] = useState({ nPassword: '', cPassword: '' })
  const { resetToken } = useParams()
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { nPassword, cPassword } = values
    if (nPassword !== cPassword) {
      passwordNotMatching()
      return
    }
    if (!passwordValidity) {
      passwordValidityError()
      return
    }
    resetPassword(nPassword, resetToken)
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
        <h1>Reset Password...</h1>
        {showAlert && <Alert />}
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
export default ResetPassword
