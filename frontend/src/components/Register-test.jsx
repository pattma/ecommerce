import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../styles/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../server";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true); // State to store whether passwords match

  // Add this line for Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // test password matching
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    // const config = { headers: { "Content-Type": "multipart/form-data" } };
    // const newForm = new FormData();

    // newForm.append("name", name);
    // newForm.append("email", email);
    // newForm.append("password", password);
    // newForm.append("confirmPassword", confirmPassword);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    // axios
    //   .post(`${server}/user/create-account`, newForm, config)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    axios
      .post(`${server}/user/create-account`, formData)
      .then((res) => {
        // Handle successful registration
        console.log(res);
      })
      .catch((err) => {
        // Handle registration error
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-screen bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      {/* Password Matching Error */}
      {passwordsMatch === false && (
        <div className="text-red-500 mt-2">Passwords do not match.</div>
      )}

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-18">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  placeholder="First and last name"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    color="#616161"
                    size={20}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    color="#616161"
                    size={20}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
              <div className="text-xs mt-1">
                <label className="text-red-500">*</label>
                &nbsp;Passwords must be at least 8 characters.
              </div>
            </div>
            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Re-enter password
              </label>
              <div className="relative mt-1">
                <input
                  type={visible ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="confirmPassword"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    color="#616161"
                    size={20}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    color="#616161"
                    size={20}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            {/* Submit Form */}
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Continue
              </button>
            </div>
            {/* Conditions of use and Privacy Notice */}
            <div className={`${styles.normalFlex} w-full gap-2`}>
              <label className="text-sm">
                By creating an account, you agree to UniStay&apos;s <br />
                <Link to="" className="text-blue-600">
                  Conditions of Use
                </Link>
                &nbsp;and&nbsp;
                <Link to="" className="text-blue-600">
                  Privacy Notice
                </Link>
                .
              </label>
            </div>
            <hr />
            {/* Link to Log in Page */}
            <div className={`${styles.normalFlex} w-full gap-2`}>
              <h4>Already have an account?</h4>
              <Link to="/login" className="text-blue-600">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
