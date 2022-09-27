import logo from '../img/tg_image_1712143480.jpeg';

const Nav = () => {
     return ( 
          <nav>
               <div className="logo-container">
                    <img src={logo} alt="logo" width={'25px'}></img>
               </div>
          </nav>
     );
}

export default Nav;