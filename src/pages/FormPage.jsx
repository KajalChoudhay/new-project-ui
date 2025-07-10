import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function FormPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', dob: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const testresp = await axios.post('http://localhost:5000/api/user', form);
      console.log("testresp", testresp);
      navigate('/display');
    } catch (err) {
      alert('Error saving user!');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="firstName" value={form.firstName} onChange={handleChange} required placeholder="First Name" />
        <input name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Last Name" />
        <input name="dob" type="date" value={form.dob} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
