import React from "react";
import Header from "./Components/Header";
import SideBar from "./Components/SideBar";
import Category from "./Pages/Category/Category";
import { BrowserRouter, Routes, Route } from "react-router";
import AddCategory from "./Pages/Category/AddCategory";

function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <Header />
        {/* Main Content Area */}
        
          <Routes>
            <Route path="/" element={<div>hi</div>} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/add" element={<AddCategory />} />
          </Routes>
      
      </div>
    </div>
  );
}

export default App;
