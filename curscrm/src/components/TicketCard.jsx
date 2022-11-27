import { Link } from 'react-router-dom'
import PriorityDisplay from './PriorityDisplay'
import ProgressDisplay from './ProgressDisplay'
import StatusDisplay from './StatusDisplay'
import AvatarDisplay from './AvatarDisplay'
import DeleteBlock from './DeleteBlock'
import RateDisplay from './RateDisplay'
import { useAuth0 } from '@auth0/auth0-react'

const TicketCard = ({ color, ticket, title }) => {


  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="ticket-card">
      <div className="ticket-color" style={{ backgroundColor: color }}></div>
      <Link to={`/ticket/${ticket.documentId}`} id="link">
        <h3>{title}</h3>
        <AvatarDisplay ticket={ticket} />
        <StatusDisplay status={ticket.status} />
        {/* <PriorityDisplay priority={Number(ticket.priority)} /> */}
        <RateDisplay rate={Number(ticket.sumRate)} />
        <ProgressDisplay progress={Number(ticket.progress)} />
      </Link>
      {
        isAuthenticated && (
          <DeleteBlock ticket={ticket} documentId={ticket.documentId} />
        )
      }

    </div>
  )
}

export default TicketCard