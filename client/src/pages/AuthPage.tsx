import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAuth = async () => {
    setError('');
    if (!email || !password || (!isLogin && password !== confirm)) {
      setError(
        !email || !password
          ? 'Please fill in all fields'
          : 'Passwords do not match'
      );
      return;
    }

    try {
      setLoading(true);
      const endpoint = isLogin ? '/login' : '/signup';
      const res = await axios.post(`http://localhost:5000${endpoint}`, {
        email,
        password,
      });

      if (isLogin) {
        localStorage.setItem('token', res.data.token);
        navigate('/upload');
      } else {
        alert(res.data.message);
        setIsLogin(true); // Switch to login after signup
        setEmail('');
        setPassword('');
        setConfirm('');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-700">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm px-8 py-10 text-black">
        {/* Toggle Tabs */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => {
              setIsLogin(true);
              setError('');
            }}
            className={`px-4 py-2 font-semibold rounded-l-md ${
              isLogin ? 'bg-cyan-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setError('');
            }}
            className={`px-4 py-2 font-semibold rounded-r-md ${
              !isLogin ? 'bg-cyan-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          {!isLogin && (
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          )}
          {error && (
            <p className="text-sm text-red-600 bg-red-100 px-3 py-1 rounded">{error}</p>
          )}
          <button
            onClick={handleAuth}
            disabled={loading}
            className={`w-full ${
              loading ? 'bg-cyan-400' : 'bg-cyan-600 hover:bg-cyan-700'
            } text-white py-2 rounded-lg font-semibold transition duration-150`}
          >
            {loading
              ? 'Processing...'
              : isLogin
              ? 'Log In'
              : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );
}
