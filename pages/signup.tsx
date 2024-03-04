// pages/signup.tsx

import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");

  const handleSignUp = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User registered successfully:", data);
        toast.success("User registered successfully");
        router.push("/login");
      } else {
        const errorData = await response.json();
        console.error("Failed to register user:", errorData);
        toast.error("Failed to register user");

        if (
          response.status === 409 &&
          errorData.message === "User with this email already exists"
        ) {
          toast.error("Email already exists");
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <>
        <>
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            
              <div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                    Sign up to your account
                  </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-2" action="#" method="POST">
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        required
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
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
                      <label className="block text-sm font-medium leading-6 text-gray-900">
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
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Role
                      </label>
                    </div>
                    <div className="mt-2">
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        {/* <option value="Admin">Admin</option> */}
                        <option value="Writer">Writer</option>
                        <option value="User">User</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={handleSignUp}
                      className="mt-8 flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
                </div>
              </div>
          
          </div>
        </>
      </>
    </div>
  );
};

export default SignUpPage;
