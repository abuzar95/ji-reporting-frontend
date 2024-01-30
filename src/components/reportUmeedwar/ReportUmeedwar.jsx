import React, { useContext, useEffect, useState } from "react";
import { GeneralLayout } from "../layoutComponents";
import { InputWithLabel } from "../InputWithLabel";
import { Rawabit1, Rawabit2, Rawabit3 } from "./rawaabit";
import { RegularStudents } from "./RegularStudents";
import { convertDataFormat, toJson } from "../../utils";
import { FajarNamaz } from "./FajarNamaz";
import { OtherNamaz } from "./OtherNamaz";
import { TafseerQuran } from "./TafseerQuran";
import { Ahdees } from "./Ahdees";
import { Litrature } from "./Litrature";
import { Hifz } from "./Hifz";
import { Course } from "./Course";
import instance from "../../api/instrance";
import { MeContext, useToastState } from "../../context";
import { useLocation, useParams } from "react-router-dom";

const intro = [
  {
    title: "نام",
    type: "text",
    key: "name",
  },
  {
    title: "جمیعت سے تعلق",
    type: "text",
    key: "JamiatRelation",
  },
  {
    title: "تنظیمی تعلق",
    type: "text",
    key: "organizationRelation",
  },
];

export const ReportUmeedwar = () => {
  const [attended, setAttended] = useState("no");
  const [studyCircle, setStudyCircle] = useState("no");
  const [aanat, setAanat] = useState("no");
  const [date, setDate] = useState("");
  const [singleFile, setSingleFile] = useState({});
  const [id, setId] = useState(null);
  const [view, setView] = useState(false);
  const [rbt1Programs, setRbt1Programs] = useState([]);
  const [rbt2Programs, setRbt2Programs] = useState([]);
  const [rbt3Programs, setRbt3Programs] = useState([]);
  const [programsList, setProgramsList] = useState([]);
  const [fileMode, setFileMode] = useState("edit");
  const me = useContext(MeContext);
  const { dispatch } = useToastState();
  const location = useLocation();
  const params = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const jsonData = convertDataFormat(toJson(formData));
    jsonData["rbt1Programs"] = rbt1Programs;
    jsonData["rbt2Programs"] = rbt2Programs;
    jsonData["rbt3Programs"] = rbt3Programs;
    jsonData["organizationRelation"] = me.userAreaType;
    let l = location.pathname?.split("/")[2];
    if (l === "create") {
      const req = await instance.post(`/umeedwar`, jsonData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
        },
      });
      dispatch({ type: "SUCCESS", payload: req?.data?.message });
    }
    if (l === "edit") {
      const req = await instance.put(`/umeedwar/${id}`, jsonData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("@token")}`,
        },
      });
      dispatch({ type: "SUCCESS", payload: req?.data?.message });
    }
  };
  const setDateFn = () => {
    const date0 = new Date();
    date0.setMonth(date0.getMonth() - 1);
    setDate(`${date0.getFullYear()}-${date0.getMonth() + 1}`);
  };

  useEffect(() => {
    setDateFn();
  }, []);
  useEffect(() => {
    const l = location.pathname?.split("/")[2];

    if (l === "view") {
      setView(true);
      setId(params?.id);
      setFileMode("view");
    } else if (l === "edit") {
      setId(params?.id);
      setFileMode("edit");
    } else {
      setView(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  const getSingleReport = async (e) => {
    const req = await instance.get(`/umeedwar/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("@token")}`,
      },
    });
    if (req.status === 200) {
      setSingleFile(req?.data?.data);
    }
    dispatch({ type: "SUCCESS", payload: req?.data?.message });
  };
  useEffect(() => {
    function autoFillForm(obj) {
      Object.keys(obj).forEach((key) => {
        const elem = document.getElementById(key);
        if (key === "toseeDawaId") {
          obj[key].rawabit.forEach((obj, index) => {
            Object.keys(obj, index).forEach((innerKey) => {
              if (innerKey === "programs") {
                setProgramsList((prevState) => {
                  return { ...prevState, [index]: obj[innerKey] };
                });
              }
              const formattedKey =
                innerKey.charAt(0).toUpperCase() + innerKey.slice(1);
              const elem = document.getElementById(
                `rbt${index + 1}${formattedKey}`
              );
              if (elem) {
                elem.value = obj[innerKey];
                if (elem === "attended") {
                  setAttended(elem.value);
                } else if (elem === "attendedStudyCircle") {
                  setStudyCircle(elem.value);
                } else if (elem === "aanat") {
                  setAanat(elem.value);
                }
              }
            });
          });
        }

        if (typeof obj[key] === "object") {
          autoFillForm(obj[key]);
        } else {
          if (key === "month") {
            elem.value = obj[key]?.split("").slice(0, 7).join("");
          } else {
            if (elem) {
              elem.value = obj[key];
            }
          }
        }
      });
    }

    autoFillForm(singleFile);
  }, [singleFile]);
  useEffect(() => {
    if (id && id !== undefined) {
      getSingleReport();
    }
  }, [id]);
  useEffect(() => {
    if (programsList.length > 0) {
      setRbt1Programs(programsList[0]);
      setRbt2Programs(programsList[1]);
      setRbt3Programs(programsList[2]);
    }
  }, [programsList]);
  return (
    <GeneralLayout>
      <div dir="rtl" className="p-4">
        <h2 className="block w-full text-center p-3">
          کارکردگی رپورٹ براۓ حلقہ
        </h2>

        <form
          className="flex w-full flex-col items-center justify-end gap-5 p-3 overflow-auto mb-5"
          dir="rtl"
          onSubmit={handleSubmit}
        >
          <div className="w-full md:pr-0 mb-2">
            <div className="flex justify-end items-center gap-2 w-full p-2">
              <label htmlFor="month">برائے ماہ</label>
              <input
                className="border-b-2 border-dashed"
                type="month"
                name="month"
                id="month"
                readOnly
                value={date}
              />
            </div>
            <h3 className="">
              "اس ماہ میں کوئ خصوصی مصروفیت جس کی وجہ سے آپ کئ روٹین متاثر ہوئ
              ہو"
            </h3>
            <textarea
              className="inptut border rounded-md pr-2 w-full"
              placeholder={"..."}
              id={"disturbingRoutine"}
              name={"disturbingRoutine"}
              type={"textarea"}
              disabled={view}
            ></textarea>
          </div>

          <div className=" w-full  lg:flex md:flex-row sm:flex-col mb-4 gap-2">
            {intro.map((obj, index) => (
              <div className="w-full md:pr-0 mb-2" key={index}>
                <InputWithLabel
                  readOnly={
                    view ||
                    obj.key === "organizationRelation" ||
                    obj?.key === "JamiatRelation" ||
                    obj?.key === "name"
                  }
                  placeholder={
                    obj?.key === "name"
                      ? me?.name
                      : obj?.key === "JamiatRelation"
                      ? me?.nazimType
                      : obj?.title
                  }
                  label={obj.title}
                  id={obj?.key}
                  name={obj?.key}
                  type={obj?.type}
                  value={
                    obj?.key === "organizationRelation"
                      ? me?.userAreaType
                      : obj?.key === "name"
                      ? me?.name
                      : obj?.key === "JamiatRelation"
                      ? me?.nazimType
                      : ""
                  }
                />
              </div>
            ))}
          </div>
          <FajarNamaz view={view} />
          <OtherNamaz view={view} />
          <TafseerQuran view={view} />
          <Ahdees view={view} />
          <Litrature view={view} />
          <Hifz view={view} />
          <Course view={view} />
          <div className="w-full flex justify-start items-center">
            <div className="flex w-full  flex-col justify-start items-start">
              <h3 className="block w-full text-sm p-3">
                اجتماعِ امیدواران میں شرکت کی
              </h3>
              <div className="flex flex-wrap items-center justify-start border border-primary p-2 rounded-lg">
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="attended"
                      className="radio checked:bg-blue-500"
                      checked={attended === "yes"}
                      value="yes"
                      onChange={() => setAttended("yes")}
                    />
                    <span className="label-text">yes</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="attended"
                      className="radio checked:bg-blue-500"
                      checked={attended === "no"}
                      value="no"
                      onChange={() => setAttended("no")}
                    />
                    <span className="label-text">no</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="attended"
                      className="radio checked:bg-blue-500"
                      checked={attended === "leave"}
                      value="leave"
                      onChange={() => setAttended("leave")}
                    />
                    <span className="label-text">leave</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex w-full  flex-col justify-start items-start">
              <h2 className="block w-full p-3">سٹڈی سرکل میں شرکت کی</h2>
              <div className="flex flex-wrap items-center justify-start border border-primary p-2 rounded-lg">
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      readOnly={view}
                      type="radio"
                      name="attendedStudyCircle"
                      className="radio checked:bg-blue-500"
                      checked={studyCircle === "yes"}
                      value="yes"
                      onChange={() => setStudyCircle("yes")}
                    />
                    <span className="label-text">yes</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      readOnly={view}
                      type="radio"
                      name="attendedStudyCircle"
                      className="radio checked:bg-blue-500"
                      checked={studyCircle === "no"}
                      value="no"
                      onChange={() => setStudyCircle("no")}
                    />
                    <span className="label-text">no</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      readOnly={view}
                      type="radio"
                      name="attendedStudyCircle"
                      className="radio checked:bg-blue-500"
                      checked={studyCircle === "leave"}
                      value="leave"
                      onChange={() => setStudyCircle("leave")}
                    />
                    <span className="label-text">leave</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex w-full  flex-col justify-start items-start">
              <h2 className="block w-full p-3">اعانت کی</h2>
              <div className="flex flex-wrap items-center justify-start border border-primary p-2 rounded-lg">
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      readOnly={view}
                      type="radio"
                      name="aanat"
                      className="radio checked:bg-blue-500"
                      checked={aanat === "yes"}
                      value="yes"
                      onChange={() => setAanat("yes")}
                    />
                    <span className="label-text">yes</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      readOnly={view}
                      type="radio"
                      name="aanat"
                      className="radio checked:bg-blue-500"
                      checked={aanat === "no"}
                      value="no"
                      onChange={() => setAanat("no")}
                    />
                    <span className="label-text">no</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Rawabit1
              view={view}
              rbt1Programs={rbt1Programs}
              setRbt1Programs={setRbt1Programs}
              programsList={programsList}
            />
          </div>
          <div className="w-full">
            <Rawabit2
              view={view}
              rbt2Programs={rbt2Programs}
              setRbt2Programs={setRbt2Programs}
              programsList={programsList}
            />
          </div>
          <div className="w-full">
            <Rawabit3
              view={view}
              rbt3Programs={rbt3Programs}
              setRbt3Programs={setRbt3Programs}
              programsList={programsList}
            />
          </div>
          <div className="w-full">
            <RegularStudents view={view} />
          </div>
          <div className="w-full flex justify-start items-center">
            <h3 className="">تبصرہ</h3>
          </div>
          <textarea
            className="inptut border rounded-md pr-2 w-full"
            placeholder={"..."}
            label={"تبصرہ"}
            id={"comments"}
            name={"comments"}
            type={"textarea"}
            disabled={view}
          ></textarea>
          <div className="w-full flex justify-end items-center mb-5">
            <button
              type="submit"
              className="btn btn-primary "
              // onClick={handleSubmit}
            >
              {fileMode === "edit" ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </GeneralLayout>
  );
};
