import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { logout } from '../api/inbdex'

const Navbar = ({ user, handleReload }) => {

  const handleLogout = async () => {
    await logout()
    handleReload()
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-light fixed top'>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="container">
        <div className='logo h4'>Capital Movies</div>
        <div className="navbar-nav">
          <ul className='navbar-nav mr-auto'>
            {/* <li className="nav-item"><Link className="nav-link" to='/discover'>Home</Link></li> */}
            <li className="nav-item"><NavLink className="nav-link" activeClassName="nav-active" to='/discover/popular'>Popular</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" activeClassName="nav-active" to='/discover/latest'>Latest</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" activeClassName="nav-active" to='/discover/favourites'>Favourites</NavLink></li>
            {
              user ?
                <>
                  <li className="nav-item">
                    <div className="nav-link text-danger" >
                      <b>
                        {/* {user.username} */}
                        <div  style={{ cursor: "pointer" }} onClick={handleLogout} >
                          Logout
                        </div>
                      </b>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="nav-link text-info" >
                      <b>
                        {/* {user.username} */}
                        <div style={{ cursor: "pointer" }} onClick={handleLogout} >
                          {user.username}
                        </div>
                        {/* <div style={{ cursor: "pointer" }} onClick={handleLogout} >
                          {user.email}
                        </div> */}
                      </b>
                    </div>
                  </li>
                </>
                :
                <li className="nav-item"><Link className="nav-link" to='/login'>Login</Link></li>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

