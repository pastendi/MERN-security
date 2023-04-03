import styled from 'styled-components'
import { global } from '../globalStyle'

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`

export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`

export const Input = styled.input`
  background-color: #eee;
  border-radius: ${global.radius};
  border: none;
  outline: 2px solid dodgerblue;
  line-height: 2rem;
  padding: 2px 15px;
  margin: 8px 0;
  width: 100%;
`

export const Button = styled.button`
  margin-top: 1rem;
  border-radius: 20px;
  border: 2px solid;
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 0.4rem 1.3rem;
  letter-spacing: 1px;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`
export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`
