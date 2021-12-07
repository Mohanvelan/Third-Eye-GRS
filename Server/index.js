const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');


const MongoClient = require('mongodb').MongoClient;
const { urlencoded } = require('body-parser');
const port = process.env.PORT || 5000;

const url = 'mongodb+srv://username:password@cluster0.eqwap.mongodb.net/complaint?retryWrites=true&w=majority';

const dburl = process.env.MONGODB_URI || url;

//middlewares

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
//app.use(express.static(path.join(__dirname, 'build')));

//mongodb connection
var dbo = null;
MongoClient.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
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
            'mobile': req.body.mobile, 'password': hpassword,
            'joined': new Date().toISOString()
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

app.post('/userDash', urlencodedParser, (req, res) => {
    
    let userid = req.body.email;

    var raised = 0, resolved = 0, pending = 0, suggested = 0;

    dbo.collection('raised').find({userid: userid}).toArray((err, data) => {
         raised = data.length;

      dbo.collection('raised').find({userid: userid, status: 'pending'}).toArray((err, data2) => {
          pending = data2.length;

          dbo.collection('raised').find({userid: userid, status: 'resolved'}).toArray((err, data3) => {
              resolved = data3.length;

              dbo.collection('raised').find({userid: userid, status: 'suggested'}).toArray((err, data4) => {
                 suggested = data4.length;

                 let result = {raised: raised, resolved: resolved, pending: pending, suggested: suggested};
                 res.send({ isErr: false, data: result});
              });                 
          });
      });
    });
});

app.post('/empDash', urlencodedParser, (req, res) => {
    
    let deptid = req.body.deptid;

    var received = 0, resolved = 0;

    dbo.collection('raised').find({deptid: deptid}).toArray((err, data) => {
        received = data.length;
        
        dbo.collection('raised').find({deptid: deptid, status: 'resolved'}).toArray((err, data2) => {
            resolved = data2.length;

            res.send({ isErr: false, data: {received: received, resolved: resolved} });
        });    
    });

});


//file uploading..
const fileStorage = multer.diskStorage ({
    destination: "./uploads/",
    filename: function(req, file, cb) {
      cb(null, file.originalname)
    }
});

const upload = multer({ storage: fileStorage });

app.post('/postComplaint', upload.single('proof'), (req, res) => {

    //console.log(req.file.path);

    var url = "https://thirdeye-grs.herokuapp.com/uploads/";

     let obj = {
        userid: req.body.userid, issueid: req.body.issueid,
        service: req.body.service, deptid: req.body.dept, 
        sub: req.body.sub, issue: req.body.issue,
        proof: {
           name: req.body.proofname,
           type: req.body.prooftype,
           path:  url +req.file.filename,
        },
        status: "pending",
        date: new Date().toISOString()
    };

    //console.log(JSON.stringify(obj));
    
    let convObj = {
       issueid: req.body.issueid,
       userid: req.body.userid,
       deptid: req.body.dept,
       closed: false,
       convers: []
    };

    dbo.collection('conversation').insertOne(convObj, (err, dt) => {
        if(err) throw err;

        if(dt !== null) {
            dbo.collection('raised').insertOne(obj, (err, data) => {
                if(err) throw err;

                if(data !== null) 
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
     
    let obj = { userid: req.body.email, status: 'pending' };

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

app.post('/resolved', urlencodedParser, (req, res) => {
     
    let obj = { userid: req.body.email, status: 'resolved' };

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

app.post('/getReceived', urlencodedParser, (req, res) => {
     
    let obj = { deptid: req.body.deptid };
   
    dbo.collection('raised').find(obj).toArray((err, result) => {
        if(err) throw err;

        if(result !== null) 
           res.send({ isErr: false, errMess: null, data: result });
        else 
          res.send({ isErr: true, errMess: result, data: [] });
    })
});

app.post('/getEmpResolved', urlencodedParser, (req, res) => {
     
    let obj = { deptid: req.body.deptid, status: 'resolved' };
   
    dbo.collection('raised').find(obj).toArray((err, result) => {
        if(err) throw err;

        if(result !== null) 
           res.send({ isErr: false, errMess: null, data: result });
        else 
          res.send({ isErr: true, errMess: result, data: [] });
    })
});

app.post('/postEmpReply', urlencodedParser, (req, res) => {
        
   let obj = { userid: req.body.userid, issueid: req.body.issueid };

   var date = new Date().toISOString();

   var myobj = {
        id: req.body.empid, 
        msg: req.body.msg,
        date: date
    };
   
   var options = {
        $push: {  convers: myobj }    
   };
        
   dbo.collection('conversation').updateOne(obj, options, (err, result) => {
       if(err) throw err;

       if(result !== null)
         res.send({ isErr: false, errMess: null });
       else
         res.send({ isErr: true, errMess: result });
   });

});


app.post('/postUserReply', urlencodedParser, (req, res) => {
        
    let obj = { userid: req.body.userid, issueid: req.body.issueid };
 
    var date = new Date().toISOString();
 
    var myobj = {
        id: req.body.userid, 
        msg: req.body.msg,
        date: date
      };

   var options = {
       $push: { convers: myobj } 
  };
  
    dbo.collection('conversation').updateOne(obj, options, (err, result) => {
        if(err) throw err;

        if(result !== null)
        res.send({ isErr: false, errMess: null });
        else
        res.send({ isErr: true, errMess: result });
    });
 }); 
 

 app.post('/getUserReply', urlencodedParser, (req, res) => {
     
     let obj = { userid: req.body.userid };

     dbo.collection('conversation').find(obj).toArray((err, data) => {
         if (err) throw err;

         if(data !== null) {
          // console.log(JSON.stringify(data));
           res.send({ isErr: false, errMess: null, data: data });
         }
         else
          res.send({ isErr: true, errMess: data, data: [] });
     });
 });

 
 app.post('/getEmpReply', urlencodedParser, (req, res) => {
     
    let obj = { deptid: req.body.deptid };

    dbo.collection('conversation').find(obj).toArray((err, data) => {
        if (err) throw err;

        if(data !== null) {
         // console.log(JSON.stringify(data));
          res.send({ isErr: false, errMess: null, data: data });
        }
        else
         res.send({ isErr: true, errMess: data, data: [] });
    });
});


app.post('/handleResolve', urlencodedParser, (req, res) => {

    let obj = { userid: req.body.userid, issueid: req.body.issueid };

    let options = { $set: {status: 'resolved', empid: req.body.empid} };

    dbo.collection('raised').updateOne(obj, options, (err, result) => {
         if(err) throw err;
    
        dbo.collection('conversation').updateOne(obj, { $set: {closed: true} }, (err, result2) => {
          if(result !== null && result2 !== null)
            res.send({ isErr: false, errMess: null });
          else 
            res.send({ isErr: true, errMess: result });  
        });
    });
});

app.post('/handleIgnore', urlencodedParser, (req, res) => {

    let obj = { userid: req.body.userid, issueid: req.body.issueid };

    let options = { $set: {status: 'ignored', empid: req.body.empid} };

    dbo.collection('raised').updateOne(obj, options, (err, result) => {
         if(err) throw err;
    
        dbo.collection('conversation').updateOne(obj, { $set: {closed: true} }, (err, result2) => {
          if(result !== null && result2 !== null)
            res.send({ isErr: false, errMess: null });
          else 
            res.send({ isErr: true, errMess: result });  
        });
    });
});

app.post('/handleSuggested', urlencodedParser, (req, res) => {

    let obj = { userid: req.body.userid, issueid: req.body.issueid };

    let options = { $set: {status: 'suggested', empid: req.body.empid} };

    dbo.collection('raised').updateOne(obj, options, (err, result) => {
         if(err) throw err;
    
        dbo.collection('conversation').updateOne(obj, { $set: {closed: true} }, (err, result2) => {
          if(result !== null && result2 !== null)
            res.send({ isErr: false, errMess: null });
          else 
            res.send({ isErr: true, errMess: result });  
        });
    });
});

app.post('/handleWithdraw', urlencodedParser, (req, res) => {

    let obj = { userid: req.body.userid, issueid: req.body.issueid };

    let options = { $set: {status: 'withdrawn'} };

    dbo.collection('raised').updateOne(obj, options, (err, result) => {
        if(err) throw err;
   
       dbo.collection('conversation').updateOne(obj, { $set: {closed: true} }, (err, result2) => {
         if(result !== null && result2 !== null)
           res.send({ isErr: false, errMess: null });
         else 
           res.send({ isErr: true, errMess: result });  
       });
   });

});

/*app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});*/


app.listen(port, () => {
    console.log('server is running on port:'+ port);
});