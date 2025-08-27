'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log(data)
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Signup failed");
      }

      // ✅ save token in localStorage (or cookie if you prefer)
      localStorage.setItem("token", data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.dispatchEvent(new Event("authChange"));

      // ✅ redirect user after successful signup
      router.push("/chat");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 overflow-x-hidden">
      <main className="flex flex-1 items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 sm:p-10 shadow-lg">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Welcome to Zytronic Chat</h2>
            <h2 className="text-2xl font-semibold text-center text-gray-900">Create your account</h2>
          </div>
          <form className="space-y-6" onSubmit={handleSignup}>
            <div className="space-y-4">
              <div>
                <label htmlFor="user-name" className="block text-sm font-medium text-gray-700">
                  User Name
                </label>
                <input
                  id="email-address"
                  name="userName"
                  type="string"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  placeholder="User Name"
                  className="w-full rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                  autoComplete="email"
                  className="w-full rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  autoComplete="new-password"
                  className="w-full rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  className="w-full rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
              >
                {loading ? 'Signing up...' : 'Sign up'}
              </button>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}