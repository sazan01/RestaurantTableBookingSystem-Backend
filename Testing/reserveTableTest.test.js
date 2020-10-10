// use the path of your model 
const User = require('../models/addTable'); 
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
 
describe('Table Reservation Test', () => { 
    // the code below is for insert testing  
    var id ='';   
    it('Table Reservation', () => {         
        const user = {            
            'tableName': 'Family',
            'tableSize':'12',
            'Price':'1200' ,        
            'tableImage': 'table.jpg'

             };                  
            return User.create(user)             
            .then((user_res) => {                 
                id = user_res._id;
                
            expect(user_res.tableName).toEqual('Family');
             });     
            }); 

            //Update User

            it('updateuser testing',() =>{
                const userupdate ={
                    tableName: 'Medium'
                }
                console.log(id)
                return User.findByIdAndUpdate(id, userupdate, { 
                    new: true
                }).then((userupdate) =>{
                    expect(userupdate.tableName).toEqual('Medium');
                });
            });

            // User Delete Testing
            it('testing User Delete', async() =>{
                const status = await
                User.deleteMany({ tableName: 'Medium'
                });
                expect(status.ok).toBe(1);
            });
            });