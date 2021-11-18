const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});
const bcrypt = require('bcrypt');
const multer = require('multer');


const MongoClient = require('mongodb').MongoClient;
const { urlencoded } = require('body-parser');
const port = 5000;

const url = 'mongodb+srv://Mohan:Mohan9792@cluster0.eqwap.mongodb.net/complaint?retryWrites=true&w=majority';

//middlewares

app.use(cors());
app.use(express.json());
//app.use('/', route1);

//mongodb connection
var dbo = null;
MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    dbo = db.db('complaint');
});

app.post('/userlogin', urlencodedParser, (req, res) => {

    var uname = req.body.uname;

    var obj = {'email': uname };

    dbo.collection('user').find(obj).toArray((err, result) => {
        if(err) throw err;

        if(result != null && result.length == 1){
        
            bcrypt.compare(req.body.pwd, result[0].password, (err, flag) => {
                if(err) throw err;
                
                if(flag)
                res.send({isLogin: true, msg: "User login successfull", data: result});
                else
                res.send({isLogin: false, msg: "Invalid email or password", data: result});
            });
        } 
        else
        res.send({isLogin: false, msg: "Invalid email or password", data: result});
    });
   
});

app.post('/adminlogin', urlencodedParser, (req, res) => {


    var obj = { 'emp_id': req.body.eid, 'password': req.body.pwd };
    
    dbo.collection('employee').find(obj).toArray((err, result) => {
        if(err) throw err;
         
        if(result != null && result.length == 1)
        res.send({isLogin: true, msg: "Emp login successfull", data: result});
        else
        res.send({isLogin: false, msg: "Invalid empid or password", data: result});
        
    });
});

app.post('/registerUser', urlencodedParser, (req, res) => {

    bcrypt.hash(req.body.pwd, 10, (err, hash) => {

        if(err) throw err;
        
        console.log(hash);
        var hpassword = hash;
        
        var obj = {
            'fname': req.body.fname, 'lname': req.body.lname,
            'email': req.body.email, 'aadhar': req.body.aadhar,
            'mobile': req.body.mobile, 'password': hpassword
        };
    
       
        dbo.collection('user').find(obj).toArray((err, data) => { 
            if (err) throw err;

            if(data != null)
              res.send({isRegister: false, msg: "User Already Exist...", data: null});
        });

        dbo.collection('user').insertOne(obj, (err, result) => {
             if(err) throw err;
    
             if(result != null)
               res.send({isRegister: true, msg: "Registeration successfull", data: result});
            else
               res.send({isRegister: false, msg: "Registeration failed", data: null});
        });
    });
});

app.get('/getdept', (req, res) => {
       

      dbo.collection('department').find({}).toArray((err, data) => {

         if(err) throw err;

         if(data != null){
           //console.log('hello\n',JSON.stringify(data));
           res.send({isErr: false, data: data});
         }
         else{
           res.send({isErr: true, data: null});
         }
      });
});

app.post('/getProfile', urlencodedParser, (req, res) => {
     
    let obj = { email: req.body.email };

     dbo.collection('user').find(obj).toArray((err, data) => {
         
          if(err) throw err;

          if(data != null) {
            res.send({isErr: false, data: data });
          }
          else 
           res.send({isErr: true, data: null});
     });
});

app.post('/getEmpProfile', urlencodedParser, (req, res) => {
    
    let obj = { emp_id: req.body.empid };

    dbo.collection('employee').find(obj).toArray((err, data) => {
        if(err) throw err;

        if(data != null) {
          res.send({isErr: false, data: data });
        }
        else 
         res.send({isErr: true, data: null});
    });
});

app.post('/dashboard', urlencodedParser, (req, res) => {
    
    let obj = {userid: req.body.email};

    dbo.collection('dashboard').find(obj).toArray((err, data) => {
        if(err) throw err;

        if(data !== null) 
          res.send({ isErr: false, data: data });
    });
});

//file uploading..
const fileStorage = multer.diskStorage ({
    destination: (req, file, cb) => {
      cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
});

const upload = multer({ storage: fileStorage });

app.post('/postComplaint', urlencodedParser, upload.single('proofData'), (req, res) => {

    console.log('ln-179:',req.file);

     let obj = {
        userid: req.body.userid, issueid: req.body.issueid,
        service: req.body.service, deptid: req.body.dept, 
        sub: req.body.sub, issue: req.body.issue,
        proof: {
           proofname: req.body.proof.proofname,
           prooftype: req.body.proof.prooftype
        },
        proofData: path.join(__dirname,'uploads/')+req.file.filename,
        status: req.body.status,
        date: req.body.date
    };

    console.log(JSON.stringify(obj));

    dbo.collection('raised').insertOne(obj, (err, data) => {
        if(err) throw err;

        if(data !== null) {
            dbo.collection('pending').insertOne(obj ,(err, data2) => {
               if(err) throw err;

               if(data2 !== null)
                  res.send({isErr: false, msg: 'Complaint Raised Successfully...'});
               else
                 res.send({isErr: true, msg: 'failed...'});
            });
        }
        else
          res.send({isErr: true, msg: 'failed...'});
    });
});

app.post('/raised', urlencodedParser, (req, res) => {
     
    let obj = { userid: req.body.email };

     dbo.collection('raised').find(obj).toArray((err, result) => {
         if(err) throw err;

        if(result !== null){
            //console.log('the raised data: ',JSON.stringify(result));
            res.send({isErr: false, errMess: null, data: result});
        }
         else {
           //console.log('Couldn\'t get raised data');
           res.send({isErr: true, errMess: result, data: []});
        }
     });
});

app.post('/pending', urlencodedParser, (req, res) => {
     
    let obj = { userid: req.body.email };

     dbo.collection('pending').find(obj).toArray((err, result) => {
         if(err) throw err;

        if(result !== null){
            //console.log('the raised data: ',JSON.stringify(result));
            res.send({isErr: false, errMess: null, data: result});
        }
         else {
           //console.log('Couldn\'t get raised data');
           res.send({isErr: true, errMess: result, data: []});
        }
     });
});

app.post('/resolved', urlencodedParser, (req, res) => {
     
    let obj = { userid: req.body.email };

     dbo.collection('resolved').find(obj).toArray((err, result) => {
         if(err) throw err;

        if(result !== null){
            //console.log('the raised data: ',JSON.stringify(result));
            res.send({isErr: false, errMess: null, data: result});
        }
         else {
           //console.log('Couldn\'t get raised data');
           res.send({isErr: true, errMess: result, data: []});
        }
     });
});

app.post('/getReceived', urlencodedParser, (req, res) => {
     
    let obj = { deptid: req.body.deptid };
   
    dbo.collection('pending').find(obj).toArray((err, result) => {
        if(err) throw err;

        if(result !== null) 
           res.send({ isErr: false, errMess: null, data: result });
        else 
          res.send({ isErr: true, errMess: result, data: [] });
    })
});

app.post('/getEmpResolved', urlencodedParser, (req, res) => {
     
    let obj = { deptid: req.body.deptid };
   
    dbo.collection('resolved').find(obj).toArray((err, result) => {
        if(err) throw err;

        if(result !== null) 
           res.send({ isErr: false, errMess: null, data: result });
        else 
          res.send({ isErr: true, errMess: result, data: [] });
    })
});


app.listen(port, () => {
    console.log('server is running on port:'+ port);
});