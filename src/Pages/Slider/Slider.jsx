import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axiosInstance from "../../axios/axiosInstance";
import Swal from "sweetalert2";

function Slider() {
  const sliderHeader = ["لینک", "عکس", "عملیات"];
  const [data, setData] = useState([]);
  const handleSetData = async () => {
    try {
      const sliders = await axiosInstance.get("/sliders");
      setData(sliders.data.data);
      setData(sliders.data.data);
      console.log(sliders.data.data);
    } catch (error) {
      throw Error(error.message);
    }
  };
  const deleteSlider = async (id) => {
    try {
      console.log(id);
      const deleteSlider = await axiosInstance.delete(`sliders/${id}`);
      console.log(deleteSlider);
      handleSetData();
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    handleSetData();
  }, []);
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10 mx-10 text-center">
      {/* add */}
      <div className="flex items-start mr-10 ">
        <Link
          to="/slider/add"
          className="border-2 border-indigo-500 text-indigo-500 rounded-lg px-4 py-2 mb-10 
      hover:bg-indigo-500 hover:text-white transition-all duration-300 "
        >
          <span className="no-underline text-black list-none ">
            افزودن اسلایدر
          </span>
        </Link>
      </div>
      {/* table */}
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center">
          <tr>
            {sliderHeader.map((item, index) => {
              return (
                <th key={index} scope="col" className="py-3 px-6">
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((d) => {
            return (
              <tr className="bg-white border-b hover:bg-gray-50 text-center">
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  {d.url}
                </td>
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap w-54 h-44">
                  <img src={d.image} />
                </td>

                <td className="py-4 px-6">
                  <Link
                    to={`/slider/${d.id}`}
                    className="font-medium text-blue-600 mr-3  bg-blue-300 px-3 py-2 inline-block hover:bg-blue-400 transition-colors"
                  >
                    ویرایش
                  </Link>
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: "آیا میخواهید اسلایدر را حذف کنید",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteSlider(d.id);
                        }
                      });
                    }}
                    className="font-medium text-red-600 bg-red-300 px-3 py-2 rounded-md inline-block hover:bg-red-400 transition-colors"
                  >
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

export default Slider;
