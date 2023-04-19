import React from 'react'
import UserChart from './UserChart';
function UserReview() {
    const [data, setData] = useState(null);

    useEffect(() => {
      fetch('/db.json')
        .then(response => response.json())
        .then(data => setData(data));
    }, []);
  
    return data ? <UserChart json={data} /> : null;

}

export default UserReview