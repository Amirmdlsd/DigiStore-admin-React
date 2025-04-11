import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios/axiosInstance";
import { Link, Navigate, useNavigate } from "react-router";
import DeleteAlert from "../../Components/Alert";

function Product() {
  const productHeader = [
    "نام محصول",
    "قیمت",
    "تخفیف",
    "عکس",
    "دسته بندی ",
    "تعداد",
    "اسپشیال",
    "عملیات",
  ];
  const [products, setProducts] = useState([]);
  const [totlaPage, setTotalPage] = useState();
  const navigate = useNavigate();
  const handleSetProducts = async () => {
    try {
      const data = await axiosInstance.get("/product");
      setProducts(data.data.data.result);
      setTotalPage(data.data.data.totalPages);
      console.log(data.data);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  const handleDeleteProduct = async (id) => {
    DeleteAlert({
      title: "ایا میخواهید محصول را حذف کنید؟",
      func: async () => {
        try {
          await axiosInstance.delete(`product/${id}`);
          handleSetProducts();
        } catch (error) {
          throw new Error(error);
        }
      },
    });
  };
  useEffect(() => {
    handleSetProducts();
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
          {products.map((product) => {
            return (
              <tr className="bg-white border-b hover:bg-gray-50 text-center">
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  {product.title}
                </td>
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  {product.price}
                </td>
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  {product.discount}
                </td>
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap w-54 h-44">
                  <img src={product.image} />
                </td>
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  {product.title}
                </td>
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  {product.quantity}
                </td>
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  {product.is_special ? (
                    <p className="text-green-600 bg-green-300">بله</p>
                  ) : (
                    <span className="text-red-600 bg-red-300 rounded-3xl text-sm px-2 py-2">
                      خیر
                    </span>
                  )}
                </td>
                <td className="py-4 px-6">
                  <button className="font-medium text-blue-600 mr-3 rounded-md bg-blue-300 px-3 py-2 inline-block hover:bg-blue-400 transition-colors">
                    ویرایش
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="font-medium text-red-600 bg-red-300 px-3 py-2 rounded-md inline-block hover:bg-red-400 transition-colors"
                  >
                    حذف
                  </button>
                  <button
                    className="font-medium text-black bg-gray-300 px-3 py-2 rounded-md
                   inline-block hover:bg-gray-400 transition-colors"
                    onClick={() =>
                      navigate(`/product/${product.id}/addGallery`)
                    }
                  >
                    ایجاد عکس
                  </button>
                  <button
                    onClick={() => navigate(`/product/${product.id}/addColor`)}
                    className="font-medium text-green-600 bg-green-300
                      px-3 py-2 rounded-md inline-block hover:bg-green-400 transition-colors"
                  >
                    افزودن رنگ
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
