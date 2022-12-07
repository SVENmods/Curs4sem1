import TicketCard from '../components/TicketCard'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import CategoriesContext from '../Hooks/context'
import { useAuth0 } from "@auth0/auth0-react"



const SearchCard = (searchText, listOfCards) => {
  if (!searchText) {
    return listOfCards;
  }

  if (
    listOfCards.filter(({ title }) =>
      title.toLowerCase().includes(searchText.toLowerCase())).length === 0) {
    return (

      listOfCards.filter(({ category }) =>
        category.toLowerCase().includes(searchText.toLowerCase()))

    );
  }
  else {
    return (
      listOfCards.filter(({ title }) =>
        title.toLowerCase().includes(searchText.toLowerCase()))
    )
  }

};

const Dashboard = ({ profilePage }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
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
      // console.log("tickets", tickets.filter(function (el) {
      //   return el.owner === user.name
      // }))

      // if (profilePage) {
      // let newTickets = tickets.filter(function (el) {
      //   return el.owner === user.name
      // })
      //   console.log("tickets", tickets)
      //   setTickets(newTickets)
      //   console.log("tickets", tickets)
      // }

      // console.log(formattedArray)

      setTimeout(() => {
        setLoading(false)
      }, 500)
      // console.log(formattedArray)
      return formattedArray
    }
    getData()


    const DebounceFilter = setTimeout(() => {
      let SearchedCards = SearchCard(searchTerm, formattedArray);

      // if (profilePage.profilePage === true) {
      // console.log(profilePage)
      SearchedCards = SearchedCards.filter(function (el) {
        return el.owner === user.name
      })
      // }
      // if (profilePage) {

      // console.log(tickets.filter(function (el) {
      //   return el.owner === user.name
      // }))
      // }

      setTickets(SearchedCards)

    }, 200);
    return () => {
      clearTimeout(DebounceFilter)
    }


  }, [searchTerm])

  useEffect(() => {
    const DebounceFilter = setTimeout(() => {
      const SearchedCards = SearchCard(searchTerm, formattedArray);

      setTickets(SearchedCards)
    }, 200);
    return () => {
      clearTimeout(DebounceFilter)
    }
  }, [searchTerm])



  useEffect(() => {
    setCategories([...new Set(tickets?.map(({ category }) => category))])
  }, [setCategories, tickets])



  const colors = [
    '#6046FF',
    '#806CFB',
    '#FF3B51',
    '#FFD055',
    '#20B038',
  ]
  const uniqueCategories = [
    ...new Set(tickets?.filter(function (el) {
      if (profilePage) {
        return el.owner === user.name
      }
      else {
        return el
      }
    }).map(({ category }) => category)),
  ]


  if (loading) {
    return (
      <div className="dashboard">
        <div>
          <input
            autoFocus
            type="text"
            autoComplete="off"
            placeholder="Поиск по названию"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-inp"
          />
          <section className='filter d-flex flex-row'>
            {tickets &&
              uniqueCategories?.map((uniqueCategory, filterKey) => (
                <div key={filterKey} className='me-3'>
                  <input
                    type="radio"
                    id={uniqueCategory}
                    value={uniqueCategory}
                    name="star"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <label htmlFor={uniqueCategory}>{uniqueCategory}</label>
                </div>
              ))}
            <input
              type="radio"
              id="test3"
              name="star"
              value={""}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <label htmlFor="test3">no filter</label>
          </section>
          {/* <select onChange={(e) => setSearchTerm(e.target.value)}>
              <option value={"Bug"}>Bug</option>
              <option value={"skeleton"}>skeleton</option>
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
      <div>
        <input
          autoFocus
          type="text"
          autoComplete="off"
          placeholder="Поиск по названию"
          id="searchInp"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-inp"

        />
        {/* <input type="button" value={"clear"} onClick={document.getElementById("searchInp").value = ""} /> */}
        <section className='filter d-flex flex-md-row flex-wrap'>
          {tickets &&
            uniqueCategories?.map((uniqueCategory, filterKey) => (
              <div key={filterKey}>
                <input
                  type="radio"
                  id={uniqueCategory}
                  value={uniqueCategory}
                  name="star"
                  filter={uniqueCategory}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <label htmlFor={uniqueCategory} className='me-2'>{uniqueCategory}</label>
              </div>
            ))}
          <input
            type="radio"
            id="test3"
            name="star"
            value={""}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <label htmlFor="test3">no filter</label>
        </section>
        {/* <select onChange={(e) => setSearchTerm(e.target.value)}>
              <option value={"Bug"}>Bug</option>
              <option value={"skeleton"}>skeleton</option>
        </select> */}
      </div>
      {

      }
      <div className="ticket-container row">
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="ticket-block d-flex flex-column">
              <h3 className="category" style={{ backgroundColor: colors[categoryIndex] || colors[0] }}>{uniqueCategory}</h3>
              {tickets.filter(function (el) {
                if (profilePage) {
                  return el.owner === user.name
                }
                else {
                  return el
                }
              })
                .filter((ticket) => ticket.category === uniqueCategory)
                .map((filteredTicket, _index) => (
                  <TicketCard
                    key={_index}
                    color={colors[categoryIndex] || colors[0]}
                    ticket={filteredTicket}
                    title={filteredTicket.title}
                    status={filteredTicket.status}
                    category={filteredTicket.category}
                    filter={filteredTicket.title}
                    profilePage={profilePage}
                  // uniqueCategory={filteredTicket.category}
                  />
                ))}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Dashboard