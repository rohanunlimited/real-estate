import React from 'react'

export default function Pagination({ postPerPage, totalPost, paginate, currentPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <>
      current page= {currentPage}
      <nav data-testid="navigation">

        {
          pageNumbers.map(e => <button key={e} onClick={() => paginate(e)}>{e}</button>)
        }
      </nav>
    </>
  )
}
