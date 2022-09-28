const PORT = 8000
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const axios = require('axios')

const app = express()
app.use(cors())
app.use(express.json())

const url = 'https://5c10676b-d4dd-4aa1-80fc-1f6f5b732ab2-europe-west1.apps.astra.datastax.com/api/rest/v2/namespaces/tickets/collections/tasks'
const token = 'AstraCS:vmPanQIcpauheuiSXNBSNmBA:a117ce3da557d4627aa0f8d80a281fdbd01339ad8d886371f9d976cc190ef764'


app.post('/tickets', async (req, res) =>{
     const formData = req.body.formData

     const option = {
          method: 'POST', 
          headers: {
               Accepts: 'application/json', 
               'X-Cassandra-Token': token, 
               'Content-Type': 'application/json'
          },
          data: formData
     }

     try {
          const response = await axios(url, option)
          res.status(200).json(response.data)
     } catch (err){
          console.log(err)
          res.status(500).json({massage: err})
     }
})


app.listen(PORT, () => console.log('server is running on PORT' + ' ' + PORT))