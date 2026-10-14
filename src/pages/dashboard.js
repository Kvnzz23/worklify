import React, { useEffect, useState, useMemo } from "react";
import useAuth from "../Context/useAuth";
import axios from "axios";
import { FaAngleRight, FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../Components/spinner";

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state

  useEffect(() => {
    axios
      .get("https://final-project-api-alpha.vercel.app/api/jobs")
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs.");
      })
      .finally(() => setLoading(false));
  }, []);

  const sortedData = useMemo(() => {
    return [...data].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [data]);

  const totalJob = useMemo(() => data.length, [data]);

  const activeJob = useMemo(
    () => data.filter((job) => job.job_status === 1),
    [data]
  );

  const inactiveJob = useMemo(
    () => data.filter((job) => job.job_status === 0),
    [data]
  );

  const totalActiveJob = activeJob.length;
  const totalInactiveJob = inactiveJob.length;

  return (
    <>
      <div className="dashboard animate-fadeIn">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">
            Dashboard Overview
          </h2>
          <p className="text-gray-500">Welcome back, {user?.name} 👋</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-6">
            {error}
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">Total Job</h3>
            <p className="text-3xl font-bold text-blue-500 mt-2">
              {loading ? "..." : totalJob}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">Active Job</h3>
            <p className="text-3xl font-bold text-green-500 mt-2">
              {loading ? "..." : totalActiveJob}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700">
              Inactive Job
            </h3>
            <p className="text-3xl font-bold text-red-500 mt-2">
              {loading ? "..." : totalInactiveJob}
            </p>
          </div>
        </div>
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="header flex flex-row justify-between items-center mb-5">
              <h4 className="text-xl font-semibold text-gray-700">
                Recent Job Listings
              </h4>
              <Link to="/dashboard/list-job">
                <span className="text-blue-600 text-bold text-sm hover:text-blue-800 font-medium flex flex-row items-center gap-1">
                  View all job <FaAngleRight />{" "}
                </span>
              </Link>
            </div>
            {loading ? (
              <div className="text-center py-4">
                <Spinner />
              </div>
            ) : (
              sortedData.slice(0, 5).map((job) => (
                <div
                  key={job.id}
                  className="p-4 bg-white rounded shadow mb-3 flex flex-row justify-between gap-10 items-center"
                >
                  <div className="flex flex-row gap-2 items-center">
                    <div className="rounded-full border border-gray-200 bg-gray-100 p-2">
                      <FaBriefcase />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold">{job.title}</h3>
                      <div className="text-gray-400">
                        <span className="text-sm">
                          {job.company_name} • {job.job_type} • {job.job_tenure}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    {job.job_status === 1 ? (
                      <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                        Open
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
                        Closed
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
