import './App.css';
import { useState } from 'react';
import axios from 'axios';
const App = () => {

    const [fromData, setFromData] = useState({
        username: '',
        password: '',
        phone_num: '',
        gender: '',
        age: ''
    });

    const [display, setDisplay] = useState({});
    const [deleted, setDeleted] = useState('');
    const [search, setSearch] = useState('');
    const [result, setResult] = useState('');
    const displayUsers = () => {
        fetch("http://127.0.0.1:8000/api/users")
            .then(response => response.json())
            .then(data => setDisplay(data));
        console.log(display)
    }

    const handleChange = (e) => {
        setFromData({
            ...fromData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/new-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fromData)
            });
            if (response.ok) {
                console.log("Post request successful");

                const dat = await response.json();
                console.log(dat);
            } else {
                console.error('Post request failed');
            }
        } catch (error) {
            console.error('Error :', error)
        }
    }

    const handleDelete = (e) => {
        const id = e.target.value;
        setDeleted(id);
    }

    const deleteUser = () => {

        axios.delete(`http://127.0.0.1:8000/api/delete-user/${deleted}`)
            .then(console.log("User deleted Successfully"));
    }

    const handleSearch = (e) => {
        const value_search = e.target.value;
        setSearch(value_search);
    }

    const doSearch = (e) => {
        e.preventDefault()
        axios.get(`http://127.0.0.1:8000/api/search/${search}`)
            .then(response => {
                setResult(response.data)
                console.log(result)
            })
    }

    return (
        <div>
            <form>
                <input type="text" onChange={handleSearch} placeholder='Search with username' />
                <button onClick={doSearch}>Search</button>
            </form>
            <p>the search results its : {JSON.stringify(result) ? JSON.stringify(result) : 'there is no result, please check your informations'}</p>
            <form onSubmit={handleSubmit}>
                <label>username</label> <input type="text" onChange={handleChange} name='username' value={fromData.username} /><br />
                <label>password</label>  <input type="text" onChange={handleChange} name='password' value={fromData.password} /><br />
                <label>Phone Number</label><input type="text" onChange={handleChange} name='phone_num' value={fromData.phone_num} /><br />
                <label>Gender</label> <input type="text" onChange={handleChange} name='gender' value={fromData.gender} /><br />
                <label>Age</label> <input type="text" onChange={handleChange} name='age' value={fromData.age} /><br />
                <button>Add New User</button>
            </form>
            <p>{JSON.stringify(display.data)}</p>
            <button onClick={() => displayUsers()}>Show the users</button><br />
            <input type='number' onChange={handleDelete} />
            <button onClick={deleteUser}>Delete User</button>
        </div>
    )
}

export default App