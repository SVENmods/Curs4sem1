import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const CommentDisplay = () => {
     const [formCom, setComData] = useState({})
     let { id } = useParams()

     useEffect(() => {
          const fetchComment = async () => {
               const response = await axios.get(`http://localhost:8000/tickets/${id}`)
               //     console.log('AAAAAA', response)
               // setFormData(response.data.data)
               const arrayNameCom = []
               const objRate = response.data.data.allRate
               setComData(objRate)
               let lengthCom = Object.keys(objRate).length
               for (let i = 0; lengthCom >= i; i++) {

                    // console.log(objRate[i])
                    // arrayCom.push(objRate[i])
                    // createElement(
                    //   'h1',
                    //   { className: 'greeting' },
                    //   'Hello ',
                    //   createElement('i', null, arrayCom[i]),
                    //   '. Welcome!'
                    // )

                    Object.keys(objRate).map(key => <div key={key}>{objRate[key]}</div>)
               }


          }

          fetchComment();
          const showComment = async () => {
               for (let i = 0; Object.keys(formCom).length > i; i++) {
                    const mainDiv = document.getElementById("allcom")
                    const newDiv = document.createElement("div");
                    mainDiv.appendChild(newDiv)
                    const newContent = document.createTextNode(formCom[i].nameR);
                    newDiv.appendChild(newContent);
               }
          }
          // showComment()
     }, [id])



     return (
          <div>

          </div>
     );
}

export default CommentDisplay;