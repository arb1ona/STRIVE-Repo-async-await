const express = require('express')
const mongoose = require('mongoose')
const Student = require('./models/student')
const studentRouter = require('./routes/students')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost:27017/students-repo', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const students = await Student.find().sort({ createdAt: 'desc' })
  res.render('students/index', { students: students })
})

app.use('/students', studentRouter)

app.listen(5000)
