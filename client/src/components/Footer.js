import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <Wrapper>
      <p>All Rights Reserved. &copy;</p>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background-color: #64748b;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    color: white;
  }
`

export default Footer
