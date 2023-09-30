import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import { AuthContext } from "../../../Context/AuthProvider";
import useTitle from "../../../Hooks/useTitle";
import useToken from "../../../Hooks/useToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import './Login.css';
const Login = () => {
  useTitle("Sign In");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { signin, signInWithGoogle, setLoading, loading } =
    useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/";
  if (token) {
    // navigate('/');
    navigate(from, { replace: true });
  }
  const handleLogin = (data) => {
    // console.log(data);
    setLoginError("");
    signin(data.email, data.password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        setLoginUserEmail(data.email);
        // navigate(from, { replace: true });
      })
      .catch((error) => {
        // console.log(error.message)
        setLoginError(error.message);
        setLoading(false);
      });
  };

  // Google Signin
  const handleGoogleSignin = () => {
    signInWithGoogle().then((result) => {
      toast.success("Login Success!");
      //   console.log(result.user.email);
      setLoginUserEmail(result.user.email);
      navigate(from, { replace: true });
    });
  };
  //   console.log(loginUserEmail);

  if (loading) {
    return (
        <div className="spinner"></div>

    //   <div className=" my-5 mx-auto w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-red-800"></div>
    );
  }
  return (
    <div className="h-full flex justify-center my-10">
      <div className="w-96 p-7 bg-zinc-700 shadow-2xl rounded-2xl">
        <h2 className="text-xl text-center text-white">Sign In</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label ">
              {" "}
              <span className="label-text text-white">Email</span>
            </label>
            <input
              type="text"
              {...register("email", {
                required: "Email Address is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs relative">
            <label className="label">
              <span className="label-text text-white">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}  
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or longer",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-2 py-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
            <label className="label">
              <span className="label-text text-white">Forget Password?</span>
            </label>
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
          </div>
          <input
            className="btn btn-accent w-full"
            value="Sign In"
            type="submit"
          />
          <div>
            {loginError && <p className="text-red-600">{loginError}</p>}
          </div>
        </form>
        <p className="text-white">
          New to this site?{" "}
          <Link className="text-secondary" to="/register">
            Create new Account
          </Link>
        </p>
        <div className="divider text-white">OR</div>
        <button
          onClick={handleGoogleSignin}
          className="btn btn-outline w-full text-white"
        >
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Login;
