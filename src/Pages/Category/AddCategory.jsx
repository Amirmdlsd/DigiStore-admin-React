import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../../axios/axiosInstance";

const schema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "نام دسته‌بندی الزامی است",
  }),
  file: Joi.any().required().messages({
    "any.required": "فایل تصویر الزامی است",
  }),
});

function AddCategory() {
  const navigate = useNavigate();
  const [category, setCategory] = useState({ name: "", file: null });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setCategory((prev) => ({
        ...prev,
        file: files[0],
      }));
    } else {
      setCategory((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setError(null); // Reset error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = schema.validate(category);
    if (error) {
      setError(error.details[0].message);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", category.name);
      formData.append("image", category.file);

      const response = await axiosInstance.post("category", formData);
      console.log(response.data);

      setSuccess(true);
      setCategory({ name: "", file: null });
      setTimeout(() => navigate(-1), 1500);
    } catch (err) {
      console.error(err);
      setError("خطا در ارسال اطلاعات");
    }
  };

  return (
    <>
      <div className="flex justify-between w-[980px] items-center mx-auto mt-10">
        <h1 className="text-xl font-bold">ایجاد دسته‌بندی</h1>
        <div className="flex bg-gray-100 border px-3 py-1 rounded-2xl">
          <button
            className="hover:text-white flex items-center hover:bg-blue-200 px-2 py-1 rounded"
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
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-10 p-6 bg-white shadow-md rounded-lg w-[980px] h-[auto]"
        encType="multipart/form-data"
      >
        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            دسته‌بندی با موفقیت ایجاد شد!
          </div>
        )}

        {/* Name Input */}
        <div className="mb-6">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="name"
          >
            نام دسته‌بندی
          </label>
          <input
            onChange={handleChange}
            name="name"
            type="text"
            id="name"
            value={category.name}
            className="block w-full mt-1 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="نام دسته‌بندی را وارد کنید"
          />
        </div>

        {/* File Input */}
        <div className="mb-6">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="file"
          >
            تصویر دسته‌بندی
          </label>
          <input
            onChange={handleChange}
            name="file"
            type="file"
            id="file"
            className="block w-full text-gray-700 py-2 px-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 cursor-pointer"
          />
        </div>

        {/* Submit Button */}
        <div className="text-left mt-10">
          <button
            type="submit"
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            ثبت
          </button>
        </div>
      </form>
    </>
  );
}

export default AddCategory;
