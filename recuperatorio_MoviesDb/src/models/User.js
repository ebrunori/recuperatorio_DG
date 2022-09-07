/*1.TRAIGOtodos los usuarios que tengo en database y los pongo en la varfileName.
2-Con getData los tranformo para poder leerlo en el modelo User.js
3-Con finAll(es lo mismo que getdata-todos los usuarios pero ya pasados a lectura, para ser reutilizados 
 4-   a la hora de buscar por id(pk) o por campos*/
//guardar al usuaro en la db
//bucar al usuario que se quiere logear por email--
//buscar a un usuario por su id----findByPk----
//editar la información de un usuario
// eliminar a un usuario de la bd-----todo esto seria CRUD


const fs=require('fs')
const path= require('path')

const User={
    fileName: path.join(__dirname, '../database/users.json'),/**/

    getData:function(){
        return JSON.parse(fs.readFileSync(this.fileName,'utf-8'))
    }, /**/
    
    findAll: function(){
        return this.getData();
    },/**/

    generateId: function(){
         let allUsers = this.findAll();
         let lastUser = allUsers.pop();
         if(lastUser){
            return lastUser.id + 1;
        }else{
            return 1;
        }
    },/**/
    
    findByPk: function(id){
     let allUsers = this.findAll();
     let userFound= allUsers.find(oneUser => oneUser.id===id)
     return userFound;
    },/**/

    findByField:function(field, text){
     let allUsers = this.findAll();
     let userFound= allUsers.find(oneUser => oneUser[field] === text)
     return userFound;
    },/**/

    create: function (userData){
     let allUsers= this.findAll();
     let newUser={
         id: this.generateId(),
         ...userData
        }
     allUsers.push(newUser);
     fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null,' '))
     return newUser;
    },/**/

    delete: function(id){
        let allUsers = this.findAll();
        let finalUsers= allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName,JSON.stringify(finalUsers,null,' '))
        return true
    }/**/
}




module.exports = User;




