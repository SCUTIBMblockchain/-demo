const jwt = require('koa-jwt')

var client = new BusinessNetworkConnection(fs);

const getQuery = function* (){
	// Build and execute a query.
	return client.connect('testprofile', 'businessNetworkIdentifier', 'WebAppAdmin', 'DJY27pEnl16d')
	.then(function () {
		var query = client.buildQuery('SELECT org.acme.sample.SampleAsset WHERE (value == _$inputValue)');
		return client.query(query, { inputValue: 'blue' })
	})
	.then(function (assets) {
		assets.forEach(function (asset) {
			console.log("assert process good")
			// Process each asset.
		});
	})
	.catch(function (error) {
		console.log("Have an error when connecting");
		// Add optional error handling here.

	});
}
const postUserAuth = function* (){
	const data = this.request.body;
	const userInfo = {
		name: admin,
		password: adminpw
	};
	if(userInfo !== null){                                  //passwd not right
		if(userInfo.password !== 'adminpw'){
			this.body = {
			success: false,
			info: 'WrongInfo'
		    }
	    }else{                                              //messages pass to userToken
		const userToken = {
			name: userInfo.name,
			password: userInfo.password
		}
		const secret = 'vue-koa-demo';                      //config the cryptoKey
		const token = jwt.sign(userToken, secret);          //sign the token
		    this.body = {
		    success: true,
			token: token                                    //return the token
		    }
	    }
    	}else{
            this.body = {
              	success:false,
              	info: 'Not exists!'
            }
        }
	}

module.exports = {
	getQuery,
	postUserAuth
}