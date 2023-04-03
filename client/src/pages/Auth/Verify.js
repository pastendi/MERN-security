import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'
import Alert from '../../components/Alert'

const Verify = () => {
  const { showAlert, needVerify } = useAppContext()
  const navigate = useNavigate()
  const { verifyAccount } = useAppContext()
  const { verificationToken } = useParams()
  useEffect(() => {
    verifyAccount(verificationToken)
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    if (!needVerify) {
      navigate('/')
    }
    // eslint-disable-next-line
  }, [needVerify])
  return (
    <div>
      <h1>Problem fround:</h1>
      {showAlert && <Alert />}
    </div>
  )
}

export default Verify
