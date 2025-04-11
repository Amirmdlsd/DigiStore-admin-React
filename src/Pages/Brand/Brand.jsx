import { useEffect, useState } from "react";
import { Link } from "react-router";
import axiosInstance from "../../axios/axiosInstance";

const Brand = () => {
  const tableData = {
    header: ["نام", "عکس", "عملیات"],
  };
  const [data, setData] = useState([]);
  const handleGetData = async () => {
    try {
      const res = await axiosInstance.get("slider");
      console.log(res.data.data);
      setData(res.data.data);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    handleGetData();
  }, []);
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10 mx-10 text-center">
      {/* add */}
      <div className="flex items-start mr-10 ">
        <Link
          to="/brand/create"
          className="border-2 border-indigo-500 text-indigo-500 rounded-lg px-4 py-2 mb-10 
        hover:bg-indigo-500 hover:text-white transition-all duration-300 "
        >
          <span className="no-underline text-black list-none ">
            افزودن برند
          </span>
        </Link>
      </div>
      {/* table */}
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center">
          <tr>
            {tableData.header.map((item, index) => {
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
              <tr
                key={d.id}
                className="bg-white border-b hover:bg-gray-50 text-center"
              >
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  {d.title}
                </td>
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap w-54 h-44">
                  <img src={d.image} />
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
};

export default Brand;
