import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import AuthContext from "./authContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = Cookies.get("user");

    if (!savedUser || savedUser === "undefined") {
      setUser(null);
      return;
    }

    try {
      setUser(JSON.parse(savedUser));
    } catch (err) {
      console.error("Failed to parse saved user:", err);
      setUser(null);
    }
  }, []);

  const login = (email, password) => {
    return axios
      .post("https://final-project-api-alpha.vercel.app/api/auth/login", {
        email,
        password,
      })
      .then((res) => {
        console.log("Login response:", res.data);

        const { user, token } = res.data;

        if (!token) {
          throw new Error("No token received from server");
        }

        // Simpan token dan user
        Cookies.set("token", token, { expires: 1 });
        if (user) {
          Cookies.set("user", JSON.stringify(user), { expires: 7 });
          setUser(user);
        } else {
          setUser(null);
        }

        navigate("/dashboard");

        Swal.fire({
          icon: "success",
          title: "Login Berhasil!",
          text: `Selamat datang, ${user.name || user.email}`,
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        const msg = err.response?.data?.message || err.message;
        console.error("Login failed:", msg);

        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: msg.includes("401") ? "Email atau password salah" : msg,
        });

        // Re-throw error agar bisa ditangani di luar (optional)
        throw err;
      });
  };

  const register = (imageUrl, email, password, name) => {
    return axios
      .post("https://final-project-api-alpha.vercel.app/api/auth/register", {
        image_url: imageUrl,
        email,
        password,
        name,
      })
      .then((res) => {
        console.log("Register response:", res.data);

        const { user, token } = res.data;

        if (!token) {
          throw new Error("No token received from server");
        }

        Cookies.set("token", token, { expires: 2 });

        if (user) {
          Cookies.set("user", JSON.stringify(user), { expires: 2 });
          setUser(user);
        } else {
          setUser(null);
        }

        // ✅ Swal sukses dulu, baru navigasi
        Swal.fire({
          icon: "success",
          title: "Registrasi Berhasil!",
          text: "Selamat datang",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate("/login");
        });
      })
      .catch((err) => {
        const msg = err.response?.data?.message || err.message;
        console.error("Register failed:", msg);

        Swal.fire({
          icon: "error",
          title: "Gagal Registrasi",
          text:
            msg.includes("duplicate") || msg.includes("email")
              ? "Email sudah digunakan."
              : msg,
        });

        throw err;
      });
  };

  const logout = () => {
    Swal.fire({
      title: "Yakin ingin logout?",
      text: "Anda akan keluar dari sesi saat ini.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, logout",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("user");
        Cookies.remove("token");
        navigate("/");
        setUser(null);

        Swal.fire({
          icon: "success",
          title: "Logout berhasil!",
          text: "Anda telah keluar.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
