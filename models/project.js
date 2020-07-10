const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    repoUrl: {
        type: String,
        required: true,
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
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
}
)

module.exports = mongoose.model("Project", projectSchema)
