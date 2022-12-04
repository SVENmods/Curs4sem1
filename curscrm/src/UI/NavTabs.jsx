import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import AuthenticationButton from '../UI/AuthenticationButton';

const NavTabs = () => {

     const navigate = useNavigate()
     const { isAuthenticated, user } = useAuth0()

     return isAuthenticated ? (
          <div>
               <div className="icons" onClick={() => navigate('/ticket')}>
                    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M5 11H19" stroke="#CCD2E3" strokeWidth="2" strokeLinecap="round" />
                         <path d="M12 4L12 18" stroke="#CCD2E3" strokeWidth="2" strokeLinecap="round" />
                    </svg>
               </div>
               <div className="icons" onClick={() => navigate('/')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M5 12.7596C5 11.4019 5 10.723 5.27446 10.1262C5.54892 9.52949 6.06437 9.08769 7.09525 8.20407L8.09525 7.34693C9.95857 5.7498 10.8902 4.95123 12 4.95123C13.1098 4.95123 14.0414 5.7498 15.9047 7.34693L16.9047 8.20407C17.9356 9.08769 18.4511 9.52949 18.7255 10.1262C19 10.723 19 11.4019 19 12.7596V17C19 18.8856 19 19.8284 18.4142 20.4142C17.8284 21 16.8856 21 15 21H9C7.11438 21 6.17157 21 5.58579 20.4142C5 19.8284 5 18.8856 5 17V12.7596Z" stroke="#CCD2E3" strokeWidth="2" />
                         <path d="M14.5 21V16C14.5 15.4477 14.0523 15 13.5 15H10.5C9.94772 15 9.5 15.4477 9.5 16V21" stroke="#CCD2E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
               </div>
               {
                    user.sub == "google-oauth2|106171192680633205402" && (
                         <div className='icons' onClick={() => navigate('/statistics')}>
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <circle cx="10" cy="10" r="9" stroke="#CCD2E3" strokeWidth="2" strokeLinecap="round" />
                                   <path d="M18 8L10 10" stroke="#CCD2E3" strokeWidth="2" strokeLinecap="round" />
                                   <path d="M10 10L3 5" stroke="#CCD2E3" strokeWidth="2" strokeLinecap="round" />
                              </svg>
                         </div>
                    )
               }
               <AuthenticationButton />
          </div>

     )
          : (
               <div>
                    <div className="icons" onClick={() => navigate('/')}>
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 12.7596C5 11.4019 5 10.723 5.27446 10.1262C5.54892 9.52949 6.06437 9.08769 7.09525 8.20407L8.09525 7.34693C9.95857 5.7498 10.8902 4.95123 12 4.95123C13.1098 4.95123 14.0414 5.7498 15.9047 7.34693L16.9047 8.20407C17.9356 9.08769 18.4511 9.52949 18.7255 10.1262C19 10.723 19 11.4019 19 12.7596V17C19 18.8856 19 19.8284 18.4142 20.4142C17.8284 21 16.8856 21 15 21H9C7.11438 21 6.17157 21 5.58579 20.4142C5 19.8284 5 18.8856 5 17V12.7596Z" stroke="#CCD2E3" strokeWidth="2" />
                              <path d="M14.5 21V16C14.5 15.4477 14.0523 15 13.5 15H10.5C9.94772 15 9.5 15.4477 9.5 16V21" stroke="#CCD2E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                         </svg>
                    </div>
                    <AuthenticationButton />
               </div>

          );
}

export default NavTabs;