import React from 'react'
import styled from 'styled-components'
import { BiUserCheck, BiUserMinus, BiUserX } from 'react-icons/bi'
import { FaUsers } from 'react-icons/fa'
import StatBox from '../../components/StatBox'

const Stat = ({ result }) => {
  const icon1 = <FaUsers size={40} color='#fff' />
  const icon2 = <BiUserCheck size={40} color='#fff' />
  const icon3 = <BiUserMinus size={40} color='#fff' />
  const icon4 = <BiUserX size={40} color='#fff' />
  return (
    <Wrapper>
      <h2>User statistics</h2>
      <div className='summary'>
        <StatBox
          icon={icon1}
          title={'Total Users'}
          count={result.total}
          bgColor={'dodgerblue'}
        />
        <StatBox
          icon={icon2}
          title={'Verified Users'}
          count={result.verified}
          bgColor={'green'}
        />
        <StatBox
          icon={icon3}
          title={'Unverified Users'}
          count={result.Unverified}
          bgColor={'gray'}
        />
        <StatBox
          icon={icon4}
          title={'Suspended Users'}
          count={result.suspended}
          bgColor={'crimson'}
        />
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .summary {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }
`

export default Stat
