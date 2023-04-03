import React, { useState } from 'react'
import styled from 'styled-components'
import { global } from '../globalStyle'
import { FaUserCircle, FaUsers } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import { MdOutlineSecurity } from 'react-icons/md'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Alert from './Alert'

const Header = () => {
  const {
    user,
    verificationSent,
    needVerify,
    toggleModel,
    setModelOption,
    sendVerificationLink,
    logoutUser,
  } = useAppContext()
  const navigate = useNavigate()
  const [toggle, setToggle] = useState(false)
  const userOptionToggle = async () => {
    setToggle((toggle) => setToggle(!toggle))
  }
  const changePassword = () => {
    userOptionToggle()
    navigate('/change-password')
  }
  const getUsers = () => {
    userOptionToggle()
    navigate('/users')
  }
  const loginClicked = () => {
    setModelOption(true)
    toggleModel()
  }
  const logout = () => {
    logoutUser()
    userOptionToggle()
    navigate('/')
  }
  return (
    <Wrapper>
      <nav>
        <div className='forum-title'>
          <p className='title' onClick={() => navigate('/')}>
            Security Forum
          </p>
          {needVerify && (
            <div>
              Account created successfully. To verify your account{' '}
              <span
                className='verification-link'
                onClick={sendVerificationLink}
              >
                click here
              </span>
              {verificationSent && <Alert />}
            </div>
          )}
        </div>
        {user && user.username ? (
          <div className='user'>
            <div className='profile' onClick={userOptionToggle}>
              <span>Hi {user.username}</span>
              <IoMdArrowDropdown />
            </div>
            {toggle && (
              <ul>
                {user.group === 'admin' && (
                  <li onClick={getUsers}>
                    <FaUsers />
                    <span className='option'>Users</span>
                  </li>
                )}
                <li onClick={changePassword}>
                  <MdOutlineSecurity />
                  <span className='option'>Change password</span>
                </li>
                <li onClick={logout}>
                  <BiLogOut />
                  <span className='option'>Logout</span>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className='btn login' onClick={loginClicked}>
            <FaUserCircle />
            <span>Login</span>
          </div>
        )}
      </nav>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background: ${global.navColor};
  nav {
    height: 4rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: ${global.radius};
    box-shadow: 0px 0px 0px 0px rgb(0 0 0 / 20%),
      0px 5px 10px 0px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 12%);
  }
  .forum-title {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title {
    font-size: 2rem;
    margin-right: 2rem;
  }
  .verification-link {
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }
  .login {
    font-size: 1.2rem;
    background: #64748b;
  }
  .login span {
    margin-left: 0.5rem;
  }
  verification-link .user {
    position: relative;
  }
  .profile {
    background: #64748b;
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    color: white;
    font-weight: 500;
    border-radius: ${global.radius};
    cursor: pointer;
  }
  .option {
    margin-left: 0.5rem;
  }
  .user {
    position: relative;
  }
  .user ul {
    background: #64748b;
    border-radius: ${global.radius};
    position: absolute;
    right: 0;
    top: 2.7rem;
    width: 250px;
    padding: 1rem;
    z-index: 10000;
  }
  li {
    display: flex;
    border-radius: ${global.radius};
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    align-items: center;
    padding: 0.7rem 0.5rem;
    color: white;
  }
  li:hover {
    background: ${global.navColor};
  }
`

export default Header
