import React, { useEffect } from 'react';

function UserTest() {
    const token = localStorage.getItem('token');
    console.log(token)

    useEffect(()=>{
        fetch('http://localhost:3000/users', {
            credentials: 'include',
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error))
    }, [])

    return (
        <div>UserTest</div>
    )
}

export default UserTest;
