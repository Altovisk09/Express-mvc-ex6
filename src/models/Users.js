const fs = require('fs');

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
    create: function(req){
        let allUsers = this.getData();
        let newUser = {
            id: this.generateId(),
            ...req.body,
            // avatar: req.file
        };
        allUsers.push(newUser);
        fs.writeFileSync(this.filename, JSON.stringify(allUsers, null, " "));
        return newUser
    },
    editAccount: function(){

    },
    deleteAccount: function(id){
        let allUsers = this.getData();
        let filteredUsers = allUsers.filter((user)=>user.id != id)
        fs.writeFileSync(this.filename, JSON.stringify(filteredUsers, null , ' '))
        return filteredUsers;
    },
    findUserByfield: function(field, value){
        let allUsers = this.getData();
        let userFound= allUsers.find(user => user[field] === value);
        return userFound;
    },
}