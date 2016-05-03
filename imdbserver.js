var express = require("express"),
    app = express();
var nano = require('nano')('http://localhost:5984');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var per_page = 100,
    params = {
        include_docs: true,
        limit: per_page,
        descending: true
    };


app.use(express.static(__dirname + "/publicimdb"));

app.get('/movieslist', function(req, res) {
    nano.db.use('movies').list(params, function(error, body, headers) {
        res.json(body);
 
    });
});
app.post('/userRegister',function(req,res){
    var newuser=req.body;
    console.log(JSON.stringify(newuser)+ " Server: In the users post");
    nano.use('users').insert(newuser,newuser.name,function(err1,body1,header1){
            if(err1){
                //below statement is alternative for return res.send(err1.message,err1['status-code']);
                if(err1.message==='Document update conflict.'){
                    console.log(" "+ err1['status-code'] );
                return res.send(err1.message);
                }
            }
            res.status(200).send("Insert OK"+JSON.stringify(body1)+"header:"+JSON.stringify(header1));
        }); 
});

app.post('/login',function(req,res){
    var username=req.body;
    console.log(username.username);
    nano.db.use('users').get(username.username,function(err1,value){
        if(err1){
            console.log("Total Error: "+err1+" \n  Error Message:"+ err1.message);
            res.send(err1.message);
        }

        else
        res.send(value);
    }); 
});

app.post('/adminPost',function(req,res){
    var insertvalue={_id:req.body.moviename,
        rating : 0, 
        moviename : req.body.moviename, 
        year : req.body.year, 
        movielink : req.body.movielink, 
        genre : req.body.genre
    };
    nano.use('movies').insert(insertvalue,function(err1,body1,header1){
            if(err1){
                //below statement is alternative for return res.send(err1.message,err1['status-code']);
                if(err1.message==='Document update conflict.'){
                    console.log(" "+ err1['status-code'] );
                return res.send(err1.message);
                }
            }
            res.send(insertvalue);
   }); 
});

app.post('/getMovieName',function(req,res){
    var moviename=req.body;
    console.log(moviename.name);
    nano.db.use('movies').get(moviename.name,{ revs_info: true },function(err1,value){
        if(err1){
            console.log("Total Error: "+err1+" \n  Error Message:"+ err1.message);
            res.send(err1.message);
        }

        else
            console.log("moviename"+value.moviename+" movie revs_info: "+value._rev);
           res.send(value);
    });
});
app.post('/getUserMovieName',function(req,res){
    var movienames=req.body,
        usermovienames=[];
    console.log(movienames.name);

    for(var i=0;i<movienames.name.length;i++){
    nano.db.use('movies').get(movienames.name[i],function(err1,value){
        if(err1){
            console.log("Total Error: "+err1+" \n  Error Message:"+ err1.message);
            res.send(err1.message);
        }

        else
            console.log("moviename"+value.moviename+" movie revs_info: "+value._rev);
           usermovienames.push(value);
           //res.send(value);
    });
}
console.log("final data to send:"+usermovienames);
res.send(usermovienames);
});
app.post('/getuserinfo',function(req,res){
    var info=req.body;
    console.log(info.username);
    nano.db.use('users').get(info.username,{ revs_info: true },function(err1,value){
        if(err1){
            console.log("Total Error: "+err1+" \n  Error Message:"+ err1.message);
            res.send(err1.message);
        }

        else
            console.log("name:"+value.name+" password:"+value.password+" user revs_info: "+value._rev);
           res.send(value);
    });
});
 
app.post('/updateLikeinUser',function(req,res){
    console.log(req.body+ " hello  "+ req.body._rev);
    nano.use('users').insert({_id:req.body._id,_rev:req.body._rev,name:req.body.name, password : req.body.password, likes : req.body.likes, dislikes : req.body.dislikes},function(err1,body1,header1){
            if(err1){
                console.log("Error from server: " +err1);
                res.send(err1.message);
       }else{
        console.log(body1);
        res.send(body1);
       }

   });
});

app.post('/updatelike',function(req,res){
    console.log(req.body+ " hello  "+ req.body._rev);
    nano.use('movies').insert({_id:req.body._id,_rev:req.body._rev,rating:req.body.rating, moviename : req.body.moviename, year : req.body.year, movielink : req.body.movielink, genre : req.body.genre},function(err1,body1,header1){
            if(err1){
                console.log("Error from server: " +err1);
                res.send(err1.message);
       }else{
        console.log(body1);
        res.send(body1);
       }

   });
});

app.listen(3000);
console.log("server running");