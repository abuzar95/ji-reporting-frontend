import React, { useContext, useEffect, useState } from "react";
import {
  MarkazReportContext,
  MeContext,
  ProvinceReportContext,
  useToastState,
} from "../../context";
import { FaCross, FaCut, FaEdit, FaEye, FaPrint } from "react-icons/fa";
import moment from "moment";
import { NoReports, months } from "../Reports";
import { FilterDialog } from "./FilterDialog";
import { useNavigate } from "react-router-dom";
import { UIContext } from "../../context/ui";
import instance from "../../api/instrance";
import { SearchPage } from "./SearchPage";

export const CountryReport = () => {
  const c = useContext(MarkazReportContext);
  const cReports = c?.reports;

  const total = c?.length;
  const [filterAllData, setFilterAllData] = useState(cReports);
  const { dispatch } = useToastState();
  const [search, showSearch] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [month, setMonth] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [year, setYear] = useState("2024");
  const me = useContext(MeContext);
  const { getMarkazReport } = useContext(UIContext);
  const [isFilter, setIsFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 10;
  useEffect(() => {
    const uniqueArray = cReports?.reduce((acc, current) => {
      const x = acc.find((item) => item?._id === current?._id);
      if (!x) {
        acc.push(current);
      }
      return acc;
    }, []);
    setFilterAllData(uniqueArray);
  }, [cReports]);
  const searchResults = async () => {
    showSearch(false);
    if (year !== "" && month !== "") {
      try {
        setIsSearch(true);
        const req = await instance.get(
          `/reports/markaz?year=${year}&month=${month}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("@token")}`,
            },
          }
        );

        if (req) {
          setSearchData([]);
          setSearchData(req.data?.data);
        }
      } catch (err) {
        console.log(err);
        dispatch({
          type: "ERROR",
          payload: err?.response?.data?.message || err?.message,
        });
      }
    }
  };
  const toggleSearch = () => {
    showSearch(!search);
  };
  const clearFilters = () => {
    setMonth("");
    setYear("2023");
    setFilterAllData(cReports);
    setIsFilter(false);
    setIsSearch(false);
    document.getElementById("autocomplete").value = "";
  };
  const handlePrint = (id) => {
    window.open(`markaz-report/print/${id}`, "blank");
  };
  let totalPages = Math.ceil(total / itemsPerPage);

  const currentData = filterAllData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      const inset = currentPage * itemsPerPage;

      const offset = itemsPerPage;
      if (filterAllData?.length <= total) {
        getMarkazReport(inset, offset);
      }
    }
  };
  useEffect(() => {
    if (window) {
      if (window.innerWidth < 520) {
        setIsMobileView(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth]);
  return (
    <>
      <div className="md:join xs:w-full mb-4 flex justify-between items-center">
        {!isMobileView && (
          <div className="w-full">
            <select
              className="select select-bordered join-item"
              onChange={(e) => setMonth(e.target.value)}
              value={month}
            >
              <option value={""}>Month</option>
              {months?.map((month, index) => (
                <option value={month?.value} key={index}>
                  {month.title}
                </option>
              ))}
            </select>
            <select
              className="select select-bordered join-item"
              onChange={(e) => setYear(e.target.value)}
              value={year}
            >
              <option disabled value={""}>
                Year
              </option>
              {Array(10)
                ?.fill(1)
                .map((_, index) => (
                  <option key={index} value={2023 + index}>
                    {2023 + index}
                  </option>
                ))}
            </select>
          </div>
        )}
        {search && (
          <div className="fixed p-3 z-40 rounded-lg top-[140px] left-[5px] w-[calc(100%-10px)] overflow-hidden bg-white min-h-[100px] border">
            <div className="flex flex-col gap-3">
              <div className="w-full flex flex-col">
                {isMobileView && (
                  <div className="w-full flex justify-end items-center ">
                    <button
                      className="btn-square"
                      onClick={() => showSearch(false)}
                    >
                      ✕
                    </button>
                  </div>
                )}
                <select
                  className="select select-bordered w-full rounded-none rounded-tl-lg rounded-tr-lg"
                  onChange={(e) => setMonth(e.target.value)}
                  value={month}
                >
                  <option value={""}>Month</option>
                  {months?.map((month, index) => (
                    <option value={month?.value} key={index}>
                      {month.title}
                    </option>
                  ))}
                </select>
                <select
                  className="select select-bordered w-full rounded-none rounded-bl-lg rounded-br-lg"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value={""} disabled>
                    Year
                  </option>
                  {Array(10)
                    ?.fill(1)
                    .map((_, index) => (
                      <option key={index} value={2023 + index}>
                        {2023 + index}
                      </option>
                    ))}
                </select>
              </div>
              <button className="btn" onClick={searchResults}>
                Search
              </button>
            </div>
          </div>
        )}

        <div className="indicator flex justify-between items-center w-full">
          {/* <span className='indicator-item badge badge-secondary'>new</span> */}
          <button
            className={`btn ${!isMobileView ? "join-item" : ""}`}
            onClick={() => (!isMobileView ? searchResults() : toggleSearch())}
          >
            Search
          </button>
          {me?.userAreaType !== "Halqa" && (
            <button
              onClick={() => {
                document.getElementById("filter-area-dialog").showModal();
              }}
              className={`btn ${!isMobileView ? "join-item" : "ms-3"}`}
            >
              filter
            </button>
          )}
          <button
            className={`btn ${!isMobileView ? "join-item" : "ms-3"}`}
            onClick={clearFilters}
          >
            Clear
          </button>
        </div>
      </div>
      {!isSearch ? (
        <>
        {currentData?.length > 0 ? (
      <table className="table mb-7 w-full">
        {/* Head */}
        <thead>
          <tr>
            <th className="text-left">Report</th>
            <th className="text-left">Last modified</th>
            <th className="text-left">Month</th>
            <th></th>
            <th></th>
            <th className="text-left">Action</th>
          </tr>
        </thead>
        {/* Body */}
        <tbody>
          {currentData.map((p, index) => (
            <tr key={index}>
              <td>
                <span>{p?.countryAreaId?.name}</span>
              </td>
              <td>
                <span>{moment(p?.updatedAt).fromNow()}</span>
              </td>
              <td>
                <span>{moment(p?.month).format("MMMM YYYY")}</span>
              </td>
              <td></td>
              <td></td>
              <td>
                <div className="flex items-center gap-2">
                  <span onClick={() => navigate(`/reports/view/${p._id}`)} className="cursor-pointer font-inter text-[14px] font-medium leading-[16.94px] text-left">View</span>
                  {me?.userAreaType === "Country" && (
                    <span onClick={() => navigate(`/reports/edit/${p._id}`)} className="cursor-pointer font-inter text-[14px] font-medium leading-[16.94px] text-left text-green">Edit</span>
                  )}
                  <span onClick={() => handlePrint(p?._id)} className="cursor-pointer font-inter text-[14px] font-medium leading-[16.94px] text-left text-blue">Print</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <NoReports />
    )}
          {!isFilter && (
            <div className="flex justify-between mt-4">
              <button
                className="btn"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <SearchPage data={searchData?.data} area={"country"} />
      )}
      <dialog id="filter-area-dialog" className="modal">
        <FilterDialog
          setFilterAllData={setFilterAllData}
          setIsFilter={setIsFilter}
        />
      </dialog>
    </>
  );
};
