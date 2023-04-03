import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { global } from '../../globalStyle'
import { useAppContext } from '../../context/appContext'
import Alert from '../../components/Alert'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const { success, showAlert, forgotPassword } = useAppContext()
  const [email, setEmail] = useState('')
  const handleChange = (e) => {
    setEmail(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = email
    forgotPassword(data)
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
        <h2>Forgot Password?</h2>
        <p>Don't worry we got you</p>
        {showAlert && <Alert />}
        <input
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          placeholder='Email'
          required
        />
        <button type='submit'>Get Reset Email</button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 0 auto;
  width: 30vw;
  min-height: 60vh;
  padding: 1rem;
  form {
    padding-top: 6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  p {
    margin-top: 1rem;
  }
  input {
    margin-top: 1rem;
    width: 100%;
    border: none;
    outline: 2px solid dodgerblue;
    border-radius: ${global.radius};
    padding: 0.5rem;
    font-size: 1.2rem;
    line-height: 1.8rem;
  }
  button {
    cursor: pointer;
    margin-top: 1rem;
    display: block;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    background: dodgerblue;
    color: white;
    border-radius: ${global.radius};
    border: transparent;
  }
`
export default ForgotPassword
