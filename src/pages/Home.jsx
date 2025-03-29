import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Card from "../components/card";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";

import { fetchUsers, deleteUser, updateUser } from "../service/index";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load Users on Page Load
  useEffect(() => {
    loadUsers(currentPage);
  }, [currentPage]);

  // Fetch Users
  const loadUsers = async (page) => {
    setLoading(true);
    try {
      const data = await fetchUsers(page);
      setUsers(data.data);
      setAllUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search input
  useEffect(() => {
    if (search === "") {
      setUsers(allUsers); // Reset if search is empty
    } else {
      const filteredUsers = allUsers.filter((user) =>
        `${user.first_name} ${user.last_name}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
      setUsers(filteredUsers);
    }
  }, [search, allUsers]);

  // Edit User Data
  const handleEdit = async (id, updatedData) => {
    try {
      const updatedUser = await updateUser(id, updatedData);
      setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
      showNotification("User updated successfully!");
    } catch (err) {
      showNotification(err.message, true);
    }
  };

  // Handle Delete User
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
        showNotification("User deleted successfully!");
      } catch (err) {
        showNotification(err.message, true);
      }
    }
  };

  // Show notification
  const showNotification = (message, isError = false) => {
    const notification = document.createElement("div");
    notification.className = `z-9999 fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
      isError ? " bg-red-500" : "bg-primary"
    } text-white transition-opacity duration-500`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = "0";
      setTimeout(() => document.body.removeChild(notification), 500);
    }, 3000);
  };

  // Change Page
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-light">
      <Navbar search={search} setSearch={setSearch} />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="h-12 w-12 text-primary animate-spin" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mt-8 p-4 bg-red-100 rounded-md max-w-md mx-auto">
          {error}
        </div>
      ) : (
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-8 p-8">
            {users.length > 0 ? (
              users.map((user) => (
                <Card
                  key={user.id}
                  user={user}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="text-center p-8 text-gray-500">
                No users found matching your search criteria in this page.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && users.length > 0 && (
        <div className="flex justify-center items-center gap-6 p-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-5 py-2 rounded-md flex items-center gap-2 transition-all duration-300 ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary"
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            Prev
          </button>

          <div className="flex items-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-10 w-10 mx-1 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "bg-accent text-secondary hover:bg-accent"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-5 py-2 rounded-md flex items-center gap-2 transition-all duration-300 ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary"
            }`}
          >
            Next
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
