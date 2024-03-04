import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import NextTopLoader from "nextjs-toploader";
import { useRouter } from "next/router";

interface User {
  _id: number;
  name: string;
  role: string;
  // Add other fields as needed
}

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const [writersCount, setWritersCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Initially set to true
  const [blogsCount, setBlogsCount] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);

  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userData, setUserData] = useState<any>(null); // State to store user data from local storage
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  

  useEffect(() => {
    // Fetch categories data when component mounts
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("Token not found in local storage");
        return;
      }

      const response = await axios.get("http://localhost:3000/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const handleCategoryClick = () => {
    setShowCategories(true);
  };
  // Function to handle click on the admin section to show user profile
  const handleAdminClick = () => {
    // Retrieve user data from local storage
    const storedUserData = localStorage.getItem("loggedInUser");
    if (storedUserData) {
      // If user data is found, parse it and set it in state
      setUserData(JSON.parse(storedUserData));
    } else {
      // If user data is not found, show an error message or handle it accordingly
      console.error("User data not found in local storage");
    }
  };

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = localStorage.getItem("loggedInUser");

    if (userData) {
      // Parse the user data from JSON
      const user = JSON.parse(userData);

      // Set user name and role in state
      setUserName(user.name);
      setUserRole(user.role);
    }
  }, []);

  useEffect(() => {
    // Fetch data from backend API
    fetchUsersData();
  }, []);

  // Function to fetch users data from the API
  const fetchUsersData = async () => {
    try {
      setIsLoading(true);
      // Retrieve the token from local storage
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("Token not found in local storage");
        setIsLoading(false);
        return;
      }

      const response = await axios.get<User[]>("http://localhost:3000/auth", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });

      const usersData: User[] = response.data;
      setUsers(usersData);
      console.log(usersData);
      const writers = usersData.filter((user: User) => user.role === "Writer");
      setWritersCount(writers.length);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users data:", error);
      setIsLoading(false);
    }
  };
  const handleDeleteUser = async (userId: any) => {
    try {
      console.log(userId);
      const response = await fetch(`http://localhost:3000/auth/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.status === 200) {
        // User deleted successfully
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        ); // Update users state
        Swal.fire(
          "User Deleted",
          "User has been deleted successfully",
          "success"
        );
      } else {
        Swal.fire("Error", "Failed to delete user", "error");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire("Error", "Failed to delete user", "error");
    }
  };

  const fetchBlogsData = async () => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("Token not found in local storage");
        return;
      }

      const response = await axios.get("http://localhost:3000/blog", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const blogs = response.data;

      console.log(blogs);

      setBlogsCount(blogs.length);
    } catch (error) {
      console.error("Error fetching blogs data:", error);
    }
  };

  useEffect(() => {
    // Fetch data from backend API
    fetchBlogsData();
  }, []);

  // Function to handle click on a div/button
  const handleClick = async (title: string) => {
    try {
      // Fetch more detailed information from the backend
      const detailedInfo = await fetchDataBasedOnTitle(title);
      // Display detailed information in a popup
      Swal.fire({
        title,
        html: `<pre>${JSON.stringify(detailedInfo, null, 2)}</pre>`,
        confirmButtonText: "Close",
      });
    } catch (error) {
      console.error("Error fetching detailed information:", error);
    }
  };

  // Dummy function to fetch detailed data based on title
  const fetchDataBasedOnTitle = async (title: string) => {
    // You can implement logic to fetch more detailed information based on the clicked div/button title
    return `Total ${title} : ${writersCount}`;
  };
  const handleLogout = () => {
    // Clear authentication token from local storage
    localStorage.removeItem("authToken");
    // Redirect user to the login page
    router.push("/login"); // Assuming your login page route is "/login"
  };
  return (
    <div className="flex">
      <NextTopLoader />
      {/* Sidebar */}
      <div className=" w-64 bg-gray-800">
        <div className="p-4 text-white">
          <div className="mb-4 flex items-center">
            <img
              src="/profile.jpg"
              alt="Profile"
              className="mr-2 h-12 w-12 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">{userName}</h1>
              <p className="text-sm">{userRole}</p>
            </div>
          </div>
          <ul className="mt-4">
            <li className="flex items-center py-2">
              <svg
                className="mr-2 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10V21a2 2 0 002 2h10a2 2 0 002-2V10" />
              </svg>
              Dashboard
            </li>
            <li className="flex items-center py-2">
              <svg
                className="mr-2 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5l7 7-7 7-7-7 7-7z" />
              </svg>
              Blog Approvals
            </li>
            <li className="flex items-center py-2">
              <svg
                className="mr-2 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Pending Blogs
            </li>
            <li className="flex items-center py-2">
              <svg
                className="mr-2 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5l7 7-7 7-7-7 7-7z" />
              </svg>
              Disapproved Blogs
            </li>
            <li className="flex items-center py-2">
              <svg
                className="mr-2 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5l7 7-7 7-7-7 7-7z" />
              </svg>
              Users
            </li>
            <li className="flex items-center py-2">
              <svg
                className="mr-2 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
              Writers
            </li>
          </ul>
          <button
            className="mt-4 rounded-lg bg-slate-600 px-4 py-2 text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}

      <div className="flex flex-1 flex-col gap-8 p-8">
        <div className="flex flex-row gap-8">
          {/* Total Stats */}
          <div className="flex flex-1 flex-col gap-4">
            <button
              className={`animate__animated animate__fadeIn flex-1 rounded-lg bg-white p-4 shadow-md transition duration-300 ease-in-out hover:bg-slate-500 ${
                isLoading ? "pointer-events-none opacity-50" : ""
              }`}
              onClick={() => handleClick("Writers")}
            >
              <h3 className="mb-2 text-xl font-semibold">Writers</h3>
              <p>{writersCount}</p>
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <button
              className={`animate__animated animate__fadeIn flex-1 rounded-lg bg-white p-4 shadow-md transition duration-300 ease-in-out hover:bg-slate-500 ${
                isLoading ? "pointer-events-none opacity-50" : ""
              }`}
              onClick={() => handleClick("Blogs")}
            >
              <h3 className="mb-2 text-xl font-semibold">Blogs</h3>
              <p>{blogsCount}</p>
            </button>
          </div>
          <div className="animate__animated animate__fadeIn flex-1 rounded-lg bg-white p-4 shadow-md">
            <h3 className="mb-4 text-xl font-semibold">Comments</h3>
            {/* Dropdown to select users */}
          </div>
          <div className="animate__animated animate__fadeIn flex-1 rounded-lg bg-white p-4 shadow-md">
            <h3 className="mb-4 text-xl font-semibold">Likes</h3>
            {/* Dropdown to select users */}
          </div>
        </div>

        {/* First Row */}
        <div className="flex flex-row gap-8">
          {/* Total Stats */}
          <div className="flex-1">
            <div
              className="animate__animated animate__fadeIn cursor-pointer rounded-lg bg-white p-4 shadow-md hover:bg-slate-500"
              onClick={handleCategoryClick}
            >
              <h3 className="mb-4 text-xl font-semibold">Categories</h3>
              {/* No need for a button, the entire div is clickable */}
            </div>

            {/* Modal to display categories */}
            {showCategories && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="rounded-md bg-white p-8">
                  <h2 className="mb-4 text-xl font-semibold">Categories</h2>
                  <ul>
                    {categories.map((category) => (
                      <li key={category._id}>{category.name}</li>
                    ))}
                  </ul>
                  <button
                    className="mt-4 rounded-md bg-slate-600 px-4 py-2 text-white"
                    onClick={() => setShowCategories(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Dropdown */}
          <div className="flex-1">
            <div
              className="animate__animated animate__fadeIn cursor-pointer rounded-lg bg-white p-4 shadow-md hover:bg-slate-500"
              onClick={handleAdminClick} // Handle click on the admin section
            >
              <h3 className="mb-4 text-xl font-semibold">Admin</h3>
              {/* No need for a button, the entire div is clickable */}
            </div>

            {/* Modal to display user profile */}
            {userData && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="rounded-md bg-white p-8">
                  <h2 className="mb-4 text-xl font-semibold">User Profile</h2>
                  <p>Name: {userData.name}</p>
                  <p>Email: {userData.email}</p>
                  {/* Add other user fields as needed */}
                  <button
                    className="mt-4 rounded-md bg-slate-600 px-4 py-2 text-white"
                    onClick={() => setUserData(null)} // Close the modal on button click
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Second Row */}
        <div className="flex flex-row gap-8">
          {/* Graph and Visitors */}
          <div className="animate__animated animate__fadeIn flex-1 rounded-lg bg-white p-4 shadow-md">
            <h3 className="mb-4 text-xl font-semibold">Graph </h3>
            {/* Dummy graph */}
            <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="5" width="10" height="40" fill="#3182CE" />
              <rect x="20" y="15" width="10" height="30" fill="#3182CE" />
              <rect x="40" y="25" width="10" height="20" fill="#3182CE" />
              <rect x="60" y="10" width="10" height="35" fill="#3182CE" />
              <rect x="80" y="20" width="10" height="25" fill="#3182CE" />
            </svg>
            <p>Total Visitors: 100</p>
          </div>
          {/* Recent Blogs */}
          <div className="animate__animated animate__fadeIn rounded-lg bg-white p-4 shadow-md">
            <h3 className="mb-4 text-xl font-semibold">All users</h3>
            <div className="overflow-x-auto">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-4 py-2">{user.name}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2">
                          <button
                            className="rounded-md bg-red-500 px-2 py-1 text-white"
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            {users.length > 5 && (
              <button
                className="mt-4 rounded-md bg-blue-500 px-2 py-1 text-white"
                onClick={() => alert("Pagination")}
              >
                Next Page
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
