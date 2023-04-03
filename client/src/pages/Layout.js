import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Model from './Auth/Model'
import { useAppContext } from '../context/appContext'

const Layout = () => {
  const { model } = useAppContext()
  return (
    <Wrapper>
      {model && <Model />}
      <Header />
      <div className='dynamic'>
        <Outlet />
      </div>
      <Footer />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .dynamic {
    min-height: 82vh;
  }
`

export default Layout
