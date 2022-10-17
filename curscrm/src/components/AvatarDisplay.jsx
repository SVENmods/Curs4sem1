import blankAvatar from '../img/blank-profile-picture-973460__480.webp'

const AvatarDisplay = ({ticket}) => {
     return (
          <div className="avatar-container">
               <div className='img-container'>
               <img src={
                    ticket.avatar 
                    ? ticket.avatar 
                    : blankAvatar} alt={'photo of ' + ticket.owner}
               />
               </div>
               
          </div>
     );
}

export default AvatarDisplay;