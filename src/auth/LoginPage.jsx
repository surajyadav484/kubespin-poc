import { useState } from "react";
import { Github, Key, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleClick = () =>{
      navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="flex justify-center mb-4">
          {/* <img src="/logo.svg" alt="Cast AI" className="h-8" /> Replace with your logo */}
          Cubespin
        </div>
        <h2 className="text-2xl font-semibold text-center mb-1">Sign in</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Welcome back to your Cubespin AI workspace.
        </p>

        <div className="flex gap-2 mb-4">
          <button className="flex-1 border rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-100">
            <Github size={18} />
            Github
          </button>
          <button className="flex-1 border rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-100">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            Google
          </button>
          <button className="flex-1 border rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-100">
            <Key size={18} />
            SSO
          </button>
        </div>

        <div className="relative text-center mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative bg-white px-2 text-sm text-gray-400">OR</div>
        </div>

        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border rounded-lg px-3 py-2 mt-1 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          <div className="text-right text-sm">
            <a href="#" className="text-blue-600 hover:underline">Forgot password? Reset</a>
          </div>

          <button
            type="button"
            onClick={handleClick}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Sign in
          </button>
          
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}
