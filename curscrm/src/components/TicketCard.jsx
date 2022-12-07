import { Link } from 'react-router-dom'
import PriorityDisplay from './PriorityDisplay'
import ProgressDisplay from './ProgressDisplay'
import StatusDisplay from './StatusDisplay'
import AvatarDisplay from './AvatarDisplay'
import DeleteBlock from './DeleteBlock'
import RateDisplay from './RateDisplay'
import { useAuth0 } from '@auth0/auth0-react'

const TicketCard = ({ color, ticket, title, profilePage }) => {


  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="ticket-wrapper">
      <div className="ticket-color"></div> {/* style={{ backgroundColor: color }} */}
      <div className='divider'></div>
      <div className="ticket-card p-4">
        <div id="link">
          <div className='ticket-card-header'>
            <AvatarDisplay ticket={ticket} />
            <div className="d-flex flex-column align-items-start ms-2">
              <span className='ticket-card-header__name'>{ticket.owner}</span>
              <RateDisplay rate={Number(ticket.sumRate)} />
            </div>
            <Link to={`/ticket/${ticket.documentId}`} className="go-to d-flex justify-content-center align-items-center ms-5">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="1">
                  <path d="M7.16789 5.95711C6.77737 5.56658 6.77737 4.93342 7.16789 4.54289C7.55842 4.15237 8.19158 4.15237 8.58211 4.54289L7.16789 5.95711ZM13.125 10.5L13.8321 9.79289L14.5392 10.5L13.8321 11.2071L13.125 10.5ZM8.58211 16.4571C8.19158 16.8476 7.55842 16.8476 7.16789 16.4571C6.77737 16.0666 6.77737 15.4334 7.16789 15.0429L8.58211 16.4571ZM8.58211 4.54289L13.8321 9.79289L12.4179 11.2071L7.16789 5.95711L8.58211 4.54289ZM13.8321 11.2071L8.58211 16.4571L7.16789 15.0429L12.4179 9.79289L13.8321 11.2071Z" fill="white" />
                </g>
              </svg>
            </Link>
          </div>
          <h3 style={{ color: '#FFFFFF' }} className="mt-2">{title}</h3>

          <div className='d-flex flex-row mt-2'>
            Стутус <span className='me-2'>:</span> <StatusDisplay status={ticket.status} />
          </div>
          {/* <PriorityDisplay priority={Number(ticket.priority)} /> */}
          {
            profilePage && (
              <ProgressDisplay progress={Number(ticket.progress)} />

            )
          }
        </div>
        {
          isAuthenticated && (
            <DeleteBlock ticket={ticket} documentId={ticket.documentId} />
          )
        }

      </div>
    </div>
  )
}

export default TicketCard