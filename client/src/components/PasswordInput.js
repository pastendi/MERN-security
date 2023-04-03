import React, { useState } from 'react'
import styled from 'styled-components'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { global } from '../globalStyle'

const PasswordInput = ({ id, placeholder, value, onChange, name, onPaste }) => {
  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <Wrapper>
      <div>
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          required
          name={name}
          value={value}
          onChange={onChange}
          onPaste={onPaste}
        />
      </div>
      <div className='icon' onClick={togglePassword}>
        {showPassword ? (
          <AiOutlineEyeInvisible size={20} />
        ) : (
          <AiOutlineEye size={20} />
        )}
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #eee;
  border: none;
  outline: 2px solid dodgerblue;
  border-radius: ${global.radius};
  line-height: 2rem;
  padding: 2px 15px;
  margin: 8px 0;
  width: 100%;
  input {
    width: 100%;
    height: 100%;
    border: transparent;
    background: transparent;
    outline: transparent;
  }
  .icon {
    padding-top: 2px;
    cursor: pointer;
  }
`
export default PasswordInput
