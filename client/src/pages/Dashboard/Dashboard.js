import React from 'react'
import styled from 'styled-components'

const Dashboard = () => {
  return (
    <Wrapper>
      <div className='hero'>
        <div className='intro'>
          <h1>Cyber Security</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            ratione minima placeat modi nostrum laudantium. Perferendis aperiam
            excepturi dolor, quia, voluptate placeat non distinctio numquam
            nostrum sint accusantium enim beatae optio eos accusamus maiores
            illum eius quam blanditiis mollitia! Quo modi officia labore
          </p>
        </div>
        <div className='image'></div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  .hero {
    padding: 1rem;
    display: grid;
    grid-template-columns: 60% 40%;
    align-items: center;
  }
  .intro h1 {
    font-size: 4rem;
  }
  .intro p {
    margin-top: 1rem;
    font-size: 2rem;
  }
  .signup {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }
  button {
    font-size: 2rem;
  }
`
export default Dashboard
