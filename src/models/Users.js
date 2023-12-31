const fs = require('fs');
const bcrypt = require('bcrypt')

const Users = {
    filename: "./src/database/usersData.json",

    getData: function(){
        return JSON.parse(fs.readFileSync(this.filename, "utf-8"))
    },
    generateId: function(){
        let allUsers = this.getData();
        let lastUser = allUsers.pop();
        if(lastUser){
            return lastUser.id + 1
        }else{
            return 1
        }
    },
    saveData: function(data) {
        fs.writeFileSync(this.filename, JSON.stringify(data, null, " "));
    },
    create: function(req){
        let allUsers = this.getData();
        let newUser = {
            id: this.generateId(),
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10), // Hash da senha
            avatar: req.file.filename
        };
        allUsers.push(newUser);
        this.saveData(allUsers);
        return newUser
    },
    deleteAccount: function(id){
        let allUsers = this.getData();
        let filteredUsers = allUsers.filter((user)=>user.id != id)
        this.saveData(filteredUsers);;
        return filteredUsers;
    },
    findUserByfield: function(field, value){
        let allUsers = this.getData();
        let userFound= allUsers.find(user => user[field] === value);
        return userFound;
    },
    compareEmail: function(sessionEmail, inputEmail){
        let allUsers = this.getData();
        let userFound = allUsers.find(user => user.email === sessionEmail);
    
        if (userFound && userFound.email === inputEmail) {
            return true;
        } else {
            return false;
        }
    },
    comparePass: function(userId, currentPassword) {
        let allUsers = this.getData();
        let userToUpdate = allUsers.find(user => user.id === userId);
    
        if (userToUpdate && bcrypt.compareSync(currentPassword, userToUpdate.password)) {
            return true;
        } else {
            return false
        }
    },
    editAccount: function(userId, newData) {
        let allUsers = this.getData();
        let user = allUsers.find(user => user.id === userId);
        
        user.name = newData.name;
        user.lastName = newData.lastName;
        user.email = newData.email;
        this.saveData(allUsers);

        return user
    },    
    editPassword: function(userId, currentPassword, newPassword) {
        let allUsers = this.getData();
        let userToUpdate = allUsers.find(user => user.id === userId);
    
        if (userToUpdate && bcrypt.compareSync(currentPassword, userToUpdate.password)) {
           
            userToUpdate.password = bcrypt.hashSync(newPassword, 10);
            this.saveData(allUsers); // Chamar o método para salvar os dados
            return true;
        } else {
            return false
        }
    },
    editAvatar: function(userId, file){
        let allUsers = this.getData();
        let fileUser = allUsers.find(user => user.id === userId);

        if(fileUser){
            
            fileUser.avatar = file.filename;
            this.saveData(allUsers); 
            return true
        }else{
            return false
        }
    }
}

module.exports = Users;