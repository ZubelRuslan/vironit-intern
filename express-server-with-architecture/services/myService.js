const fs = require('fs');
const path = require('path');

let localUsers;
fs.readFile(
  path.join(__dirname, '..', 'storage.json'),
  (err, data) => {
    if (err) {
      throw new Error(err);
    }
    localUsers = JSON.parse(data);
  }
);

const get = () => {
  return localUsers;
}

const create = request => {
  // we must pass the whole object to write it
  if (!request.body.id || !request.body.name || !request.body.surname) {
    throw new Error("Bad request");
  } else {
    if (localUsers.some(user => user.id === request.body.id)) {
      throw new Error(`User with id ${request.body.id} exists`);
    } else {
      const user = {
        id: request.body.id,
        name: request.body.name,
        surname: request.body.surname
      };
      localUsers.push(user);
      fs.writeFile(
        'storage.json',
        JSON.stringify(localUsers),
        err => {
          throw new Error(err);
        }
      );
      return localUsers;
    }
  }
}

const update = request => {
  // here we must pass the id and can pass name and surname or both of them
  if (!localUsers.some(user => user.id === request.body.id)) {
    throw new Error(`User with id ${request.body.id} does not exist`);
  } else {
    const currentUser = localUsers.filter(user => user.id === request.body.id)[0];
    if (request.body.name) {
      currentUser.name = request.body.name;
    } else if (request.body.surname) {
      currentUser.surname = request.body.surname;
    }
    fs.writeFile(
      'storage.json',
      JSON.stringify(localUsers),
      err => {
        throw new Error(err);
      }
    );
    return localUsers;
  }
}

const del = request => {
  // we must pass the whole object to delete it
  if (!localUsers.some(user => user.id === request.body.id)) {
    throw new Error(`User with id ${request.body.id} does not exist`);
  } else {
    const currentUserPosition = localUsers.indexOf(request.body.user);
    localUsers.splice(currentUserPosition, 1);
    fs.writeFile(
      'storage.json',
      JSON.stringify(localUsers),
      err => {
        throw new Error(err);
      }
    );
    return localUsers;
  }
}

module.exports = {
  get,
  create,
  update,
  del
}