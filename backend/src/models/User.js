const { readDatabase, writeDatabase } = require('../utils/utils');

const writeUsersToDb = (users) => {
  const data = readDatabase();
  data['users'] = users;
  writeDatabase(data);
};

class User {
  constructor(email, password, fullName) {
    this.id = Date.now();
    this.email = email;
    this.password = password;
    this.fullName = fullName;
    this.createdAt = null;
    this.updatedAt = null;
  }

  static create(email, password, fullName) {
    const user = new User(email, password, fullName);
    user.createdAt = Date.now();
    user.updatedAt = Date.now();

    if (this.findByEmail(user.email)) {
      let users = User.getAllUsers();
      users.push(user);
      writeUsersToDb(users);
    } else {
      throw 'User exists with this email.';
    }
  }

  static fromDatabase(obj) {
    const user = new User(obj.email, obj.password, obj.fullName);
    user.id = obj.id;
    user.createdAt = obj.createdAt;
    user.updatedAt = obj.updatedAt;
    return user;
  }

  static getAllUsers() {
    const userObjects = readDatabase()['users'];
    let users = [];
    for (let e of userObjects) {
      users.push(User.fromDatabase(e));
    }
    return users;
  }

  static findById(id) {
    const users = readDatabase()['users'];
    const user = users.find((e) => e.id == id);
    if (!user) {
      return User.fromDatabase(user);
    }
    return null;
  }

  static findByEmail(email) {
    const users = readDatabase()['users'];
    const user = users.find((e) => e.email == email);
    if (!user) {
      return User.fromDatabase(user);
    }
    return null;
  }
}

module.exports = User;
