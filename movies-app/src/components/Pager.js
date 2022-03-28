import React from 'react'

const Pager = ({page,setPage}) => {
  return (
    <div className="pagination">
        <button onClick={() =>setPage(--page)}>&laquo;</button>
        <button className={`${page === 1 ? 'active': ''}`} onClick={() =>setPage(1)}>1</button>
        <button className={`${page === 2 ? 'active': ''}`} onClick={() =>setPage(2)}>2</button>
        <button className={`${page === 3 ? 'active': ''}`} onClick={() =>setPage(3)}>3</button>
        <button className={`${page === 4 ? 'active': ''}`} onClick={() =>setPage(4)}>4</button>
        <button className={`${page === 5 ? 'active': ''}`} onClick={() =>setPage(5)}>5</button>
        <button className={`${page === 6 ? 'active': ''}`} onClick={() =>setPage(6)}>6</button>
        <button className={`${page === 7 ? 'active': ''}`} onClick={() =>setPage(7)}>7</button>
        <button className={`${page === 8 ? 'active': ''}`} onClick={() =>setPage(8)}>8</button>
        <button className={`${page === 9 ? 'active': ''}`} onClick={() =>setPage(9)}>9</button>
        <button className={`${page === 10 ? 'active': ''}`} onClick={() =>setPage(10)}>10</button>
        <button onClick={() =>setPage(++page)}>&raquo;</button>
  </div>
  )
}

export default Pager