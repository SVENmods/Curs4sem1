/* eslint-disable eqeqeq */
import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import CategoriesContext from '../Hooks/context'
import FormInput from '../UI/FormInput'
import { useAuth0 } from "@auth0/auth0-react"

const TicketPage = ({ editMode }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    status: 'not started',
    progress: 0,
    timestamp: new Date().toISOString(),
    editMode: false,
    count: 0,
    allRate: {},
  })
  // eslint-disable-next-line no-unused-vars
  const { categories, setCategories } = useContext(CategoriesContext)

  const ratingObj = {
    ids: {},
  }

  const navigate = useNavigate()
  let { id } = useParams()

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const { user, isAuthenticated, isLoading } = useAuth0();


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editMode) {
      // if (ratingObj.ids) {
      //   ratingObj.ids++
      // }
      // ratingObj.ids = {
      //   nameR: user.name,
      //   rateR: formData.rate
      // }
      // formData.allRate++
      // formData.allRate.ids = 0
      // formData.allRate.[ids] = formData.allRate.ids + 1
      // for (let i = 0; formData.allRate.length; i++) {
      //   if (formData.allRate.length == 0) {

      //   }

      // }
      // let rateMap = new Map()
      // rateMap.set(1, {
      //   nameR: user.name,
      //   rateR: formData.rate
      // })
      // formData.allRate = new Map()
      // formData.allRate.set(1, {
      //   nameR: user.name,
      //   rateR: formData.rate
      // })
      // formData.allRate = new Map()
      // formData.allRate.set(1, {
      //   nameR: user.name,
      //   rateR: formData.rate
      // })
      // const map = new Map()
      // map.set('firstName', 'Luke')
      // formData.allRate.ids = map.set('firstName', 'Luke')
      // formData.allRate = {}
      // delete formData.allRate["0"]
      // formData.allRate["0"].del
      // let oldRate = formData.rate

      if (formData.allRate) {
        let lengthR = Object.keys(formData.allRate).length;
        let newRate = {
          nameR: user.name,
          rateR: Number(formData.rate)
        }
        // formData.allRate[lengthR++] = newRate
        for (let i = 0; lengthR >= i; i++) {
          if (lengthR == i) {
            formData.allRate[i] = newRate
          }
          // else formData.allRate[i] = newRate

          // else formData.allRate[i] = newRate
        }

        // let sum = 0;

        // for (let i = 0; lengthR >= i; i++) {

        //   for (let rateS of Object.values(formData.allRate[i].rateR)) {
        //     sum += rateS;
        //   }


        // }
        // formData.sumRate = sum
        let arrayRate = []
        for (let i = 0; lengthR >= i; i++) {
          arrayRate.push(formData.allRate[i].rateR)
        }
        let x = 0
        formData.sumRate = Math.round(arrayRate.map(i => x += i, x = 0).reverse()[0] / lengthR)
      }

      const response = await axios.put(`http://localhost:8000/tickets/${id}`, {
        data: formData,
      })
      const success = response.status === 200
      if (success) {
        navigate('/')
      }
    }
    if (!editMode) {
      console.log('posting')
      const response = await axios.post('http://localhost:8000/tickets', {
        formData,
      })
      const success = response.status === 200
      if (success) {
        navigate('/')
      }
    }
  }

  useEffect(() => {
    setLoading(true)
    if (editMode) {
      const fetchData = async () => {
        const response = await axios.get(`http://localhost:8000/tickets/${id}`)
        //     console.log('AAAAAA', response)
        setFormData(response.data.data)

      }
      fetchData();
      console.log(editMode)
    }
    setTimeout(() => {
      setLoading(false)
    }, 500)
    // window.location.reload();

  }, [editMode, id])

  // if(formData.avatar == user.picture){
  //   const chekAvatar = true
  //   console.log(chekAvatar)
  // }
  // else{
  //   const chekAvatar = false
  //   console.log(chekAvatar)
  // }
  // const rating = {
  //   ids: {
  //     nameR: user.name,
  //     rateR: formData.rate,
  //   }
  // }

  // let allR = rating.ids.rateR / rating.ids


  console.log(isAuthenticated)
  return (
    isAuthenticated && (
      <div className="ticket">
        {
          loading && (
            <div>
              <div className="preloader" id='preloader'>
                <div className="loader"></div>
              </div>
            </div>
          )
        }
        <h1>{editMode ? 'Update Your Ticket' : 'Create a Ticket'}</h1>
        <div className="ticket-container">
          <form onSubmit={handleSubmit} id="ticketForm">
            <section>
              <label htmlFor="title">Title</label>
              <FormInput
                id="title"
                name="title"
                type="text"
                onChange={handleChange}
                required={true}
                value={formData.title}
                disabled={formData.owner != user.name && editMode}
              />
              {/* && user.name == undefined ? true : false */}
              <label htmlFor="description">Description</label>
              <FormInput
                id="description"
                name="description"
                type="text"
                onChange={handleChange}
                required={true}
                value={formData.description}
                disabled={formData.owner != user.name && editMode}
              />

              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={formData.owner != user.name && editMode}
              >
                {categories?.map((category, _index) => (
                  <option key={_index} value={category}>{category}</option>
                ))}
              </select>

              <label htmlFor="new-category">New Category</label>
              <FormInput
                id="new-category"
                name="category"
                type="text"
                onChange={handleChange}
                value={formData.category}
                disabled={formData.owner != user.name && editMode}
              />

              <label>Priority</label>
              <div className="multiple-input-container">
                <FormInput
                  id="priority-1"
                  name="priority"
                  type="radio"
                  onChange={handleChange}
                  value={1}
                  checked={formData.priority == 1}
                  disabled={formData.owner != user.name && editMode}
                />
                <label htmlFor="priority-1">1</label>
                <FormInput
                  id="priority-2"
                  name="priority"
                  type="radio"
                  onChange={handleChange}
                  value={2}
                  checked={formData.priority == 2}
                  disabled={formData.owner != user.name && editMode}
                />
                <label htmlFor="priority-2">2</label>
                <FormInput
                  id="priority-3"
                  name="priority"
                  type="radio"
                  onChange={handleChange}
                  value={3}
                  checked={formData.priority == 3}
                  disabled={formData.owner != user.name && editMode}
                />
                <label htmlFor="priority-3">3</label>
                <FormInput
                  id="priority-4"
                  name="priority"
                  type="radio"
                  onChange={handleChange}
                  value={4}
                  checked={formData.priority == 4}
                  disabled={formData.owner != user.name && editMode}
                />
                <label htmlFor="priority-4">4</label>
                <FormInput
                  id="priority-5"
                  name="priority"
                  type="radio"
                  onChange={handleChange}
                  value={5}
                  checked={formData.priority == 5}
                  disabled={formData.owner != user.name && editMode}
                />
                <label htmlFor="priority-5">5</label>
              </div>

              {editMode && (
                <>
                  <label htmlFor="progress">Progress</label>
                  <FormInput
                    type="range"
                    id="progress"
                    name="progress"
                    value={formData.progress}
                    min="0"
                    max="100"
                    step={10}
                    onChange={handleChange}
                    disabled={formData.owner != user.name && editMode}
                  />


                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    disabled={formData.owner != user.name && editMode}
                  >
                    <option defaultValue={formData.status == 'done'} value="done">
                      Done
                    </option>
                    <option
                      defaultValue={formData.status == 'working on it'}
                      value="working on it"
                    >
                      Working on it
                    </option>
                    <option defaultValue={formData.status == 'stuck'} value="stuck">
                      Stuck
                    </option>
                    <option
                      defaultValue={formData.status == 'not started'}
                      value="not started"
                    >
                      Not Started
                    </option>
                  </select>
                </>
              )}
              <FormInput id="submit" type="submit" />
            </section>

            <section>
              <label htmlFor="owner">Owner</label>
              <FormInput
                id="owner"
                name="owner"
                type="owner"
                onChange={handleChange}
                required={true}
                value={editMode ? formData.owner : formData.owner = user.name}
                disabled={formData.owner != user.name && editMode}
              />

              <label htmlFor="avatar">Avatar</label>
              <FormInput
                id="avatar"
                name="avatar"
                type="url"
                onChange={handleChange}
                value={editMode ? formData.avatar : formData.avatar = user.picture}
                disabled={true}
              />
              <div className="img-preview">
                {/* formData.avatar &&  */}
                {editMode ? formData.avatar && (
                  <img src={editMode ? formData.avatar : user.picture} alt="imagePreview" />
                ) : user.picture && (
                  <img src={editMode ? formData.avatar : user.picture} alt="imagePreview" />
                )}
              </div>
            </section>
            {
              editMode && formData.owner != user.name && (
                <section>
                  <label htmlFor="nameR">Rater name</label>
                  <FormInput
                    type="text"
                    id="nameR"
                    name="nameR"
                    value={editMode ? formData.nameR = user.name : formData.nameR = user.name}
                  />
                  {/* <label htmlFor="count">Counter</label>
                  <FormInput
                    type="number"
                    id="count"
                    name="count"
                    value={formData.count = formData.count++}
                    onChange={handleChange}
                    disabled={formData.owner == user.name && editMode}
                  /> */}
                  {/* <label htmlFor="rate">Rate a worker</label>
                  <FormInput
                    type="range"
                    id="rate"
                    name="rate"
                    value={formData.rate}
                    min="0"
                    max="100"
                    step={10}
                    onChange={handleChange}
                    disabled={formData.owner == user.name && editMode}
                  /> */}
                  <label>Rate a worker</label>
                  <div className="multiple-input-container">
                    <FormInput
                      id="priorityR-1"
                      name="rate"
                      type="radio"
                      onChange={handleChange}
                      value={1}
                      checked={formData.rate == 1}
                    />
                    <label htmlFor="priorityR-1">1</label>
                    <FormInput
                      id="priorityR-2"
                      name="rate"
                      type="radio"
                      onChange={handleChange}
                      value={2}
                      checked={formData.rate == 2}
                    />
                    <label htmlFor="priorityR-2">2</label>
                    <FormInput
                      id="priorityR-3"
                      name="rate"
                      type="radio"
                      onChange={handleChange}
                      value={3}
                      checked={formData.rate == 3}
                    />
                    <label htmlFor="priorityR-3">3</label>
                    <FormInput
                      id="priorityR-4"
                      name="rate"
                      type="radio"
                      onChange={handleChange}
                      value={4}
                      checked={formData.rate == 4}
                    />
                    <label htmlFor="priorityR-4">4</label>
                    <FormInput
                      id="priorityR-5"
                      name="rate"
                      type="radio"
                      onChange={handleChange}
                      value={5}
                      checked={formData.rate == 5}
                    />
                    <label htmlFor="priorityR-5">5</label>
                  </div>
                </section>
              )
            }

          </form>
        </div>
      </div>
    ))

}

export default TicketPage