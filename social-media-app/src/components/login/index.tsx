import { useState } from "react";
import { logIn ,signUp } from "../../utilits/authService"; 
import { ThreeDots } from "react-loader-spinner"; 
import { useNavigate  } from "react-router-dom"; 


export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(""); 
    setSuccess("");
    setEmail("");
    setPassword("");

  };
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
       
        const user = await logIn(email, password);
        console.log("Logged in user:", user);
        navigate("/home");
   
      } else {
        const user = await signUp(email, password);
        console.log("Signed up user:", user);
        setSuccess("Account created successfully!");
        setTimeout(() => {
            setIsLogin(true);
            setEmail(""); // 
            setPassword("");
            setLoading(false); 
            setSuccess("");
          }, 2000); 
        

      }
      setError("");
    } catch (error: any) {
      // Handle Firebase errors
      if (error.code === "auth/email-already-in-use") {
        setError("Email is already in use. Please log in.");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else if (error.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError("An error occurred: " + error.message);
      }
      setSuccess("");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-#34c3eb-400 to-purple-400">
    <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 py-16">
    <div className="flex justify-center mb-8">
          <img
            src="https://img10.hotstar.com/image/upload/f_auto,h_156/sources/r1/cms/prod/292/1420292-t-373af9d2cdaf"
            alt="News Logo"
            className="h-12"
          />
        </div>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        {isLogin ? "Login" : "Sign Up"}
      </h2>
      <form onSubmit={handleSubmit}>
       
        <div className="relative mb-8">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full px-0 pb-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-all placeholder-transparent"
            placeholder="Email"
          />
          <label
            htmlFor="email"
            className="absolute left-0 text-gray-500 text-sm -top-4 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-500 transition-all cursor-pointer"
          >
            Email
          </label>
        </div>
        <div className="relative mb-8">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer w-full px-0 pb-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-all placeholder-transparent"
            placeholder="Password"
          />
          <label
            htmlFor="password"
            className="absolute left-0 text-gray-500 text-sm -top-4 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-500 transition-all cursor-pointer"
          >
            Password
          </label>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-3 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:bg-gradient-to-l focus:outline-none focus:ring focus:ring-blue-300 transition-all cursor-pointer flex items-center justify-center" 
        >
          {loading ? (
              <ThreeDots
                height="20"
                width="40"
                color="#fff"
                
                ariaLabel="three-dots-loading"
                wrapperStyle={{ margin: "auto" }}
              />
            ) : (
              isLogin ? "Login" : "Sign Up"
            )}
        </button>
      </form>
      {error && <p className="mt-6 text-sm text-center text-red-500">{error}</p>}
      {success && <p className="mt-6 text-sm text-center text-green-500">{success}</p>}
      <p className="mt-6 text-sm text-center text-gray-600">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={toggleForm}
          className="text-blue-500 hover:underline focus:outline-none cursor-pointer"
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  </div>
  );
}
