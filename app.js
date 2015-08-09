(function(){
	var employees = [
				    {"id": 1, "name": "Fulano", "active": true},
				    {"id": 2, "name": "Ciclano", "active": false},
				    {"id": 3, "name": "Beltrano", "active": true},
				    {"id": 4, "name": "Joselito", "active": true},
				    {"id": 5, "name": "Umatalde", "active": true}
				]
	var save = function(db, callback) {

	  var list = db.collection('employee');
	  list.insert(employees, function(err, res) {
	    assert.equal(err, null);
	    assert.equal(employees.length, res.result.n);
	    assert.equal(employees.length, res.ops.length);
	    console.log(employees.length + " records inserted");
	    callback(res);
	  });
	}

	var update = function(db, callback) {
	  var list = db.collection('employee');
	  list.update({ id : 1 }
	    , { $set: { name : 'Fulano de Tal' } }, function(err, res) {
	    assert.equal(err, null);
	    assert.equal(1, res.result.n);
	    console.log("Updated record with id = 1.");
	    callback(res);
	  });  
	}

	var remove = function(db, callback) {
	  var list = db.collection('employee');
	  list.remove({ id : 3 }, function(err, res) {
	    assert.equal(err, null);
	    assert.equal(1, res.result.n);
	    console.log("Removed record with id = 3.");
	    callback(res);
	  });    
	}

	var findOne = function(db, callback) {
	  var list = db.collection('employee');
	  list.find({}).toArray(function(err, res) {
	    assert.equal(err, null);
	    assert.equal(4, res.length);
	    console.log("Records found:");
	    console.dir(res)
	    callback(res);
	  });      
	}

	var MongoClient = require('mongodb').MongoClient
	  , assert = require('assert');

	var url = 'mongodb://localhost:27017/mdbexample';
	
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  console.log("Connected to the server using URL: " + url);

	  save(db, function() {
	    update(db, function() {
	      remove(db, function() {
	        findOne(db, function() {
	          db.close();
	        });
	      });
	    });
	  });
	});

})();
