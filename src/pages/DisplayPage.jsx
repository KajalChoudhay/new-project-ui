import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DisplayPage() {
  const [user, setUser] = useState(null);
  const [dogImage, setDogImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get('http://localhost:5000/api/user');
        const dogRes = await axios.get('https://dog.ceo/api/breeds/image/random');
        setUser(userRes.data);
        setDogImage(dogRes.data.message);
      } catch {
        alert('Failed to load data');
      }
    };
    fetchData();
  }, []);

  const calculateAge = dob => {
    const diff = Date.now() - new Date(dob).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <img src={dogImage} alt="Dog" className="rounded-full w-40 h-40 mx-auto mb-4" />
      <h2>{user.firstName} {user.lastName}</h2>
      <p>DOB: {user.dob}</p>
      <p>Age: {calculateAge(user.dob)}</p>
      <button onClick={() => navigate('/')}>Go Back</button>
    </div>
  );
}
