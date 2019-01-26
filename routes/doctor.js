var express = require('express');
const doctor = require('../src/doctor');
var router = express.Router();

/* POST add doctor page. */
router.post('/addDoctor', function(req, res) {
    doctor.addDoctor(req.body, function(error, result){
        if(error){
            res.render('error', {message: error});
        }
        else {
            res.render('doctor/addDoctor.hbs', {result: result, layout: 'doctorLayout'})
        }
    })
});

/* GET add doctor page. */
router.get('/addDoctor', function(req, res) {
    res.render('doctor/addDoctor.hbs', {layout: 'doctorLayout'})
});

/* GET doctor details page. */
router.get('/getDoctor', function(req, res) {
    if(req.query.doctorId){
        doctor.getDoctor(req.query.doctorId, function(error, result){
            if(error){
                res.render('error', {message: error});
            }
            else {
                res.render('doctor/getDoctor.hbs', {layout: 'doctorLayout', data: result, id: req.query.doctorId});
            }
        })
    }
    else {
        res.render('doctor/getDoctor.hbs', {layout: 'doctorLayout'});
    }
});

/* GET home page. */
router.get('/allPatientsOfDoctor', function(req, res) {
    if(req.query.doctorId){
        doctor.getAllPatients(req.query.doctorId, function(error, result){
            if(error){
                res.render('error', {message: error});
            }
            else {
                res.render('doctor/getPatientList.hbs', {layout: 'doctorLayout', data:result});
            }
        });
    }
    else {
        res.render('doctor/getPatientList.hbs', {layout: 'doctorLayout'});
    }
});



  
module.exports = router;
