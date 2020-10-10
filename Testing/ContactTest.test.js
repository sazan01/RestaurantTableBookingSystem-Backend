// use the path of your model 
const User = require('../models/saveContact'); 
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
 
describe('Contact Test', () => { 
    // the code below is for insert testing  
    var id ='';   
    it('Contacts', () => {         
        const user = {            
            'name': 'sajan',
            'email':'saz@gmail.com',
            'phone':'9801001100' ,        
            'sub': 'Dish',
            'message':'Very Good'
            };                  
            return User.create(user)             
            .then((user_res) => {                 
                id = user_res._id;
                
            expect(user_res.name).toEqual('sajan');
             });     
            }); 

            it('testing User Delete', async() =>{
                const status = await
                User.deleteMany({ name: 'sajan'
                });
                expect(status.ok).toBe(1);
            });
            });
           
         