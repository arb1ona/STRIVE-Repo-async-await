const express = require('express')
const Student = require('./../models/student')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('students/new', { student: new Student() })
})

router.get('/edit/:id', async (req, res) => {
  const student = await Student.findById(req.params.id)
  res.render('students/edit', { student: student })
})

router.get('/:slug', async (req, res) => {
  const student = await Student.findOne({ slug: req.params.slug })
  if (student == null) res.redirect('/')
  res.render('students/show', { student: student })
})

router.post('/', async (req, res, next) => {
  req.student = new Student()
  next()
}, saveStudentAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
  req.student = await Student.findById(req.params.id)
  next()
}, saveStudentAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function saveStudentAndRedirect(path) {
  return async (req, res) => {
    let student = req.student
    student.title = req.body.title
    student.profession = req.body.profession
    student.email = req.body.email
    student.state = req.body.state
    // student.markdown = req.body.markdown
    try {
      student = await student.save()
      res.redirect(`/students/${student.slug}`)
    } catch (e) {
      res.render(`students/${path}`, { student: student })
    }
  }
}

module.exports = router