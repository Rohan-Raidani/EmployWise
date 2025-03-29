import React from "react";

const error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-light">
      <h1 className="text-4xl font-bold text-red-500">404</h1>
      <p className="text-xl text-primary">Oops! Page not found.</p>
      <a
        href="/"
        className="mt-10 p-2 bg-secondary text-light rounded-md shadow-md "
      >
        Go Home
      </a>
    </div>
  );
};

export default error;
