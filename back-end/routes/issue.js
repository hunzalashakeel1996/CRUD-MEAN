const {Issue, validate} = require('../models/issue');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    try{
        const issues = await Issue.find();
        res.json(issues);
    }
    catch(ex){
        res.status(500).send("something wrong");
    }
    
});

router.get('/:id', async(req, res) => {
    const issue = await Issue.findById(req.params.id);
    return res.json(issue);
});

router.post('/add', async(req, res) => {
    try{
        const {error} = validate(req.body);
        if(error) return res.status(400).send(error.details.message);

        let issue = new Issue({
            title: req.body.title,
            responsible: req.body.responsible,
            description: req.body.description,
            severity: req.body.severity,
            status: req.body.status
        });
        issue = await issue.save();
        res.json({'issue': 'Added Successfully'});
    }
    catch(err){
        console.error(err); 
        res.status(500).send(err); 
    }
    
});

router.put('/edit/:id', async(req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(errors.detail.message);

    let issue = await Issue.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        responsible: req.body.responsible,
        description: req.body.description,
        severity: req.body.severity,
        status: req.body.status
    }, {new: true});

    if(!issue) return res.status(404).send("Issue Not Found");
    
    issue = await issue.save();
    res.json({'issue': 'Edit Successfully'});
});

router.delete('/delete/:id', async(req, res) => {
    let issue = await Issue.findByIdAndDelete(req.params.id);
    
    if(!issue) return res.status(404).send("Issue Not Available");

    res.json({'issue': 'Issue Deleted Successfully'});
}); 

module.exports = router;