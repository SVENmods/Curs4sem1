import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import AuthenticationButton from '../UI/AuthenticationButton';

const NavTabs = () => {

     const navigate = useNavigate()
     const { isAuthenticated } = useAuth0()

     return isAuthenticated ? (
          <div>
               <div className="icons" onClick={() => navigate('/ticket')}>+</div>
               <div className="icons" onClick={() => navigate('/')}>=</div>
               <div className="icons" onClick={() => navigate('/profile')}>Profile</div>
               <div className='icons' onClick={() => navigate('/statistics')}>Stat</div>
               <AuthenticationButton/>
          </div>
          
     )
     :(
          <div>
               <div className="icons" onClick={() => navigate('/')}>=</div>
               <AuthenticationButton/>
          </div>
          
     );
}

export default NavTabs;