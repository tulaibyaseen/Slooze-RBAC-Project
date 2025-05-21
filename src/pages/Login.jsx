import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../app/features/authSlice";
import { toast } from "react-toastify";
import { FaFacebook } from "react-icons/fa";
import LoginImage from "../assets/images/login/login.png";
import { FcGoogle } from "react-icons/fc";

const users = [
  {
    id: 1,
    name: "Slooze Manager",
    email: "manager@example.com",
    password: "password123",
    role: "manager",
  },
  {
    id: 2,
    name: "Jane Store Keeper",
    email: "storekeeper@example.com",
    password: "password123",
    role: "store_keeper",
  },
];

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const user = users.find(
      (u) => u.email === data.email && u.password === data.password
    );
    if (user) {
      dispatch(
        setCredentials({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token: "mock-jwt-token",
        })
      );
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
      toast.success("Login successful!");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center h-screen w-full">
        <div className="flex items-center w-full h-full">
          {/* Left: Form */}
          <div className="flex flex-col justify-center items-center w-full md:w-[65%] px-6">
            <div className="w-full max-w-md">
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight text-center">
                Welcome Back
              </h2>
              <p className="text-center text-gray-800 dark:text-gray-200 font-semibold mb-6">
                Sign Up For Free
              </p>
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-900 dark:text-white dark:border-gray-700"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-900 dark:text-white dark:border-gray-700"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    className="mr-2"
                    defaultChecked
                    disabled
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs text-gray-500 dark:text-gray-400"
                  >
                    I agree to all Term, Privacy Policy and fees
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 rounded-xl bg-brand-purple hover:bg-purple-900 text-white font-semibold transition"
                >
                  {isSubmitting ? "Signing in..." : "Get Started"}
                </button>
              </form>
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                <span className="mx-2 text-gray-400 dark:text-gray-500">
                  OR
                </span>
                <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="space-y-2">
                <button
                  type="button"
                  className="w-full cursor-pointer flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-xl py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  disabled
                >
                  <FcGoogle className="mr-2 text-lg" />
                  <span className="dark:text-white">Sign in with Google</span>
                </button>
                <button
                  type="button"
                  className="w-full cursor-pointer flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-xl py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  disabled
                >
                  <FaFacebook className="mr-2 text-lg text-blue-600" />
                  <span className="dark:text-white">Sign in with Facebook</span>
                </button>
              </div>
              <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-4">
                Already have an account?{" "}
                <span className="text-sky-600 font-semibold cursor-pointer">
                  Login
                </span>
              </p>
            </div>
          </div>
          {/* Right: Image */}
          <div className="hidden md:block w-[35%] h-full">
            <img
              src={LoginImage}
              alt="login visual"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
