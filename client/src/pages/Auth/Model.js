import React, { useState } from 'react'
import styled from 'styled-components'
import { Title, GhostButton } from '../../utils/FormComponents'
import { GrFormClose } from 'react-icons/gr'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import { useAppContext } from '../../context/appContext'

const Model = () => {
  const { toggleModel, isSignIn, setModelOption } = useAppContext()
  return (
    <Wrapper>
      <div className='model'>
        <div className='close-btn' onClick={toggleModel}>
          <span>
            <GrFormClose />
          </span>
        </div>
        <SignUpForm isSignIn={isSignIn} />

        <SignInForm isSignIn={isSignIn} />

        <OverlayContainer isSignIn={isSignIn}>
          <div className={`overlay ${isSignIn ? 'shift-50' : 'shift-100'}`}>
            <LeftOverlayPanel signinIn={isSignIn}>
              <Title>Welcome Back!</Title>
              <Paragraph>
                To keep connected with us please login with your personal info
              </Paragraph>
              <GhostButton onClick={() => setModelOption(true)}>
                SignIn
              </GhostButton>
            </LeftOverlayPanel>
            <RightOverlayPanel isSignIn={isSignIn}>
              <Title>Hello, Friend!</Title>
              <Paragraph>
                Enter Your personal details and start journey with us
              </Paragraph>
              <GhostButton onClick={() => setModelOption(false)}>
                SignUp
              </GhostButton>
            </RightOverlayPanel>
          </div>
        </OverlayContainer>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2000;
  background-color: #000000a7;
  display: flex;
  justify-content: center;
  align-items: center;

  .model {
    width: 800px;
    min-height: 600px;
    background: white;
    position: relative;
    z-index: 5000;
    overflow: hidden;
    border-radius: 1.3rem;
    box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
      0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
  }
  .close-btn {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    cursor: pointer;
    z-index: 7000;
    span {
      color: crimson;
      font-size: 3rem;
      font-weight: bolder;
    }
  }

  .overlay {
    background: green;
    background: -webkit-linear-gradient(to right, dodgerblue, green);
    background: linear-gradient(to right, dodgerblue, green);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -200%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }
  .shift-50 {
    transform: translateX(50%);
  }
  .shift-100 {
    transform: translateX(100%);
  }
`

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${(props) =>
    props.isSignIn !== true ? `transform: translateX(-100%);` : null}
`
const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`

const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${(props) => (props.isSignIn !== true ? `transform: translateX(0);` : null)}
`

const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${(props) => (props.isSignIn !== true ? `transform: translateX(20%);` : null)}
`

const Paragraph = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`
export default Model
