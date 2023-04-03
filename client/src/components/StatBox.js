import styled from 'styled-components'

const StatBox = ({ bgColor, title, count, icon }) => {
  return (
    <Wrapper style={{ background: bgColor }}>
      <span className='stat-icon'>{icon}</span>
      <span className='stat-text'>
        <p>{title}</p>
        <h4>{count}</h4>
      </span>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 100%;
  height: 7rem;
  max-width: 22rem;
  margin: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  vertical-align: middle;
  flex-wrap: wrap;
  color: #fff;
  transform: translateY(0);
  transition: all 0.3s;
  .stat-icon {
    padding: 0 2rem;
    color: #fff;
  }
  .stat-text > * {
    color: #fff;
  }
`

export default StatBox
