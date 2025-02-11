import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Registration failed.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Google sign-up failed.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-6 py-32 lg:px-8 bg-gray-50">
      <div className="flex flex-col items-center mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          className="text-indigo-500"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 5v-.295C17 3.763 16.237 3 15.295 3v0a1.73 1.73 0 0 0-1.66 1.242L9.557 18.105A2.64 2.64 0 0 1 7.025 20H7m3.5-11H14"
          />
        </svg>
        <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleRegister}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-indigo-600 text-white font-semibold py-2 rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <button
          onClick={handleGoogleRegister}
          className="mt-4 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.355.61 4.605 1.8l3.425-3.425C17.95 1.19 15.235 0 12 0 7.31 0 3.255 2.69 1.28 6.61l3.99 3.095C6.215 6.86 8.87 4.75 12 4.75Z"
            />
            <path
              fill="#4285F4"
              d="M23.49 12.275c0-.785-.075-1.545-.19-2.275H12v4.51h6.47c-.29 1.48-1.13 2.74-2.39 3.59l3.865 3c2.255-2.09 3.545-5.18 3.545-8.825Z"
            />
            <path
              fill="#FBBC05"
              d="M5.265 14.295A11.78 11.78 0 0 1 4.885 12c0-.8.135-1.57.38-2.295l-3.99-3.095C.46 8.23 0 10.06 0 12c0 1.94.46 3.77 1.28 5.39l3.985-3.095Z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.965-.995 7.945-2.835l-3.865-3C15.005 18.82 13.62 19.245 12 19.245c-3.13 0-5.785-2.11-6.735-4.955L1.275 17.385C3.255 21.31 7.31 24 12 24Z"
            />
          </svg>
          Sign up with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
