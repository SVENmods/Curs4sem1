import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const CommentDisplay = () => {
     const [formCom, setComData] = useState([])
     let { id } = useParams()

     useEffect(() => {
          const fetchComment = async () => {
               const response = await axios.get(`http://localhost:8000/tickets/${id}`)
               //     console.log('AAAAAA', response)
               // setFormData(response.data.data)
               const arrayNameCom = []
               const objRate = response.data.data.allRate
               let lengthCom = Object.keys(objRate).length
               for (let i = 0; lengthCom > i; i++) {

                    // console.log(objRate[i])
                    // arrayCom.push(objRate[i])
                    // createElement(
                    //   'h1',
                    //   { className: 'greeting' },
                    //   'Hello ',
                    //   createElement('i', null, arrayCom[i]),
                    //   '. Welcome!'
                    // )

                    // Object.keys(objRate).map(key => <div key={key}>{objRate[key]}</div>)
                    formCom.push(objRate[i])

               }
               // console.log("arrayNameCom", arrayNameCom)
               // setComData(objRate)

               // for (let i = 0; formCom.length > i; i++) {
               //      console.log(formCom[i])
               // }


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
          // console.log("formCom", formCom)
          // formCom.map(({ key, value }) => ({ [key]: value }));
     }, [id])
     // console.log("formCom", formCom)




     // formCom.map(el => {
     //      return (
     //           <span className='btn-answer'>{el}</span>
     //      )
     // })


     // map((comment) => {
     //      return (
     //           <span className='btn-answer'>{comment.comment}</span>
     //      )
     // });
     const allArray = []
     for (let i = 0; formCom.length > i; i++) {
          console.log(formCom[i])
          // formCom[i].map((anObjectMapped, index) => {
          //      return (
          //           <p key={`${anObjectMapped.nameR}_{anObjectMapped.comment}`}>
          //                {anObjectMapped.nameR} - {anObjectMapped.comment}
          //           </p>
          //      );
          // })
          // // allArray.push(...formCom[i])
          // f[i] = {
          //      name: formCom[i].nameR,
          //      comment: formCom[i].comment,
          //      rate: formCom[i].rate
          // };
     }
     console.log(formCom)


}

export default CommentDisplay;