import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function AddJob() {
  const { id } = useParams(); // id dari URL
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const [input, setInput] = useState({
    title: "",
    job_description: "",
    job_qualification: "",
    job_type: "",
    job_tenure: "",
    job_status: "1",
    company_name: "",
    company_image_url: "",
    company_city: "",
    salary_min: "",
    salary_max: "",
  });

  // Ambil data jika mode edit
  useEffect(() => {
    if (id && token) {
      axios
        .get(`https://final-project-api-alpha.vercel.app/api/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const job = res.data;
          console.log("GET Result:", job);

          if (job) {
            setInput({
              title: job.title || "",
              job_description: job.job_description || "",
              job_qualification: job.job_qualification || "",
              job_type: job.job_type || "",
              job_tenure: job.job_tenure || "",
              job_status: job.job_status ? "1" : "0",
              company_name: job.company_name || "",
              company_image_url: job.company_image_url || "",
              company_city: job.company_city || "",
              salary_min: String(job.salary_min ?? ""),
              salary_max: String(job.salary_max ?? ""),
            });
          } else {
            alert("Data tidak ditemukan.");
          }
        })
        .catch((err) => {
          console.error("Gagal ambil data edit:", err);
          alert("Gagal mengambil data untuk edit.");
        });
    }
  }, [id, token]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Token tidak ditemukan. Silakan login kembali.",
      });
      return;
    }

    const payload = {
      ...input,
      job_status: input.job_status === "1",
      salary_min: parseInt(input.salary_min),
      salary_max: parseInt(input.salary_max),
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const request = id
      ? axios.put(
          `https://final-project-api-alpha.vercel.app/api/jobs/${id}`,
          payload,
          config
        )
      : axios.post(
          `https://final-project-api-alpha.vercel.app/api/jobs`,
          payload,
          config
        );

    request
      .then(() => {
        Swal.fire({
          icon: "success",
          title: id ? "Berhasil diupdate!" : "Berhasil ditambahkan!",
          text: id
            ? "Data pekerjaan berhasil diperbarui."
            : "Data pekerjaan berhasil ditambahkan.",
          timer: 2000,
          showConfirmButton: false,
        });

        navigate("/dashboard/list-job", { state: { updated: true } });
      })
      .catch((err) => {
        console.error("Gagal submit:", err);
        Swal.fire({
          icon: "error",
          title: "Gagal menyimpan",
          text:
            err?.response?.data?.message ||
            "Terjadi kesalahan saat menyimpan data.",
        });
      });

    if (!id) {
      setInput({
        title: "",
        job_description: "",
        job_qualification: "",
        job_type: "",
        job_tenure: "",
        job_status: "1",
        company_name: "",
        company_image_url: "",
        company_city: "",
        salary_min: "",
        salary_max: "",
      });
    }
  };

  if (id && !input.title) {
    return <p className="text-center">Memuat data edit...</p>;
  }

  return (
    <div className="p-4 animate-fadeIn mx-auto">
      <h1 className="text-xl font-bold mb-4 text-center md:text-left">
        {id ? "Edit Job Vacancy" : "Create Job Vacancy"}
      </h1>

      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md space-y-6"
        >
          {/* 3-Column Grid Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Job Title", name: "title" },
              { label: "Company Name", name: "company_name" },
              { label: "Company City", name: "company_city" },
              { label: "Company Image URL", name: "company_image_url" },
              { label: "Job Type", name: "job_type" },
              { label: "Job Tenure", name: "job_tenure" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block font-semibold mb-1">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={input[field.name]}
                  onChange={handleInput}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1">Job Description</label>
            <textarea
              name="job_description"
              className="w-full border border-gray-300 rounded px-3 py-2 h-24 focus:ring-blue-500 focus:border-blue-500"
              value={input.job_description}
              onChange={handleInput}
            />
          </div>

          {/* Qualification */}
          <div>
            <label className="block font-semibold mb-1">
              Job Qualification
            </label>
            <textarea
              name="job_qualification"
              className="w-full border border-gray-300 rounded px-3 py-2 h-24 focus:ring-blue-500 focus:border-blue-500"
              value={input.job_qualification}
              onChange={handleInput}
            />
          </div>

          {/* Salary Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Salary Min</label>
              <input
                name="salary_min"
                type="number"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                value={input.salary_min}
                onChange={handleInput}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Salary Max</label>
              <input
                name="salary_max"
                type="number"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                value={input.salary_max}
                onChange={handleInput}
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block font-semibold mb-1">Status</label>
            <select
              name="job_status"
              value={input.job_status}
              onChange={handleInput}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1">Open</option>
              <option value="0">Closed</option>
            </select>
          </div>

          {/* Submit */}
          <div className="text-center md:text-left">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition"
            >
              {id ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
