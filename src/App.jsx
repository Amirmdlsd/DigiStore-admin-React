import React from "react";
import Header from "./Components/Header";
import SideBar from "./Components/SideBar";
import Category from "./Pages/Category/Category";
import { Routes, Route } from "react-router";
import AddCategory from "./Pages/Category/AddCategory";
import Slider from "./Pages/Slider/Slider";
import CreateSlider from "./Pages/Slider/CreateSlider";
import Product from "./Pages/Product/Product";
import AddProduct from "./Pages/Product/AddProduct";

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
          <Route path="/slider" element={<Slider />} />
          <Route path="/slider/add" element={<CreateSlider />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/add" element={<AddCategory />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/add" element={<AddProduct />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
