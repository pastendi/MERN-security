import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Stat from './Stat'
import { global } from '../../globalStyle'
import UserTable from './UserTable'
import Alert from '../../components/Alert'
import ReactPaginate from 'react-paginate'
import { useAppContext } from '../../context/appContext'
const Users = () => {
  const { users, getUsers, showAlert } = useAppContext()

  // Begin Pagination
  const itemsPerPage = 10
  const [itemOffset, setItemOffset] = useState(0)

  const endOffset = itemOffset + itemsPerPage
  const currentUsers = users.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(users.length / itemsPerPage)

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % users.length
    setItemOffset(newOffset)
  }
  const result = {
    total: users.length,
    verified: users.filter((x) => x.isVerified === true).length,
    Unverified: users.filter((x) => x.isVerified === false).length,
    suspended: users.filter((x) => x.group === 'suspended').length,
  }
  useEffect(() => {
    getUsers()
  }, [getUsers])
  // End Pagination
  return (
    <Wrapper>
      <Stat result={result} />
      <div className='table-title'>
        <h2>Users Info</h2>
      </div>
      {showAlert && <Alert />}
      <UserTable users={currentUsers} />
      <ReactPaginate
        breakLabel='...'
        nextLabel='Next'
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel='Prev'
        renderOnZeroPageCount={null}
        containerClassName='pagination'
        pageLinkClassName='page-num'
        previousLinkClassName='page-num'
        nextLinkClassName='page-num'
        activeLinkClassName='activePage'
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  padding: 1rem;
  .table-title {
    margin: 1rem auto;
    display: flex;
    justify-content: space-between;
  }
  .search {
    border: 1px solid #777;
    padding: 0.5rem 1rem;
    outline: none;
    background: white;
    border-radius: ${global.radius};
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      height: 100%;
      background: white;
    }
    input {
      display: block;
      font-size: 1.2rem;
      font-weight: 300;
      border: none;
      outline: none;
    }
  }
  .pagination {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;
    font-size: 1rem;
  }
  .pagination .page-num {
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 3px;
    font-weight: normal;
    color: #333;
    border: 1px solid #333;
    margin: 2px;
  }

  .pagination .page-num:hover {
    color: #fff;
    background-color: dodgerblue;
  }
  .activePage {
    color: #fff;
    background-color: dodgerblue;
    height: 100%;
  }
`
export default Users
