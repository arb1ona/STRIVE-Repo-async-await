const express = require('express')
const Project = require('../models/project')
const router = express.Router()

router.get('students/:slug/', (req, res) => {
    res.render('students/:slug/projects', { project: new Project() })
})
router.get('/edit/:id', async (req, res) => {
    const project = await Project.findById(req.params.id)
    res.render('projects/edit', { project: project })
})

router.get('/:slug', async (req, res) => {
    const project = await Project.findOne({ slug: req.params.slug })
    if (project == null) res.redirect('/')
    res.render('projects/show', { project: project })
})

router.post('/projects/new', async (req, res, next) => {
    req.project = new Project()
    next()
}, saveProjectAndRedirect('new'))

// router.put('/:id', async (req, res, next) => {
//     req.project = await Project.findById(req.params.id)
//     next()
// }, saveProjectAndRedirect('edit'))

function saveProjectAndRedirect(path) {
    return async (req, res) => {
        let project = req.project
        project.title = req.body.title
        project.repoUrl = req.body.repoUrl
        project.markdown = req.body.markdown
        try {
            project = await project.save()
            res.redirect(`/students/${project.slug}`)
        } catch (e) {
            res.render(`students/${path}`, { project: project })
        }
    }
}

module.exports = router