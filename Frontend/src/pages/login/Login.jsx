import React, { useState } from "react";
import Header from '../../components/ui/Header';
import { login } from '../../utils/api';

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		const result = await login(email, password)
		if (result.user) {
			localStorage.setItem('user', JSON.stringify(result.user))
			window.location.href = '/student-dashboard'
		} else {
			setError(result.error || 'login failed')
		}
	};

	return (
    <div className="min-h-screen flex items-center justify-center bg-background">
     <Header />
	  <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-2 border rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition">Login</button>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
