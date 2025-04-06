import React from "react";
import { Link } from "react-router";

function Acordion({ acordionItem }) {
  return (
    <>
      {acordionItem.map((item) => {
        console.log(item);
        return (
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            key={Math.random()}
          >
            <div className="flex items-center space-x-3">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
                  />
                </svg>
              </svg>
              <Link className="text-black font-bold [text-decoration:none]" to={item.to}>
                {item.name}
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Acordion;
