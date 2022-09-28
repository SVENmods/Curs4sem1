import logo from '../img/tg_image_1712143480.jpeg';
import { useNavigate } from 'react-router-dom';

const Nav = () => {

     const navigate = useNavigate()

     return ( 
          <nav>
               <div className="logo-container">
                    <img src={logo} alt="logo"></img>
               </div>
               <div className='controls-container'>
                    <div className="icons" onClick={() => navigate('/ticket')}>+</div>
                    <div className="icons" onClick={() => navigate('/')}>=</div>
               </div>
          </nav>
     );
}

export default Nav;