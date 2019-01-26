var express = require('express');
const patient = require('../src/patient');
var router = express.Router();

/* POST add patient page. */
router.post('/addPatient', function (req, res) {
    patient.addPatient(req.body, function (error, result) {
        if (error) {
            res.render('error', { message: error });
        }
        else {
            res.render('patient/addPatient.hbs', { result: result, layout: 'patientLayout' })
        }
    })
});

/* GET add patient page. */
router.get('/addPatient', function (req, res) {
    res.render('patient/addPatient.hbs', { layout: 'patientLayout' })
});



/* GET get patient page. */
router.get('/getPatient', function (req, res) {
    // console.log(req.params.doctorId)
    if(req.query.patientId) {
        patient.getPatient(req.query.patientId, function (error, result) {
            if(!error){
                res.render('patient/getPatient.hbs', { layout: 'patientLayout', data: result, id:req.query.patientId});
            }
            else {
                res.render('error', {message: error});
            }
        })
    }
    else {
        res.render('patient/getPatient.hbs', { layout: 'patientLayout'});
    }
});




module.exports = router;
