import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { global } from '../../globalStyle'
import { toast } from 'react-toastify'
import { useAppContext } from '../../context/appContext'
import Alert from '../../components/Alert'

const TwoFactor = () => {
  const [code, setCode] = useState('')
  const { email } = useParams()
  const { isLoggedIn, showAlert, serverMessage, verifyWithCode } =
    useAppContext()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    verifyWithCode(email, code)
  }
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn])

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        {showAlert && <Alert />}
        <h3>Enter Verification Code</h3>
        <input
          type='text'
          name='code'
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder='Access code'
          required
        />
        <button type='submit' className='submit'>
          Verify
        </button>
        <p>Check your email for verification code</p>
        <div className='resend'>
          <button>Resend code</button>
        </div>
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
    margin-top: 0.5rem;
    font-size: 0.8rem;
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
    text-align: center;
  }
  .submit {
    cursor: pointer;
    width: 100%;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    display: block;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    background: dodgerblue;
    color: white;
    border-radius: ${global.radius};
    border: transparent;
  }
  .resend button {
    cursor: pointer;
    margin-top: 1rem;
    display: block;
    outline: none;
    border: none;
    font-size: 1.2rem;
    font-weight: bold;
    color: green;
  }
  .resend {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
  }
`

export default TwoFactor
