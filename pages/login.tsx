// pages/login.tsx

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        if (data.token && data.user) {
          const { token, user } = data;
          // Store the token in local storage
          localStorage.setItem("authToken", token);
          localStorage.setItem("loggedInUser", JSON.stringify(user));

  
          // Console log the role
          console.log("User Role:", user.role);
  
          if (user.role.toLowerCase() === "writer" || user.role.toLowerCase() === "user") {
            router.push("/");
          } else if (user.role.toLowerCase() === "admin") {
            router.push("/cardblog");
          } else {
            console.error("Unknown user role:", user.role);
            toast.error("An unexpected error occurred. Please try again later.");
          }
  
          toast.success("User Login successfully");
        } else {
          console.error("Token or user data is missing in the server response:", data);
          toast.error("An unexpected error occurred. Please try again later.");
        }
      } else {
        const errorData = await response.json();
        if (response.status === 401 && errorData.message === "Invalid user") {
          toast.error("Invalid email");
        } else if (
          response.status === 401 &&
          errorData.message === "Invalid password"
        ) {
          toast.error("Invalid password");
        } else {
          console.error("Unexpected error in server response:", errorData);
          toast.error("An unexpected error occurred. Please try again later.");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };
  

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Email
                </label>

                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleLogin}
                  className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-8"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginPage;
