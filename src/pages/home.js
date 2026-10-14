import { FaBriefcase } from "react-icons/fa";
import heroImage from "../assets/leftNew.jpg";
import { Link } from "react-router-dom";
import Footer from "../Components/footer";
import React, { useState } from "react";
import { FaChevronDown, FaStar, FaRegStar } from "react-icons/fa";

export default function Home() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };
  const categories = [
    { title: "UX Designer", count: 120, icon: "🎨" },
    { title: "DevOps Engineer", count: 95, icon: "🔧" },
    { title: "Project Manager", count: 88, icon: "📋" },
    { title: "Product Owner", count: 76, icon: "🚀" },
    { title: "QA Tester", count: 60, icon: "🧪" },
    { title: "Data Analyst", count: 142, icon: "📊" },
  ];

  const faqs = [
    {
      question: "What is Worklify?",
      answer:
        "Worklify is a job platform that helps job seekers connect with top companies and apply with ease.",
    },
    {
      question: "Is Worklify free to use?",
      answer:
        "Yes! Worklify is completely free for job seekers. You can browse and apply to jobs without any charges.",
    },
    {
      question: "How do I apply for a job?",
      answer:
        "Simply browse job listings, click on the one you’re interested in, and follow the application instructions provided.",
    },
    {
      question: "Can I save jobs to apply later?",
      answer:
        "Yes, you can save job posts to review and apply later by creating a free Worklify account.",
    },
  ];

  const companies = [
    {
      name: "Adobe",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Logo.png/1200px-Adobe_Corporate_Logo.png",
    },
    {
      name: "Cloudflare",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScVHNruIdkdHgsAYxga6orKgp71CbrFzpppA&s",
    },
    {
      name: "Expedia",
      logo: "https://finevpn.org/wp-content/uploads/2024/02/expedia-logo-logo.png",
    },
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/640px-Google_2015_logo.svg.png",
    },
    {
      name: "Google Analytics",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Logo_Google_Analytics.svg/2560px-Logo_Google_Analytics.svg.png",
    },
    {
      name: "Google Fonts",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Google_Fonts_logo.svg/1280px-Google_Fonts_logo.svg.png",
    },
    {
      name: "Facebook",
      logo: "https://cdn.pixabay.com/photo/2021/11/11/12/41/facebook-6786210_1280.png",
    },
    {
      name: "Spotify",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/559px-Spotify_logo_with_text.svg.png",
    },
    {
      name: "Nvidia",
      logo: "https://www.nvidia.com/content/nvidiaGDC/us/en_US/about-nvidia/legal-info/logo-brand-usage/_jcr_content/root/responsivegrid/nv_container_392921705/nv_container/nv_image.coreimg.100.1070.png/1703060329053/nvidia-logo-vert.png",
    },
    {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png",
    },
    {
      name: "Samsung",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
    },
    {
      name: "Apple",
      logo: "https://vectorsfile.com/file-view/apple-logo-desi.jpeg",
    },
  ];

  return (
    <>
      <section className="bg-gwhite py-12 animate-fadeIn">
        <div className="hero bg-white">
          <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-10 py-16">
            {/* Text Side */}
            <div className="flex-1 max-w-xl text-center md:text-left ml-2">
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Discover Your Career Path with
                <span className="text-blue-600"> Worklify</span>
              </h1>
              <p className="text-gray-600 mb-6">
                Browse thousands of job opportunities from top industries and
                trusted companies. With Worklify, finding and applying for your
                ideal job becomes quicker, smarter, and more convenient. Let
                your journey to success begin today!
              </p>
              <Link to="/vacancy">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                  Find Job Now <FaBriefcase className="text-lg" />
                </button>
              </Link>
            </div>

            {/* Image Side */}
            <div className="flex-1 ml-2">
              <img
                src={heroImage}
                alt="Job search illustration"
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
        <div className="populer-category bg-gray-100 px-5 py-16 flex flex-col justify-center items-center">
          <div className="text-sm text-center text-blue-700 font-semibold">
            Populer Job Category
          </div>
          <div className="text-3xl font-bold mt-3">
            Find Work That Works for You
          </div>
          <div className="text-gray-600 mt-3">
            Explore a variety of job categories below and find the one that
            suits you best.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 py-10 w-[90%]">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-700 hover:shadow-md transition"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full text-2xl shadow-inner">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {cat.count} Job Openings
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="py-16 px-4 bg-white flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-12">
            Explore Top Companies Hiring Now
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 w-[80%]">
            {companies.map((company, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md flex items-center justify-center h-30 transition"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-[80%] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-50 flex flex-col p-16 justify-center items-center">
          <div className="text-3xl mb-12 font-bold">
            Testimonial From Clients
          </div>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[90%]">
            <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100 ">
              <div className="flex items-center space-x-4">
                <img
                  className="w-16 h-16 rounded-full object-cover"
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Foto pelanggan"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Amanda Rizky
                  </h3>
                  <p className="text-sm text-gray-500">CEO, Kreativa Studio</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600 leading-relaxed">
                  “Layanan yang diberikan sangat profesional dan cepat. Saya
                  sangat puas dengan hasil akhirnya dan pasti akan bekerja sama
                  lagi di proyek berikutnya.”
                </p>
              </div>
              <div className="mt-4 flex items-center space-x-1 text-yellow-400">
                {/* Bintang Rating */}
                <FaStar className="w-5 h-5" />
                <FaStar className="w-5 h-5" />
                <FaStar className="w-5 h-5" />
                <FaStar className="w-5 h-5" />
                <FaRegStar className="w-5 h-5 text-gray-300" />
              </div>
            </div>
            <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center space-x-4">
                <img
                  className="w-16 h-16 rounded-full object-cover"
                  src="https://randomuser.me/api/portraits/men/36.jpg"
                  alt="Foto pelanggan"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Dimas Pratama
                  </h3>
                  <p className="text-sm text-gray-500">CTO, NextInova</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600 leading-relaxed">
                  “Layanan yang diberikan sangat profesional dan cepat. Saya
                  sangat puas dengan hasil akhirnya dan pasti akan bekerja sama
                  lagi di proyek berikutnya.”
                </p>
              </div>
              <div className="mt-4 flex items-center space-x-1 text-yellow-400">
                {/* Bintang Rating */}
                <FaStar className="w-5 h-5" />
                <FaStar className="w-5 h-5" />
                <FaStar className="w-5 h-5" />
                <FaStar className="w-5 h-5" />
                <FaStar className="w-5 h-5" />
              </div>
            </div>
            <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center space-x-4">
                <img
                  className="w-16 h-16 rounded-full object-cover"
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Foto pelanggan"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Siti Nurhaliza
                  </h3>
                  <p className="text-sm text-gray-500">
                    Founder, Artisan Bloom
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600 leading-relaxed">
                  “Layanan yang diberikan sangat profesional dan cepat. Saya
                  sangat puas dengan hasil akhirnya dan pasti akan bekerja sama
                  lagi di proyek berikutnya.”
                </p>
              </div>
              <div className="mt-4 flex items-center space-x-1 text-yellow-400">
                {/* Bintang Rating */}
                <FaStar className="w-5 h-5" />
                <FaStar className="w-5 h-5" />
                <FaStar className="w-5 h-5" />
                <FaStar className="w-5 h-5" />
                <FaStar className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow p-5 transition-all duration-200"
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex justify-between items-center text-left"
                  >
                    <h3 className="text-lg font-medium text-gray-800">
                      {faq.question}
                    </h3>
                    <FaChevronDown
                      className={`transform transition-transform duration-200 ${
                        openIndex === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openIndex === idx && (
                    <p className="mt-3 text-gray-600 text-sm">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
