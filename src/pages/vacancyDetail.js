import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaMoneyBill,
  FaClock,
  FaCalendarDay,
} from "react-icons/fa";
import Spinner from "../Components/spinner";

export default function VacancyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://final-project-api-alpha.vercel.app/api/jobs/${id}`)
      .then((res) => setJob(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-20">
        <Spinner />
      </div>
    );
  if (!job)
    return (
      <div className="text-center py-20 text-gray-500">Job not found.</div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-blue-700 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4">
          {job.company_image_url && (
            <img
              src={job.company_image_url}
              alt={job.company_name}
              className="w-16 h-16 object-contain bg-white p-2 rounded"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-sm">{job.company_name}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-20 max-w-4xl mx-auto pt-20 px-6 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Info */}
        <div className="bg-white rounded-lg p-6 shadow col-span-1 space-y-4">
          <div className="flex items-center gap-3 text-gray-700">
            <FaMapMarkerAlt className="text-blue-500" />
            <span>{job.company_city}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaMoneyBill className="text-green-600" />
            <span>
              Rp {job.salary_min.toLocaleString("id-ID")} - Rp{" "}
              {job.salary_max.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaClock className="text-yellow-600" />
            <span>{job.job_tenure}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaCalendarDay className="text-purple-600" />
            <span>
              Posted:{" "}
              {new Date(job.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Right Content */}
        <div className="col-span-2 space-y-10 mb-3">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3">Job Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {job.job_description}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3">Qualifications</h2>
            <p className="text-gray-700 leading-relaxed">
              {job.job_qualification}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-3">
            <button
              onClick={() => navigate("/vacancy")}
              className="bg-gray-600 text-white px-5 py-2 rounded hover:bg-gray-700"
            >
              ← Back to List
            </button>
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
