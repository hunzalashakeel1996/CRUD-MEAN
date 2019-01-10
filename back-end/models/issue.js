const mongoose = require('mongoose');
const Joi = require("joi");

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 3
    },
    responsible: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        maxlength: 200,
        minlength: 3
    },
    severity: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 3
    },
    status: {
        type: String,
        default: 'open'
    }
});

const Issue = mongoose.model('Issue', issueSchema);


function validate(issue){
    const schema = {
        title: Joi.string().min(3).max(20).required(),
        responsible: Joi.string().min(3).max(20).required(),
        description: Joi.string().min(3).max(200).required(),
        severity: Joi.string().min(3).max(20).required(),
        status: Joi.string()
    };

    return Joi.validate(issue, schema);
}


exports.Issue = Issue;
exports.validate = validate;
exports.issueSchema = issueSchema;