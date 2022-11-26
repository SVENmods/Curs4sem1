import TicketCard from '../components/TicketCard'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import CategoriesContext from '../Hooks/context'


const SearchCard = (searchText, listOfCards) => {
  if (!searchText) {
    return listOfCards;
  }
  return listOfCards.filter(({ title }) =>
    title.toLowerCase().includes(searchText.toLowerCase())
  );
};

const Dashboard = () => {
  const [tickets, setTickets] = useState()
  const [searchTerm, setSearchTerm] = useState("");

  // eslint-disable-next-line no-unused-vars
  const { categories, setCategories } = useContext(CategoriesContext)

  const [loading, setLoading] = useState(false);

  const formattedArray = []

  useEffect(() => {
    setLoading(true);
    async function getData() {
      const response = await axios.get('http://localhost:8000/tickets')
      const dataObject = response.data.data

      const arrayOfKeys = Object.keys(dataObject)
      const arrayOfData = Object.keys(dataObject).map((key) => dataObject[key])

      arrayOfKeys.forEach((key, index) => {
        const formmatedData = { ...arrayOfData[index] }
        formmatedData['documentId'] = key
        formattedArray.push(formmatedData)
      })
      // console.log(formattedArray)

      setTimeout(() => {
        setLoading(false)
      }, 500)
      // for(let i=0; formattedArray.length > i; i++){
      //   console.log(tickets[i].title)
      // }
      return formattedArray
    }
    getData()

    const Debounce = setTimeout(() => {
      const SearchedCards = SearchCard(searchTerm, formattedArray);
      setTickets(SearchedCards)

    }, 200);
    return () => {
      clearTimeout(Debounce)
    };

  }, [searchTerm])


  // useEffect(() => {
  //   const Debounce = setTimeout(() => {
  //     const filteredCars = filterCars(searchTerm, formattedArray);
  //     setTickets(filteredCars);
  //   }, 300);

  //   return () => clearTimeout(Debounce);
  // }, [searchTerm]);

  useEffect(() => {
    setCategories([...new Set(tickets?.map(({ category }) => category))])
  }, [setCategories, tickets])



  const colors = [
    'rgb(255,179,186)',
    'rgb(255,223,186)',
    'rgb(255,255,186)',
    'rgb(186,255,201)',
    'rgb(186,225,255)',
  ]

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ]

  if (loading) {
    return (
      <div className="dashboard">
        <h1>My Projects</h1>
        <div>
          <input
            autoFocus
            type="text"
            autoComplete="off"
            placeholder="Поиск по названию"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <select onChange={(e) => setSearchTerm(e.target.value)}>
              <option value={"Bug"}>Bug</option>
            </select> */}
        </div>
        <div>
          <div className="preloader" id='preloader'>
            <div className="loader"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="dashboard">
      <h1>My Projects</h1>
      <div>
        <input
          autoFocus
          type="text"
          autoComplete="off"
          placeholder="Поиск по названию"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <select onChange={(e) => setSearchTerm(e.target.value)}>
              <option value={"Bug"}>Bug</option>
              <option value={"skeleton"}>skeleton</option>
        </select> */}
      </div>
      <div className="ticket-container">
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex}>
              <h3>{uniqueCategory}</h3>
              {tickets
                .filter((ticket) => ticket.category === uniqueCategory)
                .map((filteredTicket, _index) => (
                  <TicketCard
                    key={_index}
                    color={colors[categoryIndex] || colors[0]}
                    ticket={filteredTicket}
                    title={filteredTicket.title}
                    status={filteredTicket.status}
                  />
                ))}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Dashboard