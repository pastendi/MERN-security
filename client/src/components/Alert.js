import React from 'react'
import { useAppContext } from '../context/appContext'
import styled from 'styled-components'
import { global } from '../globalStyle'

const Alert = () => {
  const { alertType, alertText } = useAppContext()
  return (
    <Wrapper>
      <div className={`alert alert-${alertType}`}>{alertText}</div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  margin-top: 0.5rem;
  .alert {
    padding: 0.375rem 0.75rem;
    margin-bottom: 1rem;
    border-color: transparent;
    border-radius: ${global.radius};
  }
  .alert-danger {
    color: crimson;
    background: #fce8e6;
  }
  .alert-success {
    color: green;
    background: lightgreen;
  }
`
export default Alert
