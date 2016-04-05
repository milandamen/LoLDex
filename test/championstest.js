var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should();

var app = require('express')();
var exphbs = require('express-handlebars');
var route = require('../routes/champions');

app.engine('hbs', exphbs({extname:'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');

app.use('/', route);

function makeRequest(route, statusCode, done){
	request(app)
		.get(route)
		.expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }

			done(null, res);
		});
};

describe('Testing champions routes', function(){
    describe('without params', function(){
        it('should return all champions', function(done){
            makeRequest('/champions', 200, function(err, res){
                if(err){ return done(err); }

                expect(res.body).to.have.property('data');
                expect(res.body.data).to.have.property('Zyra');

                done();
            });
        });
    });
    
    describe('web version', function(){
        it('should return all champions', function(done){
            makeRequest('/web/champions', 200, function(err, res){
                if(err){ return done(err); }
                done();
            });
        });
    });
    
});

describe('Testing champion route', function() {
    describe('with correct id', function() {
        it('Should return the champion', function(done) {
            makeRequest('/champions/412', 200, function(err, res) {
                if(err){ return done(err); }
                
                expect(res.body).to.have.property('id');
                expect(res.body.id).to.equal(412);
                expect(res.body).to.have.property('key');
                expect(res.body.key).to.equal('Thresh');
                
                done();
            });
        });
    });
    
    describe('with incorrect id', function() {
        it('Should not return the champion', function(done) {
            makeRequest('/champions/noid', 500, function(err, res) {
                if(err){ return done(err); }
                
                console.log(res.body);
                
                done();
            });
        });
    });
});

describe('Testing home route', function() {
    it('Should return the home page', function(done) {
        makeRequest('/', 200, function(err, res) {
            if(err){ return done(err); }
            done();
        });
    });
});

	//describe('with invalid params', function(){
		//it('should return 400 when date is invalid', function(done){
			//makeRequest('/35/2/2000', 400, done);
		//});

		//it('should return 400 when date is not numeric', function(done){
			//makeRequest('/test/me/now', 400, done);
		//});
	//});

	//describe('with valid params', function(){
		//it('should return the right date', function(done){
			//makeRequest('/10/3/2015', 200, function(err, res){
				//if(err){ return done(err); }

				//expect(res.body.date).to.not.be.undefined;
				//expect(res.body.date).to.equal('10-03-2015');
				//done();
			//});
		//});

		//it('should return the right day name', function(done){
			//makeRequest('/10/3/2015', 200, function(err, res){
				//if(err){ return done(err); }

				//expect(res.body.dayNameNL).to.not.be.undefined;
				//expect(res.body.dayNameNL).to.equal('Dinsdag');
				//done();
			//});
		//});

		//it('should return no holiday when on a normal day', function(done){
			//makeRequest('/10/3/2015', 200, function(err, res){
				//if(err){ return done(err); }

				//expect(res.body.isHolidayNL).to.be.a('Boolean');
				//expect(res.body.isHolidayNL).to.be.false;
				//expect(res.body.holidayNameNL).to.be.undefined;
				//done();
			//});
		//});
	//});

	//describe('on special days', function(){
		//it('should return Nieuwjaarsdag on 01-01-2014');
		//it('should return Koningsdag on 27-04-2015');
		//it('should return Bevrijdingsdag on 05-05-2020');
		//it('should return Eerste Kerstdag on 25-12-2016');
		//it('should return Tweede Kerstdag on 26-12-2016');
		//it('should return Eerste Paasdag on 05-04-2015');
		//it('should return Tweede Paasdag on 02-04-2018');
		//it('should return Hemelvaartsdag on 18-05-2023');
		//it('should return Eerste pinksterdag on 09-06-2019');
		//it('should return Tweede pinksterdag on 05-06-2017');
	//})


