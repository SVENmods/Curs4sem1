import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';


const Header = () => {

     const navigate = useNavigate()
     const { user, isAuthenticated, isLoading } = useAuth0();

     return (
          isAuthenticated && (
               <header className='d-flex justify-content-between align-items-center'>
                    <h1 className='mt-3'>We Done</h1>
                    <div className='profile-scope d-flex flex-row align-items-center' onClick={() => navigate('/profile')}>
                         <div className='mt-3'>
                              <h2>{user.given_name}</h2>
                         </div>
                         <div className='header-user ms-3'>
                              <img src={user.picture} alt={user.name} />
                         </div>
                    </div>
               </header>

          )

     );
}

export default Header;