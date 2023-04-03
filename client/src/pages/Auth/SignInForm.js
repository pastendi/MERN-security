import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Form, Title, Input, Button } from '../../utils/FormComponents'
import PasswordInput from '../../components/PasswordInput'
import { FcGoogle } from 'react-icons/fc'
import { useAppContext } from '../../context/appContext'
import Alert from '../../components/Alert'

const SignInForm = ({ isSignIn }) => {
  const {
    user,
    displayAlert,
    isLoggedIn,
    showAlert,
    twoFactor,
    setupUser,
    toggleModel,
    sendLoginCode,
  } = useAppContext()
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: '',
    password: '',
  })
  const handleLoginChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const forgotPassword = () => {
    toggleModel()
    navigate('/forgot-password')
  }
  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    const { username, password } = values
    if (!password || !username) {
      displayAlert()
      return
    }
    const userData = { username, password }
    setupUser({
      userData,
      endPoint: 'login',
    })
  }
  useEffect(() => {
    if (twoFactor) {
      setTimeout(() => {
        navigate(`/access-verification/${values.username}`)
        toggleModel()
        sendLoginCode(values.username)
      }, [2000])
    }
    // eslint-disable-next-line
  }, [twoFactor, navigate])
  useEffect(() => {
    if (isLoggedIn) {
      toggleModel()
      navigate('/')
    }
  }, [])
  return (
    <Wrapper isSignIn={isSignIn}>
      <Form onSubmit={handleLoginSubmit}>
        <Title>Sign in</Title>
        <div className='google-signIn'>
          <FcGoogle />
          <span>SignIn with Google</span>
        </div>
        <p className='or'>OR</p>
        {showAlert && <Alert />}
        <Input
          type='text'
          name='username'
          value={values.username}
          onChange={handleLoginChange}
          placeholder='Username or Email'
          required
        />
        <PasswordInput
          placeholder='Password'
          name='password'
          onChange={handleLoginChange}
          value={values.password}
        />
        <p className='forget-password' onClick={forgotPassword}>
          Forgot your password?
        </p>
        <Button className='sign-in-btn'>SignIn</Button>
      </Form>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) =>
    props.isSignIn !== true ? `transform: translateX(100%);` : null}

  .or {
    margin: 0.5rem 0;
  }
  .forget-password {
    color: #334155;
    font-weight: 400;
    font-size: 1rem;
    text-decoration: none;
    margin: 15px 0;
    cursor: pointer;
  }

  .sign-in-btn {
    background: green;
  }
  .google-signIn {
    cursor: pointer;
    margin-top: 1rem;
    padding: 0.6rem 0.8rem;
    font-size: 1rem;
    font-weight: 500;
    border-radius: ${global.radius};
    border: 1px solid black;
    display: flex;
    align-items: center;
    span {
      margin-left: 5px;
    }
  }
`

export default SignInForm
