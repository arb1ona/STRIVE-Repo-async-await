const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const studentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  profession: {
    type: String
  },
  email: {
    type: String
  },
  state: {
    type: String
  },
  // markdown: {
  //   type: String,
  //   required: true
  // },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
})

studentSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }

  // if (this.markdown) {
  //   this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
  // }

  next()
})

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase())

}

module.exports = mongoose.model('Student', studentSchema)