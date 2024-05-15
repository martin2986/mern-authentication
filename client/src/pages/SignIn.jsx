import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
const SignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "james@gmail.com",
      password: "James123",
    },
  });
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/auth/signin", data);
      console.log(response.data);
      navigate("/");
    } catch (err) {
      setError("root", {
        message: err.response.data.message || "An error occurred during login.",
      });
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          className="bg-slate-100 p-3 rounded-lg"
          {...register("email")}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          className="bg-slate-100 p-3 rounded-lg"
          {...register("password")}
        />
        <button
          disabled={isSubmitting}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {isSubmitting ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have no account yet?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      {errors.root && (
        <div className="text-red-500 text-sm mb-4">
          {errors.root.message || "Something went wrong"}
        </div>
      )}
    </div>
  );
};

export default SignIn;
