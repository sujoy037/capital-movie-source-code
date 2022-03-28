import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light fixed top'>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>
        <div className="container">
        <div className='logo'>CapitalMovies</div>
        <div className="navbar-nav">
            <ul className='navbar-nav mr-auto'>
                <li className="nav-item"><Link className="nav-link" to='/discover'>Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to='/discover/popular'>Popular</Link></li>
                <li className="nav-item"><Link className="nav-link" to='/discover/latest'>Latest</Link></li>
                <li className="nav-item"><Link className="nav-link disabled" to='/discover/favourites'>Favourites</Link></li>
                <li className="nav-item"><Link className="nav-link" to='/login'>Login</Link></li>
            </ul>
        </div>
        </div>    
    </nav>
  )
}

export default Navbar

