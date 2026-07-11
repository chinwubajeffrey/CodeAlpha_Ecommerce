import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import { useState } from "react";
import API from "../api/axios.js";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const token = useAuthStore((state) => state.token);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", { name, email, password });
      const { user, accessToken } = res.data;
      console.log(res.data);

      login(user, accessToken);
      return navigate("/products");
    } catch (err) {
      console.log(err);
    }
  };

  if (token) {
    return <Navigate to="/products" />;
  }

  return (
    <div className="flex items-center w-[full] h-screen cursor-[url('https://res.cloudinary.com/df8lfmv1j/image/upload/v1783795907/icons8-fork-64_dctca9.png')] p-5 justify-center text-red-800 font-cause bg-[#edc9cc] ">
      <div className="flex items-center justify-center  h-full w-[70%] bg-white">
        <div className="first basis-1/2 bg-white py-10 px-5 items-center justify-center flex flex-col h-full">
          <div className="box flex-col flex items-center justify-around  w-full">
            <h1 className="text-5xl m-5 font-dyna text-red-800">Register</h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center  w-full h-full"
            >
              <input
                className="m-4 p-3 text-l w-full border-b-2 text-red-800 border-b-red-500 outline-none"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />

              <input
                className="m-4 p-3 text-l w-full border-b-2 text-red-800 border-b-red-500 outline-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
              />

              <input
                className="m-4 p-3 text-l w-full border-b-2 text-red-800 border-b-red-500   00 outline-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />

              <button
                type="submit"
                className="bg-red-800 text-amber-50 w-full py-3 mt-10 rounded-4xl hover:cursor-pointer"
              >
                Register
              </button>
              <Link to="/login" className="text-[12px] mt-5">
                Already one of us ? Login
              </Link>
            </form>
          </div>
        </div>
        <div className="second h-full basis-1/2">
          <img
            src="https://res.cloudinary.com/df8lfmv1j/image/upload/v1783792474/floating-berry-cakes-presentation_1_prl5qf.jpg"
            alt="cake"
            className=" w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
