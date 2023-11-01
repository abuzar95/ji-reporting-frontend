import React from "react";

export const Library = () => {
  return (
    <div className="w-full" dir="rtl">
      <h3 className="text-lg mb-3">لائبریری</h3>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        <div className="w-full md:pr-0 mb-2">
          <label htmlFor="" className="text-lg mb-2">
            تعداد کتب
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            placeholder="Input 1"
          />
        </div>
        <div className="w-full mb-2">
          <label htmlFor="" className="text-lg mb-2">
            اضافء
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            placeholder="Input 2"
          />
        </div>
      </div>
      <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
        <div className="w-full md:pr-0 mb-2">
          <label htmlFor="" className="text-lg mb-2">
            کمی
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            placeholder="Input 1"
          />
        </div>
        <div className="w-full mb-2">
          <label htmlFor="" className="text-lg mb-2">
            اجرآےکتب
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded-lg"
            placeholder="Input 1"
          />
        </div>
      </div>
      <div className="w-full mb-2">
        <label htmlFor="" className="text-lg mb-2">
          لاِئبریری رجسٹر
        </label>
        <div className="mt-4 flex">
          <label className="block">
            <input type="radio" className="mr-2" name="radio-group" />
            مرتب
          </label>
          <label className="block">
            <input type="radio" className="mr-2" name="radio-group" />
            غیرمرتب
          </label>
        </div>
      </div>
    </div>
  );
};
