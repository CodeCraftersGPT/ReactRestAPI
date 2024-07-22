// we are going to create a userlist component.
// This component will fetch the data from the API and display it in a table format.
// We will use the axios library to fetch the data from the API.

import React, { useEffect,useState } from 'react';
import axios from 'axios';
import './UserList.css'

function UserList() {
    const [users, setUsers] = useState([]);
const [newUser,setNewUser] = useState({
  username: '',
  email: '',
  phone: '',
  password: ''
});


    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
        .then(res => {
            console.log(res);
            setUsers(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    const handleChange = (e) =>{
      const {name,value} = e.target;
      setNewUser({
        ...newUser,
        [name]:value
      });
    };

    const handleAddUser =(e) =>{
      e.preventDefault();
      console.log(newUser);

      const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;

      const userToAdd = {
        ...newUser,
        id:newId
      }

      axios.post('http://localhost:5000/api/users',userToAdd)
      .then(response =>{
        setUsers([...users,userToAdd]);
        setNewUser({
          username: '',
          email: '',
          phone: '',
          password: ''
        })
      })
      .catch(error => {
        console.error('There was an error adding the user!', error);
      });
    };



    return(
        <div className='user-list-container'>
           <h2>User List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table> 
      <h2>Add New User</h2>
      <form onSubmit={handleAddUser} className="add-user-form">
        <input type='text' name='username' placeholder='username' value={newUser.userName} onChange={handleChange} required></input>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={newUser.phone}
          onChange={handleChange}
          required
        />

<input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleChange}
          required
        />
        <button type='submit'>Add User</button>

      </form>
        </div>
    );
};

export default UserList;



