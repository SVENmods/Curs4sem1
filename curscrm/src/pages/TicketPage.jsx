/* eslint-disable eqeqeq */
import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import CategoriesContext from '../Hooks/context'
import FormInput from '../UI/FormInput'

const TicketPage = ({ editMode }) => {
  const [formData, setFormData] = useState({
    status: 'not started',
    progress: 0,
    timestamp: new Date().toISOString(),
    editMode: false,
  })
  // eslint-disable-next-line no-unused-vars
  const { categories, setCategories } = useContext(CategoriesContext)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editMode) {
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
    
    if (editMode) {
      const fetchData = async () => {
        const response = await axios.get(`http://localhost:8000/tickets/${id}`)
    //     console.log('AAAAAA', response)
        setFormData(response.data.data)
      }
          fetchData();
          console.log(editMode)
    }
      // window.location.reload();
      
  }, [editMode, id])

  

  // console.log('EDITcategories', categories)
  // console.log('formData', formData.status)
  // console.log('formData.status', formData.status === 'stuck')
  return (
    <div className="ticket">
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
            />

            <label htmlFor="description">Description</label>
            <FormInput
              id="description"
              name="description"
              type="text"
              onChange={handleChange}
              required={true}
              value={formData.description}
            />

            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
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
              />
              <label htmlFor="priority-1">1</label>
              <FormInput
                id="priority-2"
                name="priority"
                type="radio"
                onChange={handleChange}
                value={2}
                checked={formData.priority == 2}
              />
              <label htmlFor="priority-2">2</label>
              <FormInput
                id="priority-3"
                name="priority"
                type="radio"
                onChange={handleChange}
                value={3}
                checked={formData.priority == 3}
              />
              <label htmlFor="priority-3">3</label>
              <FormInput
                id="priority-4"
                name="priority"
                type="radio"
                onChange={handleChange}
                value={4}
                checked={formData.priority == 4}
              />
              <label htmlFor="priority-4">4</label>
              <FormInput
                id="priority-5"
                name="priority"
                type="radio"
                onChange={handleChange}
                value={5}
                checked={formData.priority == 5}
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
              />
              

                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
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
            <FormInput  type="submit"/>
          </section>

          <section>
            <label htmlFor="owner">Owner</label>
            <FormInput
              id="owner"
              name="owner"
              type="owner"
              onChange={handleChange}
              required={true}
              value={formData.owner}
            />

            <label htmlFor="avatar">Avatar</label>
            <FormInput
              id="avatar"
              name="avatar"
              type="url"
              onChange={handleChange}
            />
            <div className="img-preview">
              {formData.avatar && (
                <img src={formData.avatar} alt="imagePreview" />
              )}
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}

export default TicketPage