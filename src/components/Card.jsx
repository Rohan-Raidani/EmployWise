import React, { useState } from "react";
import { Edit2, Trash2, Save, X, Upload } from "lucide-react";

const Card = ({ user, onEdit, onDelete }) => {
  const { id, first_name, last_name, email, avatar } = user;
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    first_name,
    last_name,
    email,
    avatar,
  });

  // Handle Edit Button Click
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handle Save Button Click
  const handleSave = () => {
    onEdit(id, updatedUser);
    setIsEditing(false);
  };

  // Handle Cancel Edit
  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedUser({ first_name, last_name, email, avatar });
  };

  // Handle Input Change
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // Handle Avatar Upload
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedUser({ ...updatedUser, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden flex flex-col items-center shadow-lg bg-white font-Roboto-light w-72 transition-all duration-300 hover:shadow-xl">
      <div className="h-28 w-full bg-primary" />
      <div className="top-16 z-10 flex items-center flex-col gap-4 px-6 py-6 w-full">
        <div className="-mt-20 relative group">
          <img
            src={updatedUser.avatar || "/placeholder.svg"}
            alt={`${first_name} ${last_name}`}
            className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
          />
          {isEditing && (
            <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer group-hover:opacity-100">
              <Upload className="h-8 w-8 text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        {isEditing ? (
          <div className="flex flex-col gap-3 w-full">
            <div className="relative">
              <input
                type="text"
                name="first_name"
                value={updatedUser.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="border-2 border-accent p-2 rounded-md w-full focus:outline-none focus:border-primary"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                name="last_name"
                value={updatedUser.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="border-2 border-accent p-2 rounded-md w-full focus:outline-none focus:border-primary"
              />
            </div>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
                placeholder="Email"
                className="border-2 border-accent p-2 rounded-md w-full focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex gap-2 mt-3 justify-center">
              <button
                onClick={handleSave}
                className="bg-primary hover:bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors duration-300"
              >
                <Save className="h-4 w-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-secondary  text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors duration-300"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-secondary">
              {first_name} {last_name}
            </h3>
            <p className="text-gray-500 text-center">{email}</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleEditClick}
                className="bg-primary hover:bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors duration-300"
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={() => onDelete(id)}
                className="bg-secondary  text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors duration-300"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
