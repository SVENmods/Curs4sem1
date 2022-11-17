import logo from '../img/Logo.png'
import { useNavigate } from 'react-router-dom';
import NavTabs from '../UI/NavTabs';

const Nav = () => {

     const navigate = useNavigate()

     return ( 
          <nav>
               <div className="logo-container">
                    <img src={logo} alt="logo"></img>
               </div>
               <div className='controls-container'>
                    <NavTabs/>
               </div>
          </nav>
     );
}

export default Nav;