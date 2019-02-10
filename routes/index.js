var express = require('express');
var router = express.Router();
var blockchain = require('blockchain.info');
var MyWallet = require('blockchain.info/MyWallet');
var exchange = require('blockchain.info/exchange')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create/*', function (req,res, next) {
  MyWallet.create(req.query.password, '7d6388e1-1bec-413c-9983-8d392b34804c',
      {email: req.query.email, hd: true, apiHost: 'http://127.0.0.1:3000/'}).then((response) => {
        res.json({response: response});
  })
});

router.get('/balance/*', function (req,res,next) {
    var options = { apiCode: '7d6388e1-1bec-413c-9983-8d392b34804c', apiHost: 'http://127.0.0.1:3000/' }
    var wallet = new MyWallet(req.query.id, req.query.pass, options)
    wallet.getBalance().then(function (response) {
      console.log('My balance is %d!', response.balance);
      res.json({balance: response});
    }).catch((error) => {
      console.log(error);
    })
});

router.get('/send/*', function (req,res,next) {
    var options = { apiCode: '7d6388e1-1bec-413c-9983-8d392b34804c', apiHost: 'http://127.0.0.1:3000/' }
    var wallet = new MyWallet(req.query.id, req.query.pass, options)
    wallet.send(req.query.address, req.query.amount).then((response) => {
      res.json(response);
    })
});

router.get('/rates/*', function (req,res,next) {
    exchange.getTicker({currency: req.query.curr}).then((response) => {
      res.json(response);
    })
})

router.get('/exchange/*', function (req,res,next) {
    exchange.toBTC(req.query.amount, req.query.curr).then((response) => {
      res.json({inbtc :response});
    })
})



module.exports = router;
