/* eslint-disable eqeqeq */
import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import CategoriesContext from '../Hooks/context'
import FormInput from '../UI/FormInput'
import { useAuth0 } from "@auth0/auth0-react"
import Toast from 'react-bootstrap/Toast';
import MyVerticallyCenteredModal from '../UI/Modal'
import Button from 'react-bootstrap/Button';



const TicketPage = ({ editMode }) => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const { categories, setCategories } = useContext(CategoriesContext)
  const [formData, setFormData] = useState({
    status: 'Открыта',
    progress: 0,
    timestamp: new Date().toISOString(),
    editMode: false,
    count: 0,
    allRate: [],
    allOrder: [],
  })
  const [orderState, setOrderState] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth0();



  // eslint-disable-next-line no-unused-vars

  // const ratingObj = {
  //   ids: {},
  // }

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
      // formData.allRate = []
      if (orderState == true) {
        setModalShow(true)
        let lengthR = formData.allRate.length;
        formData.status = "В обработке"
        formData.nameOrdered = user.name;
        let newOrder = {
          nameR: user.name,
          order: formData.order = "true",
          date: formData.dateO,
        }

        for (let i = 0; lengthR >= i; i++) {
          if (lengthR == i) {
            formData.allOrder.push(newOrder)
          }

        }
      }

      if (formData.allRate && user.name != formData.owner) {
        setModalShow(true)
        let lengthR = formData.allRate.length;

        if (formData.rate != null) {
          let newRate = {
            nameR: user.name,
            rateR: Number(formData.rate),
            comment: formData.comment,
          }
          for (let i = 0; lengthR >= i; i++) {
            if (lengthR == i) {
              formData.allRate.push(newRate)
            }

          }
          let arrayRate = []
          for (let i = 0; lengthR >= i; i++) {
            arrayRate.push(formData.allRate[i].rateR)
          }
          let x = 0
          formData.sumRate = Math.round(arrayRate.map(i => x += i, x = 0).reverse()[0] / lengthR)
        }

      }

      if (document.getElementById("OrderDel")) {
        setModalShow(true)
        // const valToDel = 
        let allOrderArray = formData.allOrder
        console.log(formData.allOrder)
        let newAllOrderArray = allOrderArray.filter(el => {
          return el.date != document.getElementById("OrderDel").value
        })
        // console.log(formData.allOrder)
        // console.log(formData.allOrder = newAllOrderArray)
        // console.log(formData.allOrder)
        // formData.nameOrdered = ""
        formData.allOrder = newAllOrderArray

        // console.log(document.getElementById("OrderDel").value)

      }





      const response = await axios.put(`http://localhost:8000/tickets/${id}`, {
        data: formData,
      })
      const success = response.status === 200
      if (success) {
        setModalShow(true)
        setTimeout(() => {
          setModalShow(false)
          navigate('/')
        }, 3000)

      }
    }

    if (!editMode) {
      console.log('posting')
      const response = await axios.post('http://localhost:8000/tickets', {
        formData
      })
      const success = response.status === 200
      if (success) {
        setModalShow(true)
        setTimeout(() => {
          setModalShow(false)
          navigate('/')
        }, 3000)
      }
    }
  }

  const [orderFlag, setOrderFlag] = useState();

  const arrayCom = []
  useEffect(() => {
    setLoading(true)
    if (editMode) {
      const fetchData = async () => {
        const response = await axios.get(`http://localhost:8000/tickets/${id}`)
        //     console.log('AAAAAA', response)
        setFormData(response.data.data)
        const objRate = response.data.data.allRate
        const objOrder = response.data.data
        // console.log(response.data.data.allOrder.find(el => el.nameR === user.name))
        // console.log(objOrder)
        setOrderFlag(objOrder)
        return objRate

      }
      fetchData();
      // if (orderName === user.name) {
      //   setOrderFlag(true)
      //   console.log(orderFlag)
      // }
      // else {
      //   setOrderFlag(false)
      //   console.log(orderFlag)
      // }


    }


    setTimeout(() => {
      setLoading(false)
    }, 500)


  }, [editMode, id])


  // if (formData.allOrder.find(el => el.nameR === user.name)) {
  //   console.log("have order")
  //   document.getElementById('orderBtn').style.display = "none"
  // }
  // else {
  //   console.log("dont have")
  // }
  if (isAuthenticated) {
    return (

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
        <h1>{editMode ? 'Услуга:  ' + formData.title : 'Создание Услуги'}</h1>
        {
          editMode && (
            <p>{formData.description}</p>
          )
        }
        <div className="ticket-container">
          <div className='toast-order'>
            {/* <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">Заказ</strong>
                <small>Сейчас</small>
              </Toast.Header>
              <Toast.Body>Ваш заказ успешно оформлен</Toast.Body>
            </Toast> */}



          </div>


          <form onSubmit={handleSubmit} id="ticketForm" className='row'>

            {

              (
                <section hidden={formData.owner != user.name || formData.owner == undefined}>
                  <label htmlFor="title">Название</label>
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
                  <label htmlFor="description">Описание</label>
                  <FormInput
                    id="description"
                    name="description"
                    type="text"
                    onChange={handleChange}
                    required={true}
                    value={formData.description}
                    disabled={formData.owner != user.name && editMode}
                  />
                  <label>Категория</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  // disabled={formData.owner != user.name && editMode}
                  >
                    {categories?.map((category, _index) => (
                      <option key={_index} value={category}>{category}</option>
                    ))}
                  </select>

                  <label htmlFor="new-category">Новая Категоря</label>
                  <FormInput
                    id="new-category"
                    name="category"
                    type="text"
                    onChange={handleChange}
                    value={formData.category}
                    disabled={formData.owner != user.name && editMode}
                  />



                  {editMode && (
                    <>
                      <label htmlFor="progress">Прогресс</label>
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


                      <label>Статус</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        disabled={formData.owner != user.name && editMode}
                      >
                        <option defaultValue={formData.status == 'Готово'} value="Готово">
                          Готово
                        </option>
                        <option
                          defaultValue={formData.status == 'В работе'}
                          value="В работе"
                        >
                          В работе
                        </option>
                        <option defaultValue={formData.status == 'В обработке'} value="В обработке">
                          В обработке
                        </option>
                        <option
                          defaultValue={formData.status == 'Открыта'}
                          value="Открыта"
                        >
                          Открыта
                        </option>
                      </select>
                    </>
                  )}

                </section>
              )
            }

            <MyVerticallyCenteredModal
              editMode={editMode}
              show={modalShow}
              backdrop="static"
              onHide={() => {
                setModalShow(false)
              }}
            />

            <section>
              <label htmlFor="owner">Владелец</label>
              <FormInput
                id="owner"
                name="owner"
                type="owner"
                onChange={handleChange}
                required={true}
                value={editMode ? formData.owner : formData.owner = user.name}
                disabled={true}
              />

              {/* <label htmlFor="avatar">Аватар</label> */}
              <FormInput
                id="avatar"
                name="avatar"
                type="url"
                onChange={handleChange}
                value={editMode ? formData.avatar : formData.avatar = user.picture}
                disabled={true}
              />
              {/* <FormInput
                id="avatar"
                name="avatar"
                type="file"
                onChange={handleChange}
                value={editMode ? formData.avatar : formData.avatar = user.picture}
                disabled={false}
              /> */}
              <div className="img-preview">
                <span>Аватар</span>
                {/* formData.avatar &&  */}
                {editMode ? formData.avatar && (
                  <img src={editMode ? formData.avatar : user.picture} alt="imagePreview" />
                ) : user.picture && (
                  <img src={editMode ? formData.avatar : user.picture} alt="imagePreview" />
                )}
              </div>
            </section>


            {
              //  && formData.progress == 100
              editMode && formData.owner != user.name && formData.allOrder.find(el => el.nameR === user.name) && formData.progress == 100 && (
                <section>
                  <label htmlFor="nameR" >Имя пользователя</label>
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
                  <label>Оцените Исполнителя</label>
                  <div className="multiple-input-container">
                    <FormInput
                      id="priorityR-1"
                      name="rate"
                      type="radio"
                      onChange={handleChange}
                      value={1}
                      required
                    />
                    <label htmlFor="priorityR-1">1</label>
                    <FormInput
                      id="priorityR-2"
                      name="rate"
                      type="radio"
                      onChange={handleChange}
                      value={2}
                      required
                    />
                    <label htmlFor="priorityR-2">2</label>
                    <FormInput
                      id="priorityR-3"
                      name="rate"
                      type="radio"
                      onChange={handleChange}
                      value={3}
                    />
                    <label htmlFor="priorityR-3">3</label>
                    <FormInput
                      id="priorityR-4"
                      name="rate"
                      type="radio"
                      onChange={handleChange}
                      value={4}
                    />
                    <label htmlFor="priorityR-4">4</label>
                    <FormInput
                      id="priorityR-5"
                      name="rate"
                      type="radio"
                      onChange={handleChange}
                      value={5}
                    />
                    <label htmlFor="priorityR-5">5</label>
                  </div>
                  <div>
                    <div>

                      <label htmlFor="coment">Оставить комментарий</label>
                      <FormInput
                        id="comment"
                        name="comment"
                        type="text"
                        onChange={handleChange}
                        value={formData.comment}
                      />
                    </div>

                    <div>
                      <span>Все отзывы</span>
                      <div id='allcom'>
                        {formData.allRate.map(function (d, idx) {
                          return (<li key={idx}>{d.nameR} - {d.comment} - {d.rateR}</li>)
                        })}
                      </div>

                    </div>
                  </div>
                </section>
              )
            }
            {/* {
              // .filter(el => el.nameR !== user.name)

              <div>
                <span>Все заказы</span>
                {formData.allOrder.map(function (d, idx) {
                  return (
                    <div>
                      <li key={idx}>{d.nameR} - {d.order} - {d.date}</li>
                    </div>
                  )
                })}
              </div>


            } */}

            {
              editMode && formData.owner === user.name &&
              (
                <section>
                  {/* editMode && formData.owner === user.name && */}
                  <span>Дата для отказа в услуге</span>
                  <select
                    id='OrderDel'
                    name='OrderDel'
                    onChange={handleChange}
                  // value={formData.OrderDel}
                  >
                    <option value={null} defaultValue={true}>Оставить без изменений</option>
                    {formData.allOrder?.map(function (d, idx) {
                      return (

                        <option key={idx} value={d.date}>{d.date + " " + d.nameR}</option>
                        // d.nameR + " " + d.order + " " + 

                      )
                    })}
                  </select>
                </section>
              )
            }

            {
              formData.owner !== user.name && (
                <section>
                  {
                    formData.status === "Открыта" && (
                      <section className='d-flex flex-column justify-content-center align-items-center'>
                        <span>Выбрать дату офорления заказа</span>
                        <FormInput
                          id="dateO"
                          name="dateO"
                          onChange={handleChange}
                          type="date"
                          value={formData.dateO}
                          onClick={() => {
                            document.getElementById("dateO").min = new Date().toISOString().split("T")[0];

                          }}
                        />
                        <FormInput
                          id="submit"
                          type="submit"
                          onClick={function () {
                            setOrderState(true)
                            // setShow(true)
                            formData.order = true
                            // if (formData.allOrder.find(el => el.nameR === user.name)) {
                            //   document.getElementById('orderBtn').style.display = "none"
                            // }
                            // document.getElementById('liveToastBtn').style.display = "none"
                          }}
                          value={"Заказать"} />
                      </section>
                    )
                  }

                  {
                    //  && formData.progress == 100
                    editMode && formData.owner != user.name && formData.allOrder.find(el => el.nameR === user.name) && formData.progress == 100 && (
                      <FormInput
                        id="submit"
                        type="submit"
                        onClick={function () {
                        }}
                        value={"Отправить Отзыв"} />
                    )
                  }
                </section>

              )
            }
            {
              formData.owner === user.name && (
                <FormInput
                  id="submit"
                  type="submit"
                  onClick={function () {
                    // setOrderState(true)
                    // setShow(true)
                    // formData.order = true
                    // if (formData.allOrder.find(el => el.nameR === user.name)) {
                    //   document.getElementById('orderBtn').style.display = "none"
                    // }
                    // document.getElementById('liveToastBtn').style.display = "none"

                  }}
                  value={"Отправить"} />
              )
            }
          </form>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className='ticket mt-5 d-flex flex-column w-100 justify-content-center align-items-center'>
        <span className='h1'>Данные видны только зарегистрированным пользователям.</span>
      </div>
    )
  }


}

export default TicketPage