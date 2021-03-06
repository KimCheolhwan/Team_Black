var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
var request = require('request');
var fs = require('fs');


//보안 세션
var session = require('express-session');
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
var MongoStore = require('connect-mongo')(session);

//음성인식
//var client_id = 'ysnCnGKWFoVq2v3SVGrw'; //김철환
var client_id = 'yDIuTKSd_AOmop02nuqs';
//var client_secret = 'MZquXqDIZg'; //김철환
var client_secret = '11adVBlANp';

mongoose.connect('mongodb://127.0.0.1/test');
// Configuration
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
app.use(session({
   secret: '1234DSFs@adsdfqwff1234!@#$asd',
   resave: false,
   saveUninitialized: true,
   store: new MongoStore({mongooseConnection: mongoose.connection,
                          ttl : 2 * 24 * 60 * 60})
}));
mongoose.connect('mongodb://127.0.0.1/test');
var description=[];
var index = 0;
var audio_length=0;
var UserSchema = mongoose.Schema({
  id: String,
  password: String,
  nickname: String,
  salt:String
});
var User = mongoose.model('User', UserSchema);

/* GET home page. */
app.get('/api', function(req, res) {
  console.log("fetching server");
});

app.post('/api/create', function(req, res) {
  User.find({id:req.body.id},function(err,data){
    if(err)
      console.log(err);
    else if(Object.keys(data).length===0){
      hasher({password:req.body.password}, function(err, pass, salt, hash){
        User.create({
          id:req.body.id,
          password:hash,
          nickname:req.body.nickname,
          salt:salt
        });
        req.session.nicnkname = req.body.nickname;
        req.session.save(function(){
          res.json(true);
        });
      });
    }else{
      res.json(false);
    }
  });
});
app.post('/api/login',function(req,res){
    User.find({
      id:req.body.id
    },function(err,data){
      if(err){
        console.log('error');
        res.send(err);
      }
      else if(Object.keys(data).length===0){
        res.json(false);
      }else{
        return hasher({password:req.body.password, salt:data[0].salt}, function(err, pass, salt, hash){
          if(hash === data[0].password){
            req.session.nickname= req.body.nickname;
            req.session.save(function(){
              res.json(data);
            });
          }
        });
        console.log('실패!');
        res.json(false);
      }
    });
});

app.post('/api/description', function(res,req){
  var list = fs.readdirSync('../test/src/assets/audio');
  for(var i=0; i<list.length;i++){
    fs.unlinkSync('../test/src/assets/audio/tts'+i+'.mp3');
  }
  console.log(list.length);
  description=req.req.body;
  for(var j=0; j<description.length;j++){
    var api_url = 'https://openapi.naver.com/v1/voice/tts.bin';
    var request = require('request');
    var options = {
          url: api_url,
          form: {'speaker':'mijin', 'speed':'0', 'text':description[j]},
          headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
        };

        var writeStream = fs.createWriteStream('../test/src/assets/audio/tts'+j+'.mp3');
        console.log(j);
        var _req = request.post(options).on('response', function(response) {
          });
        _req.pipe(writeStream); // file로 출력
      }
});

app.get('/api/tts',function(req,res){

  // res.json(index);
});

app.listen(8080);
console.log("App listening on port 8080");

// const http = require('http');
//
// const hostname = '127.0.0.1';
// const port = 3000;
//
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });
//
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
