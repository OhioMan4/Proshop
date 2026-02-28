const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const cors = require('cors')
const path = require('path')
const connectDB = require('./config/db')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')

dotenv.config()
connectDB()

const app = express()

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://frontend:3000',
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.yellow.bold))
