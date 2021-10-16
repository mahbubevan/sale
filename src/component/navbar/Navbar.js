import {Link} from 'react-router-dom'
import { useLocation } from 'react-router'

export default function Navbar(){
    let location = useLocation()
    let currentPath = location.pathname.replace('/','').trim()
    
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Rainbow Fashion</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <Link className={currentPath === 'customer' ? 'nav-link active' : 'nav-link'} to='/customer'>Customer</Link>
                </li>
                <li className="nav-item">
                  <Link className={currentPath === 'product' ? 'nav-link active' : 'nav-link'} to='/product'>Product</Link>
                </li>
                <li className="nav-item">
                  <Link className={currentPath === 'supplier' ? 'nav-link active' : 'nav-link'} to='/supplier'>Supplier</Link>
                </li>
                <li className="nav-item">
                  <Link className={currentPath === 'sale' ? 'nav-link active' : 'nav-link'} to='/sale'>Sale</Link>
                </li>                
              </ul>
            </div>
          </div>
        </nav>
    )
}