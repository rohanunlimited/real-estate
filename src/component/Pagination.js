import React from 'react'

export default function Pagination({postPerPage, totalPost,paginate}) {
    const pageNumbers = [];
    for(let i=1; i <= Math.ceil(totalPost/postPerPage);i++){
        pageNumbers.push(i)
    }
  return (
    <nav>
        {
            pageNumbers.map(e=><button key={e} onClick={()=> paginate(e)}>{e}</button>)
        }
    </nav>
  )
}
