import React, { useState, useTransition } from "react";
import { useNavigate, useParams } from "react-router";
import axiosInstance from "../../axios/axiosInstance";

function CreateGallery() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState("");
  const [error, setError] = useState({ status: null, message: "" });
  const [success, setSuccess] = useState({ status: null, message: "" });
  const [loading, setLoading] = useState(false);

  const handleSetForm = (event) => {
    setForm(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    try {
      setLoading(true);
      event.preventDefault();
      const formData = new FormData();
      formData.append("image", form);
      const resutlt = await axiosInstance.post(`/gallery/${id}`, formData);

      setSuccess({ status: true, message: resutlt.data.message }),
        setLoading(false);

      setTimeout(() => navigate(-1), 1000);
    } catch (error) {
      setLoading(false);

      setTimeout(
        () => setError({ status: true, message: "خطایی رخ داده است!" }),
        3000
      );
      console.error(error);
      throw new Error(error);
    }
  };

  return (
    <>
      <div className="flex justify-between w-[980px] items-center mx-auto mt-10">
        <h1 className="text-xl font-bold">ایجاد 'گالری'</h1>
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

        {/* File Input */}
        <div className="mb-6">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="file"
          >
            انتخاب عکس
          </label>
          <input
            onChange={handleSetForm}
            name="file"
            type="file"
            id="file"
            className="block w-full text-gray-700 py-2 px-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 cursor-pointer"
          />
        </div>

        {/* Submit Button */}
        <div className="text-left mt-10">
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition
            disabled:bg-blue-300
            "
          >
            ثبت
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateGallery;
