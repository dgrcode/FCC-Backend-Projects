// Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let assert = require('assert');
let $;

require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
 
    $ = require("jquery")(window);
});

let should = chai.should();

chai.use(chaiHttp);

describe('Server', function() {

	it('Should return a string', (done) => {
		chai.request(server)
				.get('/')
				.end((err, res) => {
					res.should.have.status(200);
					res.text.should.be.a('string');
					done();
				});
	});

	let testingInputs = ['1484611200', 'escarabajo', null, '][', '[]', '34234323300'];
	for (let input of testingInputs) {
		it('Should have the same answer than the example web app. Input: ' + input, (done) => {
			$.get('https://timestamp-ms.herokuapp.com/' + input)
					.done(answer => {
							chai.request(server)
									.get('/' + input)
									.end((err, res) => {
										assert.equal(res.text, JSON.stringify(answer));
										done();
									});
					});
			
		})
		
	};	

});