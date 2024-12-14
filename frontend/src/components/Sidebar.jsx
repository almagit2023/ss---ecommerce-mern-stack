import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4 font-bold text-lg">E-Commerce Admin</div>
      <nav className="mt-4">
        <ul className="space-y-2">
          {["Dashboard"].map((item) => (
            <li key={item}>
              <a
                href="/admin-dashboard"
                className="block px-4 py-2 text-gray-700 font-bold border-b-4 hover:bg-gray-100 hover:text-gray-900 rounded"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
