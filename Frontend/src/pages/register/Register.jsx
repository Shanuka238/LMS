import React, { useState } from "react";
import Header from '../../components/ui/Header';
import { register } from '../../utils/api';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const result = await register(form.name, form.email, form.password, form.role)
    if(result.message){
      setSuccess('Registration successful! You can now login')
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    }else{
      setError(result.error || 'Registration failed')
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Header />
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full mb-4 p-2 border rounded"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-6 p-2 border rounded"
          value={form.password}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          className="w-full mb-6 p-2 border rounded"
          value={form.role}
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition">Register</button>
      </form>
    </div>
  );
};

export default Register;
