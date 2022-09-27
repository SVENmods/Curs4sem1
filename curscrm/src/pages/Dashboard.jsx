import React from 'react';
import TicketCard from '../components/TicketCard';


const Dashboard = () => {

     const tickets = [
          {
               category: 'Q1 2022',
               color: 'red',
               title: 'NFT Safety 101 Video', 
               owner: 'Ania Kubow', 
               avatar: 'https://avatars.githubusercontent.com/u/94043508?v=4',
               status: 'done',
               priority: 5,
               prgoress: 40, 
               description: 'Make a video showcasing how to work with NFTs safely.',
               timestamp: '2022-02-11T07:36:17+0000'
          },
          {
               category: 'A2 2022',
               color: 'red',
               title: 'Build and Sell AI Model', 
               owner: 'Ania Kubow', 
               avatar: 'https://avatars.githubusercontent.com/u/94043508?v=4',
               status: 'working on it',
               priority: 2,
               prgoress: 70, 
               description: 'Make a video about AI.',
               timestamp: '2022-02-11T07:36:17+0000'
          }
     ]

     const uniqueCategories = [
          ...new Set(tickets?.map(({ category}) => category))
     ]

     return (
          <div className='dashboard'>
               <h1>My Project</h1>
               <div className='ticket-container'>
                    {tickets && uniqueCategories?.map((uniqueCategory, categoryIndex) => (
                         <div key={categoryIndex}>
                              <h3>{uniqueCategory}</h3>
                              {tickets.filter(ticket => ticket.category === uniqueCategory)
                                   .map((filteredTicket, _index) => (
                                        <TicketCard
                                        id = {_index}
                                        color = {filteredTicket.color}
                                        ticket = {filteredTicket}
                                        />
                              ))}
                         </div>
                    ))}
               </div>
          </div>
     );
}
export default Dashboard;