import { Outlet, useLocation, Link } from "react-router-dom";
import Spinner from "../Components/spinner";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const ListJob = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const token = Cookies.get("token");
  const location = useLocation();

  const isNestedFormOrEdit = location.pathname !== "/dashboard/list-job";

  useEffect(() => {
    if (location.state?.updated) {
      setFetchStatus(true);
    }
  }, [location.state]);

  useEffect(() => {
    if (fetchStatus && token) {
      axios
        .get("https://final-project-api-alpha.vercel.app/api/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching jobs:", err);
        })
        .finally(() => {
          setLoading(false);
          setFetchStatus(false);
        });
    }
  }, [fetchStatus, token]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://final-project-api-alpha.vercel.app/api/jobs/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            setFetchStatus(true);
            Swal.fire({
              icon: "success",
              title: "Berhasil!",
              text: "Data berhasil dihapus.",
              timer: 1500,
              showConfirmButton: false,
            });
          })
          .catch((err) => {
            console.error("Gagal hapus:", err.response?.data || err.message);
            Swal.fire({
              icon: "error",
              title: "Gagal",
              text: "Gagal menghapus data.",
            });
          });
      }
    });
  };

  const filteredData = data.filter((job) =>
    [job.company_city, job.company_name, job.title, job.job_type].some((val) =>
      val?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="max-w-screen-xl mx-auto animate-fadeIn">
      {!isNestedFormOrEdit && (
        <section className="bg-white-200 px-4 py-6">
          {/* Header & Search */}
          <h1 className="text-xl font-bold">List Job Vacancy</h1>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 mt-3">
            <input
              type="text"
              placeholder="Search by type, city, company, or title..."
              className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link to="/dashboard/list-job/form">
              <button
                type="button"
                className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-200 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                + Add Job
              </button>
            </Link>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto shadow-sm">
            <table className="min-w-full table-auto text-sm text-left text-gray-500">
              <thead className="text-xs text-white uppercase bg-gradient-to-b from-indigo-900 to-blue-800">
                <tr>
                  <th className="px-6 py-3">No</th>
                  <th className="px-6 py-3">Company</th>
                  <th className="px-6 py-3">Logo</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Job Type</th>
                  <th className="px-6 py-3">Salary</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      <Spinner />
                    </td>
                  </tr>
                ) : filteredData.length > 0 ? (
                  filteredData.map((res, index) => (
                    <tr
                      key={res._id}
                      className="border border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-black">{index + 1}</td>
                      <td className="px-6 py-4 text-black">
                        {res.company_name}
                      </td>
                      <td className="px-4 py-2">
                        <div className="w-10 h-10 border rounded overflow-hidden">
                          <img
                            src={res.company_image_url}
                            alt="Logo"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-black">{res.title}</td>
                      <td className="px-6 py-4 text-black">
                        {res.company_city}
                      </td>
                      <td className="px-6 py-4 text-black">{res.job_type}</td>
                      <td className="px-6 py-4 text-black">
                        Rp {res.salary_min?.toLocaleString("id-ID")} - Rp{" "}
                        {res.salary_max?.toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4">
                        {res.job_status === 1 ? (
                          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                            Open
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
                            Closed
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 justify-center">
                          <Link to={`/dashboard/list-job/edit/${res._id}`}>
                            <button className="text-yellow-400 hover:text-yellow-500">
                              <FaEdit size={20} />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(res._id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <FaTrash size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-gray-500">
                      Tidak ada data job tersedia.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Nested Route Outlet */}
      <Outlet />
    </div>
  );
};

export default ListJob;
