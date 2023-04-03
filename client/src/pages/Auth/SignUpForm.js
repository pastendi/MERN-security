import React, { useState, useEffect } from 'react'
import { Form, Title, Input, Button } from '../../utils/FormComponents'
import PasswordInput from '../../components/PasswordInput'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import PasswordValidator from '../../components/PasswordValidator'
import { useAppContext } from '../../context/appContext'
import Alert from '../../components/Alert'
import { useNavigate } from 'react-router-dom'

const SignUpForm = ({ isSignIn }) => {
  const navigate = useNavigate()
  const {
    showAlert,
    passwordNotMatching,
    passwordValidity,
    passwordValidityError,
    displayAlert,
    setupUser,
    user,
    toggleModel,
  } = useAppContext()
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    cPassword: '',
  })
  const handleRegisterChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    const { username, password, cPassword, email } = values
    if (!username || !password || !cPassword || !email) {
      displayAlert()
      return
    }
    if (password !== cPassword) {
      passwordNotMatching()
      return
    }
    if (!passwordValidity) {
      passwordValidityError()
      return
    }
    const userData = { username, email, password }
    setupUser({
      userData,
      endPoint: 'register',
    })
  }
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        toggleModel()
        navigate('/')
      }, 2000)
    }
    // eslint-disable-next-line
  }, [user, navigate])
  return (
    <Wrapper isSignIn={isSignIn}>
      <Form onSubmit={handleRegisterSubmit}>
        <Title>Create Account</Title>
        {showAlert && <Alert />}
        <Input
          type='text'
          placeholder='Username'
          name='username'
          onChange={handleRegisterChange}
          value={values.username}
          required
        />
        <Input
          type='email'
          placeholder='Email'
          name='email'
          onChange={handleRegisterChange}
          value={values.email}
          required
        />
        <PasswordInput
          id={'password'}
          placeholder='Password'
          name='password'
          onChange={handleRegisterChange}
          value={values.password}
        />
        <PasswordInput
          id={'cPassword'}
          placeholder='Confirm Password'
          name='cPassword'
          onChange={handleRegisterChange}
          value={values.cPassword}
        />
        <div className='validator'>
          <PasswordValidator password={values.password} />
          <div className='capcha'>Capcha</div>
        </div>

        <Button className='sign-up-btn'>Sign Up</Button>
      </Form>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    props.isSignIn !== true
      ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  `
      : null}
  .sign-up-btn {
    background: dodgerblue;
  }
  .validator {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`
export default SignUpForm
