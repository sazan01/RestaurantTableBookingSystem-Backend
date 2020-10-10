require('./database/connection');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./booking/auth');

const User = require('./models/regis');
const Dish = require('./models/addDish');
const Table = require('./models/addTable');
const Reservation = require('./models/reserveTable');
const Order = require('./models/orderFood');
const Contacts = require('./models/saveContact');

var multer = require('multer');
var path = require('path');
const app = express();

app.use(cors());

app.use('/imageDish', express.static('./public/dishupload'));
app.use('/imageTable', express.static('./public/tableupload'));

app.use(bodyParser.urlencoded({extended: false}));

app.post("/register", (req, res) =>{
	var myData = new User(req.body);
	myData.save().then(function(){
        res.send('User registered Successfully');
        console.log(myData);
        console.log("Registered successfully");

	}).catch(function(e){
		res.send(e)
	});
});

app.post("/login", async function(req, res) {
    const user = await User.checkCrediantialsDb(req.body.email, req.body.pass);
    const token = await user.generateAuthToken();
    console.log(token)
    res.json(user)
    //    console.log(user);
  
})

// app.post('/v1/users/login',function(req,res,next){
//     res.status(205);
//     res.send({authController
//         "message":"Success Login",
//         "token": req.genToken,
//     });
//     console.log(req.genToken)
// })

// function sendUserData(req,res,next){
//     regis.User.findOne({
//         where:{email:req.body.email}})
//         .then(function(result){
//             if(result != null){
//                 res.send({
//                     "message": "Success Login",
//                     "token": req.getToken,
//                     "result": result
//                 });
//             }
//         })
//         .catch(function(err){
//             next({"status":500, "message":err});
//         })
// }

var storage = multer.diskStorage({
    destination: './public/dishupload',
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, file.fieldname + '-' + Date.now() + ext);
    }
});

var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 100000000 }
});

app.post("/dishUploadImage",upload.single('imageFile'), (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    });

    app.post("/dishAdd", function(req,res){
        var data = new Dish(req.body);
        data.save().then(function(){
            res.send('Dish Added Successfully');
        }).catch(function(e){
            res.send(e)
        });
    })

    var storage = multer.diskStorage({
        destination: './public/tableupload',
        filename: (req, file, callback) => {
            let ext = path.extname(file.originalname);
            callback(null, file.fieldname + '-' + Date.now() + ext);
        }
    });
    
    var imageFileFilter = (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('You can upload only image files!'), false);
        }
        cb(null, true);
    };
    
    var upload = multer({
        storage: storage,
        fileFilter: imageFileFilter,
        limits: { fileSize: 100000000 }
    });

    app.post("/tableUploadImage",upload.single('imageFile'), (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    });

    app.post("/tableAdd", function(req,res){
        var data = new Table(req.body);
        data.save().then(function(){
            res.send('Table Added Successfully');
        }).catch(function(e){
            res.send(e)
        });
    })

    app.get('/getTable', function(req,res){
        Table.find().then(function(table){
            res.send(table);
        })
        .catch(function(e){res.send(e)})
    })

    app.get('/getDish', function(req,res){
        Dish.find().then(function(dish){
            res.send(dish);
        })
        .catch(function(e){res.send(e)})
    })


    app.put('/Dishupdate/:id', function(req,res){
        const id = req.params.id.toString();
        Dish.findByIdAndUpdate(id,req.body,{new:true})
        .then(function(dish){
            console.log(dish);
            res.status(201).json({
                message: "The Product was Updated successfully"
            });
        }).catch(function(err){
            console.log(err);
            res.status(500).json({
                message: err
            });
        })
        }); 

        app.get('/getByIdDish/:id', function(req, res){
            const id = req.params.id.toString();
            console.log(id);
            Dish.findById(id)
            .then(function(dish){
            console.log(dish);
            res.status(201).json(dish);
            })
            .catch(function(e){
                res.status(500).json({ message: e});
            });
            });

            app.put('/Tableupdate/:id', function(req,res){
                const id = req.params.id.toString();
                Table.findByIdAndUpdate(id,req.body,{new:true})
                .then(function(table){
                    console.log(table);
                    res.status(201).json({
                        message: "The Product was Updated successfully"
                    });
                }).catch(function(err){
                    console.log(err);
                    res.status(500).json({
                        message: err
                    });
                })
                }); 
        
                app.get('/getByIdTable/:id', function(req, res){
                    const id = req.params.id.toString();
                    console.log(id);
                    Table.findById(id)
                    .then(function(table){
                    console.log(table);
                    res.status(201).json(table);
                    })
                    .catch(function(e){
                        res.status(500).json({ message: e});
                    });
                    });

                    app.delete('/deletedishbyid/:id', function(req,res){
                        Dish.findByIdAndDelete(req.params.id).then(function(){
                        }).catch(function(){
                        })
                        });

                    app.delete('/deletetablebyid/:id', function(req,res){
                        Table.findByIdAndDelete(req.params.id).then(function(){
                        }).catch(function(){
                        })
                        });
                    
                    app.delete('/deleteuserdetailbyid/:id', function(req,res){
                        User.findByIdAndDelete(req.params.id).then(function(){
                        }).catch(function(){
                        })
                        });

                 app.post("/reserveTable", function(req,res){
                     var data = new Reservation(req.body);
                     data.save().then(function(){
                        res.send('Table Added Successfully');
                     }).catch(function(e){
                        res.send(e)
                     });
                 })

                app.get('/showreserveTable', function(req,res){
                 Reservation.find().then(function(reserve){
                 res.send(reserve);
                    })
                .catch(function(e){res.send(e)})
                     })

                     app.delete('/deleteReservationbyid/:id', function(req,res){
                        Reservation.findByIdAndDelete(req.params.id).then(function(){
                        }).catch(function(){
                        })
                        });

                        
                        app.get('/users/me', auth, function(req,res){
                            res.send(req.user);
                            });

                        app.put('/updateuserdetail',auth, function (req, res) {   
                            console.log(req.body);
                            User.findByIdAndUpdate(req.user._id, req.body, { new: true }, (err, user) => {
                              res.send("Succesfully Updated");
                            });
                          });

                          app.get('/getUserdetail', function(req,res){
                            User.find().then(function(user){
                                res.send(user);
                            })
                            .catch(function(e){res.send(e)})
                        });

                        app.get('/getUserById/:id', function(req,res){
                            const uid = req.params.id.toString();
                            console.log(uid);
                            User.findById(uid).
                            then(function(user){
                                res.json(user);
                                console.log(user);
                            })   
                            .catch(function(e){
                                req.send(e);
                            })
                        });

                        app.put('/UserUpdateAnd', function(req, res){
                            console.log(req.body);
                            var uid = req.body._id;
                            User.findByIdAndUpdate({_id:uid},req.body).then(function(){
                                console.log("Profile Updated Successfully");
                                res.send()
                                console.log(req.body)
                            }).catch(function(e){
                                console.log("Error!!!!")
                            })
                        })

                        

                            app.post("/orderFood", function(req,res){
                                var data = new Order(req.body);
                                data.save().then(function(){
                                   res.send('Dish Added Successfully');
                                }).catch(function(e){
                                   res.send(e)
                                });
                            })
           
                           app.get('/showorderFood', function(req,res){
                            Order.find().then(function(order){
                            res.send(order);
                               })
                           .catch(function(e){res.send(e)})
                                })

                                app.delete('/deleteOrderbyid/:id', function(req,res){
                                    Order.findByIdAndDelete(req.params.id).then(function(){
                                    }).catch(function(){
                                    })
                                    });

                                    //contact
                                    app.post("/saveContact", function(req,res){
                                        var data = new Contacts(req.body);
                                        data.save().then(function(){
                                           res.send('Dish Added Successfully');
                                        }).catch(function(e){
                                           res.send(e)
                                        });
                                    })
                   
                                   app.get('/showsaveContact', function(req,res){
                                    Contacts.find().then(function(contact){
                                    res.send(contact);
                                       })
                                   .catch(function(e){res.send(e)})
                                        })
        
                                        app.delete('/deleteContactbyid/:id', function(req,res){
                                            Contacts.findByIdAndDelete(req.params.id).then(function(){
                                            }).catch(function(){
                                            })
                                            });
app.listen(3000);
