import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:5555/users`);
      if (response.status === 200) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5555/users`, { name: username });
      if (response.status === 201) {
        setUsers([...users, response.data.data]);
        setUsername('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createManyUsers = async (e) => {
    e.preventDefault();
    for (let i = 0; i < 1000; i++) {
      try {
        const response = await axios.post(`http://localhost:5555/users`, { name: "hahehoh" + i });
        // if (response.status === 201) {
        //   setUsers([...users, response.data.data]);
        //   setUsername('');
        // }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="h-full container p-5 mx-auto mt-8 rounded-xl border-2">
      <h1 className="text-2xl font-bold mb-4">List of Users</h1>
      <div className="container table-auto mt-5 overflow-y-scroll max-h-[23.5rem] text-center rounded-md border"> {/* Sesuaikan max-h-80 dengan tinggi maksimum yang Anda inginkan */}
        <table className="w-full bg-zinc-800 rounded-xl">
          <thead className='sticky top-0 z-1 bg-zinc-700 h-12'>
            <tr>
              <th className="py-2 px-2">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2">Created At</th>
              <th className="py-2">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className='border-b border-zinc-600'>
                <td className="py-2">{user.id}</td>
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.created_at}</td>
                <td className="py-2">{user.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='pt-2'>
        <h1 className="text-2xl font-bold mt-4 mb-4"> Create User</h1>
        <label htmlFor="username" className="text-lg">User Name</label>
      </div>
      <div>
        <form className="mt-1 flex justify-center items-center" onSubmit={createManyUsers}>
          <input
            type="text"
            id="username"
            className="w-full py-2 px-3 rounded border"
            value={username}
            placeholder='Enter user name'
            // onChange={(e) => setUsername(e.target.value)}
            // onClick={createManyUsers}
          />
          <button type="submit" className="ml-2 h-10 w-32 bg-blue-500 hover-bg-blue-700 text-white text-base p-2 rounded">
            Create User
          </button>
        </form>
      </div>

    </div>
  );
}

export default App;
