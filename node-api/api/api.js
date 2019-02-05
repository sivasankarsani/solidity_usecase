const getapi = require('../medical')

module.exports = function(app){
    app.get('/getPatientReceipt/:address',getapi.getPatientData );
    app.post('/setPatientReceipt',getapi.setPatientData);
}