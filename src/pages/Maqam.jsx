import React from "react";
import { DivisionTable } from "../components/maqam/DivisionTable";
import {
  CenteralActivities,
  ExpandParty,
  Library,
  Zila,
  MessageDigest,
  EveningDiary,
  MenTable,
} from "../components";
import { OtherActivities } from "../components/OtherActivities";

export const Maqam = () => {
  const arr = [
    {
      title: "دعوتی وفود",

      placeholder: "Input 1",
    },
    {
      title: "روابط پارٹیز",

      placeholder: "Input 1",
    },
    // {
    //   title: " حادیث سرکل",

    //   placeholder: "Input 1",
    // },
    {
      title: "نظام الصلٰتہ",

      placeholder: "Input 1",
    },
    {
      title: "شب بیداری",

      placeholder: "Input 1",
    },
    {
      title: "کوءی اور سرگرمی",

      placeholder: "Input 1",
    },
  ];

  return (
    <div
      className="flex flex-col justify-center items-center p-4 font-notoUrdu"
      dir="rtl"
    >
      <h2 className="text-2xl">جا ئزءکارکردگی رپورٹ (براے مقام)</h2>
      <div className="w-full p-4">
        <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
          <div className="w-full md:pr-0 mb-2">
            <label htmlFor="" className="mb-2 text-lg">
              مقام کانام
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded-lg"
              placeholder="Input 1"
            />
          </div>
          <div className="w-full mb-2">
            <label htmlFor="" className="mb-2 text-lg">
              براے ماھ
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded-lg"
              placeholder="Input 2"
            />
          </div>
        </div>
        <div className="mb-4">
          <CenteralActivities />
        </div>
        <div className="mb-4">
          <MenTable />
        </div>
        <div className="mb-4">
          <DivisionTable />
        </div>
        <div className="mb-4">
          <Zila />
        </div>
        <div className=" mb-4">
          <OtherActivities arr={arr} />
        </div>
        <div className=" mb-4">
          <ExpandParty />
        </div>
        <div className=" mb-4">
          <Library condition={false} />
        </div>
        <div className=" mb-4">
          <MessageDigest />
        </div>
        <div className=" mb-4">
          <EveningDiary />
        </div>
      </div>
    </div>
  );
};
