var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'cd98451_reviera',
    password: 'P70piUhI',
    database: 'cd98451_reviera'
});
/* GET home page. */
router.get('/get_text', function(req, res, next) {
    connection.getConnection(function(err, tempConnection){
        if(err){
            console.error(err);
        }else{
            tempConnection.release();
            console.log('connected to db');
            tempConnection.query('SELECT * FROM text', function(err, result){
                if(err){
                    console.error(err);
                }else{
                    res.json(result);
                }
            });
        }
    });
});

router.get('/slider_top_text', function(req, res, next) {
    connection.getConnection(function(err, tempConnection){
        if(err){
            console.error(err);
        }else{
            tempConnection.release();
            console.log('connected to db');
            tempConnection.query('SELECT * FROM slider_top', function(err, result){
                if(err){
                    console.error(err);
                }else{
                    console.log(result);
                    res.json(result);
                }
            });
        }
    });
});

router.get('/slider_middle_text', function(req, res, next) {
    connection.getConnection(function(err, tempConnection){
        if(err){
            console.error(err);
        }else{
            tempConnection.release();
            console.log('connected to db');
            tempConnection.query('SELECT * FROM slider_middle', function(err, result){
                if(err){
                    console.error(err);
                }else{
                    console.log(result);
                    res.json(result);
                }
            });
        }
    });
});

router.get('/get_resources', function(req, res, next) {
    connection.getConnection(function(err, tempConnection){
        if(err){
            console.error(err);
        }else{
            tempConnection.release();
            console.log('connected to db');
            tempConnection.query('SELECT * FROM resources', function(err, result){
                if(err){
                    console.error(err);
                }else{
                    res.json(result);
                }
            });
        }
    });
});

router.post('/update_text', function(req, res, next) {
    console.log(req.body.id);
    var id = req.body.id;
    var newValue = req.body.text;
    console.log('new value:' + newValue);
    connection.getConnection(function(err, tempConnection){
        if(err){
            console.error(err);
        }else{
            tempConnection.release();
            console.log('connected to db');
            //connection.escape(id)
            tempConnection.query('UPDATE text SET text="' + newValue + '" WHERE id=' + id, function(err, result){
                if(err){
                    console.error(err);
                }else{
                    res.send(result);
                }
            });
        }
    });
});

module.exports = router;
