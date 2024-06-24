"use client";
import Head from "next/head";
import SiteHeader from "component/Siteheader";
import SiteFooter from "component/Sitefooter";
import { useState } from "react";

export default function ContactHome() {
  const [submitStatus, setSubmitStatus] = useState(false); // Corrected typo
  const [responseMessage, setResponseMessage] = useState("");
  const [alertColor, setAlertColor] = useState("bg-green-500");

  const handleSubmit = async (event) => { // Changed to camelCase
    event.preventDefault();

    const data = {
      firstName: event.target.firstName.value,
      email: event.target.email.value,
      message: event.target.message.value,
    };

    const jsonData = JSON.stringify(data);

    const response = await fetch("/api/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });

    const result = await response.json();

    setSubmitStatus(true);
    setResponseMessage(result.data);

    if (!response.ok) {
      setAlertColor("bg-red-500");
    } else {
      setAlertColor("bg-green-500");
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      <section className="bg-slate-700">
        <SiteHeader className="header-blog-home z-10 relative" />
      </section>
      <section>
        <h1 className="text-4xl text-center text-slate-700 py-8 ">Contact Us</h1>
        <form className="max-w-sm mx-auto p-3" onSubmit={handleSubmit}> {/* Corrected function name */}
          <div className="mb-5">
            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your message
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Leave a comment..."
              required
            ></textarea>
          </div>

          <div className="mb-5">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
        {submitStatus ? (
          <SubmissionAlert message={responseMessage} alertColor={alertColor} />
        ) : null}
      </section>
      <section>
        <SiteFooter />
      </section>
    </>
  );
}

const SubmissionAlert = ({ message, alertColor }) => {
  return (
    <div className={`${alertColor} py-2 px-4 mt-4 text-slate-100 rounded-md`}>
      {message}
    </div>
  );
};
