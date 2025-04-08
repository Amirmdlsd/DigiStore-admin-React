import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios/axiosInstance";
import { Link } from "react-router";

function Product() {
  const productHeader = [
    "نام محصول",
    "قیمت",
    "تخفیف",
    "عکس",
    "دسته بندی ",
    "تعداد",
    "اسپشیال","عملیات"
  ];
  const [products, setProducts] = useState([]);
  const handleSetProducts = async () => {
    try {
      const data = await axiosInstance.get("/product");
      setProducts(data.data.data);
      console.log(data.data.data)
    } catch (error) {
      console.error(error)
      throw new Error(error);
    }
  };
  useEffect(() => {
    handleSetProducts()
  }, []);

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10 mx-10 text-center">
      {/* add */}
      <div className="flex items-start mr-10 ">
        <Link
          to="/product/add"
          className="border-2 border-indigo-500 text-indigo-500 rounded-lg px-4 py-2 mb-10 
        hover:bg-indigo-500 hover:text-white transition-all duration-300 "
        >
          <span className="no-underline text-black list-none ">
            افزودن محصول
          </span>
        </Link>
      </div>
      {/* table */}
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center">
          <tr>
            {productHeader.map((item, index) => {
              return (
                <th key={index} scope="col" className="py-3 px-6">
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {products.map((d) => {
            return (
              <tr className="bg-white border-b hover:bg-gray-50 text-center">
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  {d.title}
                </td>
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  {d.price}
                </td>
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  {d.discount}
                </td>
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  {d.image}
                </td>
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  {d.title}
                </td>
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  {d.quantity}
                </td>
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  {d.is_special?<p className="text-green-600 bg-green-300">بله</p>:
                  <span className="text-red-600 bg-red-300 rounded-3xl text-sm px-2 py-2">خیر</span>}
                </td>
                <td className="py-4 px-6">
                  <button className="font-medium text-blue-600 mr-3 rounded-md bg-blue-300 px-3 py-2 inline-block hover:bg-blue-400 transition-colors">
                    ویرایش
                  </button>
                  <button className="font-medium text-red-600 bg-red-300 px-3 py-2 rounded-md inline-block hover:bg-red-400 transition-colors">
                    حذف
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Product;
