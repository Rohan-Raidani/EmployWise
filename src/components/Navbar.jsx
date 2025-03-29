import React from "react";
import { Search } from "lucide-react";

const Navbar = ({ search, setSearch }) => {
  return (
    <nav className="bg-secondary shadow-lg p-4 flex justify-center items-center">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-accent" />
        </div>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-4 py-2 border-2 border-primary rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-light"
        />
      </div>
    </nav>
  );
};

export default Navbar;
