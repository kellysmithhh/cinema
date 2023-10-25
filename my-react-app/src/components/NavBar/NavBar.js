import { Link } from 'react-router-dom';
import './NavBar.css';
  
function NavBar() {

    return (
        <div className="NavBar">
            <div className="navbar-flexbox">
                <div className="navbar-body">
                    <h1>
                        <Link to = "/">
                            <h1>Cinema E-Booking</h1>
                        </Link>
                    </h1>
                    

            
                <div className="navbar-buttons">
                        <ul>
                        <li>
                                <Link to = "/Browse">Browse</Link>
                            </li>
                            <li>
                                <Link to = "/LoginPage">Sign In</Link>
                            </li>
                        
                        </ul>
                    </div>
                </div> 
                
            </div>
        </div>
    );

}

export default NavBar;