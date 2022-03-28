import React from 'react'

const pgs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

const Pager = ({ page, setPage }) => {
  return (
    <div className="pagination">
      <button className='btn btn-secondary text-light' onClick={() => 1 < page ? setPage(--page) : null}>&laquo;</button>
      {
        pgs.map((num, i) => {
          return (
            <button className={`btn ${page === num ? 'active' : ''}`} onClick={() => setPage(num)}>{num}</button>
          )
        })
      }

      <button className='btn btn-secondary text-light' onClick={() => pgs.length > page ? setPage(++page) : null}>&raquo;</button>
    </div>
  )
}

export default Pager