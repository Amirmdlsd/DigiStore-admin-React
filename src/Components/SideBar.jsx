import React from "react";
import Acordion from "./Acordion";

function SideBar() {
  const acordionItem = [
    { name: "اسلایدر", to: "/slider" },
    { name: "دسته بندی", to: "/category" },
    { name: "محصولات", to: "/product" },
    { name: "کامنت ها", to: "/commetns" },
  ];
  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-orange-500"></div>
          <div>
            <h3 className="font-medium">Admin Panel</h3>
            <p className="text-sm text-gray-500">Dashboard</p>
          </div>
        </div>
      </div>

      {/* Sidebar Menu */}
      <nav className="mt-6">
        <Acordion acordionItem={acordionItem} />
      </nav>
    </div>
  );
}

export default SideBar;
