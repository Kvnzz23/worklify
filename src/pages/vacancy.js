import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaMoneyBill,
  FaClock,
  FaCalendarAlt,
  FaBuilding,
  FaDollarSign,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Spinner from "../Components/spinner";

export default function Vacancy() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Form input state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterTenure, setFilterTenure] = useState("");
  const [filterSalary, setFilterSalary] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://final-project-api-alpha.vercel.app/api/jobs")
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // Realtime search effect
  useEffect(() => {
    const results = data.filter((job) =>
      [
        job.title,
        job.company_name,
        job.company_city,
        job.job_type,
        job.job_tenure,
      ].some((val) => val?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredData(results);
  }, [searchTerm, data]);

  const handleFilter = () => {
    const results = data.filter((job) => {
      const salaryRange = `${job.salary_min.toLocaleString(
        "id-ID"
      )} - ${job.salary_max.toLocaleString("id-ID")}`;
      const matchSearch = [
        job.title,
        job.company_name,
        job.company_city,
        job.job_type,
        job.job_tenure,
      ].some((val) => val?.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchCity = !filterCity || job.company_city === filterCity;
      const matchTenure = !filterTenure || job.job_tenure === filterTenure;
      const matchSalary = !filterSalary || salaryRange === filterSalary;

      return matchSearch && matchCity && matchTenure && matchSalary;
    });

    setFilteredData(results);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilterCity("");
    setFilterTenure("");
    setFilterSalary("");
    setFilteredData(data);
  };

  const handleJobDetail = (id) => {
    navigate(`/vacancy/${id}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Job Listings</h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by job title..."
            className="col-span-1 md:col-span-4 px-4 py-3 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex items-center space-x-2">
            <FaBuilding className="text-gray-500" />
            <select
              className="w-full px-4 py-2 border border-blue-500 rounded-md"
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
            >
              <option value="">Select city</option>
              {[...new Set(data.map((job) => job.company_city))].map(
                (city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <FaClock className="text-gray-500" />
            <select
              className="w-full px-4 py-2 border border-blue-500 rounded-md"
              value={filterTenure}
              onChange={(e) => setFilterTenure(e.target.value)}
            >
              <option value="">Select tenure</option>
              {[...new Set(data.map((job) => job.job_tenure))].map(
                (tenure, index) => (
                  <option key={index} value={tenure}>
                    {tenure}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <FaDollarSign className="text-gray-500" />
            <select
              className="w-full px-4 py-2 border border-blue-500 rounded-md"
              value={filterSalary}
              onChange={(e) => setFilterSalary(e.target.value)}
            >
              <option value="">Select salary</option>
              {[
                ...new Set(
                  data.map(
                    (job) =>
                      `${job.salary_min.toLocaleString(
                        "id-ID"
                      )} - ${job.salary_max.toLocaleString("id-ID")}`
                  )
                ),
              ].map((range, index) => (
                <option key={index} value={range}>
                  Rp {range}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-1 md:col-span-4 flex justify-end space-x-2">
            <button
              onClick={handleFilter}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Filter
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Job Cards */}
        {loading ? (
          <div className="text-center py-4">
            <Spinner />
          </div>
        ) : filteredData.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredData.map((res, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border w-full max-w-md"
              >
                {/* Logo + Title */}
                <div className="flex items-start gap-3 mb-3 items-center">
                  {res.company_image_url && (
                    <img
                      src={res.company_image_url}
                      alt={res.company_name}
                      className="w-12 h-12 object-contain mt-1 rounded-sm"
                    />
                  )}
                  <div>
                    <p className="text-lg font-bold">{res.title}</p>
                    <p className="text-sm text-gray-600">{res.company_name}</p>
                  </div>
                </div>

                {/* Job Info */}
                <div className="text-sm space-y-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt /> {res.company_city}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMoneyBill />
                    Rp {res.salary_min.toLocaleString("id-ID")} - Rp{" "}
                    {res.salary_max.toLocaleString("id-ID")}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock /> {res.job_tenure}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt />
                    Posted{" "}
                    {new Date(res.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>

                {/* Button */}
                <div className="pt-4 mt-4 border-t flex justify-end">
                  <button
                    onClick={() => handleJobDetail(res._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            Tidak ada data job tersedia.
          </div>
        )}
      </div>
    </div>
  );
}
