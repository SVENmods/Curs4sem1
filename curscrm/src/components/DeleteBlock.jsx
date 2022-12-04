import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'

const DeleteBlock = ({ ticket, documentId }) => {

  const { user, isAuthenticated, isLoading } = useAuth0();

  const deleteTicket = async () => {
    const response = await axios.delete(`http://localhost:8000/tickets/${documentId}`)
    const success = response.status === 200
    if (success) window.location.reload()
  }

  if (user.sub === "google-oauth2|106171192680633205402") {
    return (
      <div className="delete-block">
        {
          (
            <div className="delete-icon" onClick={deleteTicket} id={ticket.owner}>
              <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15.5" cy="15.5" r="11.5" stroke="#FF3B51" stroke-width="2" />
                <path d="M11 20.1459L19.625 11.5209" stroke="#FF3B51" stroke-width="2" />
                <path d="M20 20.1459L11.375 11.5209" stroke="#FF3B51" stroke-width="2" />
              </svg>

            </div>
          )
        }
      </div>
    )
  }
  else {
    return (
      <div className="delete-block">
        {
          ticket.owner === user.name && (
            <div className="delete-icon" onClick={deleteTicket} id={ticket.owner}>
              <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15.5" cy="15.5" r="11.5" stroke="#FF3B51" stroke-width="2" />
                <path d="M11 20.1459L19.625 11.5209" stroke="#FF3B51" stroke-width="2" />
                <path d="M20 20.1459L11.375 11.5209" stroke="#FF3B51" stroke-width="2" />
              </svg>

            </div>
          )
        }
      </div>
    )
  }

}

export default DeleteBlock;