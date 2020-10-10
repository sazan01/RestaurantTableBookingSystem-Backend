// use the path of your model 
const User = require('../models/addDish'); 
const mongoose = require('mongoose'); 
// use the new name of the database 
const url = 'mongodb://localhost:27017/RestaurantTesting';  
beforeAll(async () => {     await mongoose.connect(url, {
             useNewUrlParser: true,         
             useCreateIndex: true     
            }); 
        }); 
 
afterAll(async () => { 
 
    await mongoose.connection.close(); }); 
 
describe('User Registration Test', () => { 
    // the code below is for insert testing  
    var id ='';   
    it('User Registration', () => {         
        const user = {            
            'dishName': 'Momo',
            'Price':'200',
            'Category':'fastfood' ,        
            'dishImage': 'momo.jpg'
            };                  
            return User.create(user)             
            .then((user_res) => {                 
                id = user_res._id;
                
            expect(user_res.dishName).toEqual('Momo');
             });     
            }); 

           
            });