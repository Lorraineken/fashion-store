import React, { useEffect } from 'react';

function UserTest() {
    const token = localStorage.getItem('token');
    console.log(token)

    useEffect(()=>{
        fetch('http://localhost:3000/users', {

          method:'GET',
            headers: {
              Authorization:`Bearer ${localStorage.getItem('token')}`
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
