// use the path of your model 
const User = require('../models/regis'); 
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
            'name': 'Sazan',
            'email':'sazan01@gmail.com',
            'pass':'sazan11' ,        
            're_pass': 'sazan11',
            'usertype':'user'         };                  
            return User.create(user)             
            .then((user_res) => {                 
                id = user_res._id;
                
            expect(user_res.name).toEqual('Sazan');
             });     
            }); 

            //Update User

            it('updateuser testing',() =>{
                const userupdate ={
                    name: 'Sazan Manandhar'
                }
                console.log(id)
                return User.findByIdAndUpdate(id, userupdate, { 
                    new: true
                }).then((userupdate) =>{
                    expect(userupdate.name).toEqual('Sazan Manandhar');
                });
            });

            // User Delete Testing
            it('testing User Delete', async() =>{
                const status = await
                User.deleteMany({ usertype: 'user'
                });
                expect(status.ok).toBe(1);
            });
            });