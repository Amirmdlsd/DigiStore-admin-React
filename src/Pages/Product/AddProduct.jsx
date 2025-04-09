import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios/axiosInstance";
import { useNavigate } from "react-router";

function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    discount: "",
    image: "",
    category_id: null,
  });
  const [error, setError] = useState({ status: null, message: "" });
  const [success, setSuccess] = useState({ status: null, message: "" });
  const [category, setCategory] = useState([]);

  const handleSetCategory = async () => {
    try {
      const data = await axiosInstance.get("/category");
      setCategory(data.data.data);
    } catch (error) {
      setError({ status: true, message: "خطایی رخ داده است!" });
      throw new Error(error);
    }
  };

  useEffect(() => {
    handleSetCategory();
  }, []);

  const handleSetProduct = (event) => {
    setProduct((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("description", product.description);
      formData.append("category_id", Number(product.category_id));
      formData.append("image", product.image);
      formData.append("quantity", product.quantity);
      formData.append("discount", product.discount);
      formData.append("price", product.price);
      console.log(typeof formData.get("category_id"));
      const data = await axiosInstance.post("/product", formData);
      setSuccess({ status: true, message: data.data.message });
      setProduct({
        title: "",
        description: "",
        price: "",
        quantity: "",
        discount: "",
        image: "",
        category_id: null,
      });
      setTimeout(() => navigate("/product"));
    } catch (error) {
      setError({
        status: true,
        message: "خطایی رخ داده است!",
      });
      console.log(error.response.data);
      throw new Error(error);
    }
  };

  return (
    <>
      <div className="flex justify-between w-[980px] items-center mx-auto mt-10 mb-12">
        <h1 className="text-xl font-bold">ایجاد محصول</h1>
        <button
          className="flex items-center bg-gray-100 border px-3 py-1 rounded-2xl hover:bg-blue-200 hover:text-white"
          onClick={() => navigate(-1)}
        >
          <span className="ml-2">برگشت</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-10 p-6 bg-white shadow-md rounded-lg w-[980px]"
        encType="multipart/form-data"
      >
        {error.status && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error.message}
          </div>
        )}
        {success.status && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {success.message}
          </div>
        )}

        <div className="mb-6">
          <label
            className="block text-sm font-bold text-gray-800 mb-2"
            htmlFor="title"
          >
            نام محصول
          </label>
          <input
            onChange={handleSetProduct}
            name="title"
            type="text"
            id="title"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            placeholder="نام محصول را وارد کنید"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-sm font-bold text-gray-800 mb-2"
            htmlFor="description"
          >
            توضیحات محصول
          </label>
          <textarea
            name="description"
            onChange={handleSetProduct}
            id="description"
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            rows="4"
            placeholder="توضیحاتی برای محصول وارد کنید"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label
              className="block text-sm font-bold text-gray-800 mb-2"
              htmlFor="discount"
            >
              تخفیف
            </label>
            <input
              name="discount"
              onChange={handleSetProduct}
              type="text"
              id="discount"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="تخفیف محصول"
            />
          </div>

          <div>
            <label
              className="block text-sm font-bold text-gray-800 mb-2"
              htmlFor="price"
            >
              قیمت
            </label>
            <input
              name="price"
              onChange={handleSetProduct}
              type="text"
              id="price"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="قیمت محصول"
            />
          </div>

          <div>
            <label
              className="block text-sm font-bold text-gray-800 mb-2"
              htmlFor="quantity"
            >
              موجودی
            </label>
            <input
              name="quantity"
              onChange={handleSetProduct}
              type="text"
              id="quantity"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="تعداد محصول"
            />
          </div>

          <div>
            <label
              className="block text-sm font-bold text-gray-800 mb-2"
              htmlFor="category_id"
            >
              دسته‌بندی
            </label>
            <select
              name="category_id"
              onChange={handleSetProduct}
              id="category_id"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">انتخاب دسته‌بندی</option>
              {category.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label
            className="block text-sm font-bold text-gray-800 mb-2"
            htmlFor="image"
          >
            تصویر محصول
          </label>
          <input
            onChange={(event) =>
              setProduct((prev) => ({
                ...prev,
                image: event.target.files[0],
              }))
            }
            name="image"
            type="file"
            id="image"
            className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="mt-10 text-left">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            ثبت محصول
          </button>
        </div>
      </form>
    </>
  );
}

export default AddProduct;
