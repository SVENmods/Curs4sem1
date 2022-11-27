import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'

const DeleteBlock = ({ ticket, documentId }) => {

  const { user, isAuthenticated, isLoading } = useAuth0();

  const deleteTicket = async () => {
    const response = await axios.delete(`http://localhost:8000/tickets/${documentId}`)
    const success = response.status === 200
    if (success) window.location.reload()
  }


  return (
    <div className="delete-block">
      {
        ticket.owner === user.name && (
          <div className="delete-icon" onClick={deleteTicket} id={ticket.owner}>⨯</div>
        )
      }
    </div>
  )
}

export default DeleteBlock;