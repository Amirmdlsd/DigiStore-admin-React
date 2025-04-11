import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axiosInstance from "../../axios/axiosInstance";

function CreateSlider() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [status, setStatus] = useState({
    status: null,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [slider, setSlider] = useState({
    url: "",
    image: "",
  });

  const handleSetSlider = (event) => {
    setSlider((preview) => ({
      ...preview,
      [event.target.name]: event.target.value,
    }));
  };

  const handleGetdataForUpdate = async () => {
    try {
      const data = await axiosInstance.get(`sliders/${id}`);
      setSlider({
        url: data.data.data.url,
        image: data.data.data.image,
      });
      console.log(data.data.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    id && handleGetdataForUpdate();
  }, []);

  const handleOnSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    setTimeout(async () => {
      try {
        const formData = new FormData();
        formData.append("url", slider.url);
        formData.append("image", slider.image);
        console.log(formData.get("url"), formData.get("image"));
        const result = await axiosInstance.post("/sliders", formData);
        setStatus({
          status: false,
          message: "عملیات با موفقیت انجام شد",
        });
        setLoading(false);
        console.log(result);
        setSlider({ image: "", url: "" });
        navigate("/slider");
      } catch (error) {
        setLoading(false);

        setStatus({
          status: true,
          message: "خطایی رخ داده است!",
        });
        throw Error(error.message);
      }
    }, 2000);
  };

  const handleSubmitForUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", slider.image);
    formData.append("url", slider.url);
    const res = await axiosInstance.patch(`sliders/${id}`, formData);
    console.log(res);
    setStatus({ status: true, message: "با نوفقیت ویرایش شد" });
  };

  return (
    <>
      <div className="flex justify-between w-[980px] items-center mx-auto mt-10">
        <h1 className="text-xl font-bold">
          {id ? ",ویرایش اسلایدر" : "افزودن اسلایدر"}
        </h1>
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
        onSubmit={id ? handleSubmitForUpdate : handleOnSubmit}
        className="mx-auto mt-10 p-6 bg-white shadow-md rounded-lg w-[980px] h-[auto]"
        encType="multipart/form-data"
      >
        {/* Error */}

        {/* Name Input */}
        <div className="mb-6">
          {
            (status.status == false && (
              <h6 className="bg-green-200 text-green-600 py-1">
                {status.message}
              </h6>
            ),
            status.status == true && (
              <h6 className="bg-red-200 px-2 text-red-600 py-2 rounded-sm">
                {status.message}
              </h6>
            ))
          }
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="name"
          >
            لینک
          </label>
          <input
            name="url"
            value={slider.url}
            onChange={handleSetSlider}
            type="text"
            id="name"
            className="block w-full mt-1 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="لینک اسلایدر"
          />
        </div>

        {/* File Input */}
        <div className="mb-6">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="file"
          >
            تصویر
          </label>
          <input
            name="image"
            onChange={(e) =>
              setSlider((prev) => ({ ...prev, image: e.target.files[0] }))
            }
            type="file"
            id="file"
            className="block w-full text-gray-700 py-2 px-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 cursor-pointer"
          />
          <img src={slider.image} />
        </div>

        {/* Submit Button */}
        <div className="text-left mt-10">
          <button
            disabled={loading}
            type="submit"
            className="rounded-lg
            disabled:bg-blue-200 disabled:text-white disabled:rounded-lg
            bg-blue-500 text-white px-5 py-2  hover:bg-blue-600 transition"
          >
            {loading ? "درحال ارسال" : " ثبت"}
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateSlider;
