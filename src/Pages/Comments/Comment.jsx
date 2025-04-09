import React, {useEffect, useState} from "react";
import {Link} from "react-router";
import axiosInstance from "../../axios/axiosInstance.js";

export default function Comment() {
    const [comments, setComments] = useState([]);
    const header = [
        "نام یوسر", "محصول", "کامنت", "وضعیت", "عملیات"
    ]
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState({status: false, message: ''});
    const [error, setError] = useState({
        status: false, message: ''
    });

    const changeStatusToFa = (text) => {
        let result = "";
        switch (text) {
            case "pending_review":
                result = <p className="text-blue-500">در انتضار بررسی</p>;
                break;
            case "rejected":
                result =<p className="text-red-600"> "رد شده"</p>;
                break;
            case "accepted":
                result = <p className="text-green-600">تایید شده</p>;
                break;
        }
        return result
    }

    const getComments = async () => {
        try {
            setLoading(true);
            const data = await axiosInstance.get("/comments");
            console.log(data.data.data)
            setComments(data.data.data);
            setLoading(false);

        } catch (error) {
            setLoading(false);
            setError({status: true, message: "خطایی رخ داده است!"});
            throw new Error(error)
        }
    }
    useEffect(() => {
        getComments()
    }, []);
    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10 mx-10 text-center">
            {/* add */}
            <div className="flex items-start mr-10 ">
            </div>
            {/* table */}
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center">
                <tr>
                    {header.map((item, index) => {
                        return (
                            <th key={index} scope="col" className="py-3 px-6">
                                {item}
                            </th>
                        );
                    })}
                </tr>
                </thead>
                <tbody>
                {comments.map((d) => {
                    return (
                        <tr className="bg-white border-b hover:bg-gray-50 text-center">
                            <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                {d.user.name + " " + d.user.last_name}
                            </td>
                            <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                {d.product.title}
                            </td>
                            <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                {d.text}
                            </td>
                            <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                {changeStatusToFa(d.status)}
                            </td>

                            <td className="py-4 px-6">
                                <button
                                    className="font-medium text-blue-600 mr-3 rounded-md bg-blue-300 px-3 py-2 inline-block hover:bg-blue-400 transition-colors">
                                    ویرایش
                                </button>
                                <button
                                    className="font-medium text-red-600 bg-red-300 px-3 py-2 rounded-md inline-block hover:bg-red-400 transition-colors">
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