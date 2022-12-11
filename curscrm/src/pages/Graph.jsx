
import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Graph = () => {
     const [tickets, setTickets] = useState()
     const [rowTicktes, setRowTickets] = useState()
     useEffect(() => {
          async function getData() {
               const response = await axios.get('http://localhost:8000/tickets')
               const dataObject = response.data.data
               console.log(Object.keys(dataObject).map((key) => dataObject[key]))
               const arrayOfKeys = Object.keys(dataObject)
               const arrayOfData = Object.keys(dataObject).map((key) => dataObject[key])
               const formattedArray = []
               arrayOfKeys.forEach((key, index) => {
                    const formmatedData = { ...arrayOfData[index] }
                    formmatedData['documentId'] = key
                    formattedArray.push(formmatedData)
               })
               console.log(formattedArray)
               setTickets(formattedArray)
               setRowTickets(response.data.data)


               const dataRating = []

               const dataProgress = []

               for (let i = 0; i < formattedArray.length; i++) {
                    dataRating.push(
                         {
                              title: formattedArray[i].title, sumRate: formattedArray[i].sumRate
                         }
                    )
                    // console.log(formattedArray[i].priority)
                    // console.log(dataPriority)
               }

               for (let i = 0; i < formattedArray.length; i++) {
                    dataProgress.push(
                         {
                              title: formattedArray[i].title, progress: formattedArray[i].progress
                         }
                    )
                    // console.log(formattedArray[i].priority)
                    // console.log(dataProgress)
               }

               async function createChartPriority() {
                    new Chart(
                         document.getElementById('myChartPriority'),
                         {
                              type: 'doughnut',
                              data: {
                                   labels: dataRating.map(row => row.title),
                                   datasets: [
                                        {
                                             label: 'Рейтинг услуги',
                                             data: dataRating.map(row => row.sumRate)
                                        }
                                   ]
                              }
                         }
                    );
               }

               async function createPolar() {
                    new Chart(
                         document.getElementById('myChartPolar'),
                         {
                              type: 'polarArea',
                              data: {
                                   labels: dataProgress.map(row => row.title),
                                   datasets: [
                                        {
                                             label: 'Прогресс услуги',
                                             data: dataProgress.map(row => row.progress)
                                        }
                                   ]
                              }
                         }
                    );
               }

               createChartPriority();
               createPolar();

          }




          getData()
     }, [])

     const exportData = () => {
          const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
               JSON.stringify(tickets)
          )}`;
          const link = document.createElement("a");
          link.href = jsonString;
          link.download = "data.json";

          link.click();
     };

     // useEffect(() => {
     //      const data = [
     //           { year: 2010, count: 10 },
     //           { year: 2011, count: 20 },
     //           { year: 2012, count: 15 },
     //           { year: 2013, count: 25 },
     //           { year: 2014, count: 22 },
     //           { year: 2015, count: 30 },
     //           { year: 2016, count: 28 },
     //      ];
     //      async function createChart(){
     //           new Chart(
     //                document.getElementById('myChart'),
     //                {
     //                     type: 'bar',
     //                     data: {
     //                          labels: data.map(row => row.year),
     //                          datasets: [
     //                               {
     //                               label: 'Acquisitions by year',
     //                               data: data.map(row => row.count)
     //                               }
     //                          ]
     //                     }
     //                }
     //           );
     //      }
     //      createChart();
     // }, [])


     return (
          <div className='charts'>
               <h2 className='h2'>Графики данных</h2>
               <div className='row'>
                    <canvas id="myChartPriority"></canvas>
                    <canvas id="myChartPolar"></canvas>
               </div>
               {/* <div>
                    <h1>Список данных</h1>
                    {rowTicktes.map(function (d, idx) {
                         return (<li key={idx}>{d.owner} - {d.title} - {d.category} - {d.description}</li>)
                    })}
               </div> */}
               <div className='d-flex flex-column align-items-center justify-content-center'>
                    <span>Создать отчет</span>
                    <button type="button" onClick={exportData} className="json mt-4">
                         Export Data
                    </button>
               </div>
          </div>
     );
}
export default Graph;