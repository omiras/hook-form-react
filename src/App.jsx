import { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function getInvalidPasswordError(password) {
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password should contain at least one lowercase letter.";
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password should contain at least one uppercase letter.";
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password should contain at least one digit.";
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      return "Password should contain at least one special character.";
    }
    if (password.length < 8) {
      return "Password should have a minimum length of 8 characters.";
    }
    return null; // If no error is found, return null
  }

  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    setSubmitted(data);
  };

  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div
      className="flex flex-col p-4 gap-5 place-content-center
    place-items-center h-screen"
    >
      <h1 className="text-2xl font-bold">Form</h1>

      <form
        className="flex flex-col md:w-[50vw] w-full border border-secondary p-6 gap-4 rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <label className="label-text">Email</label>
          <input
            className={`input input-md input-bordered  ${
              errors.email ? "input-error" : ""
            }`}
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: emailPattern,
            })}
          />
          {errors.email?.type == "pattern" && (
            <span className="text-error">Enter a valid email</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="label-text">Password</label>

          <input
            type={showPassword ? "text" : "password"}
            className={`input input-md input-bordered  ${
              errors.password ? "input-error" : ""
            }`}
            placeholder="password"
            {...register("password", {
              required: true,
              validate: getInvalidPasswordError,
            })}
          />
          {errors.password?.type == "validate" && (
            <span className="text-error"> {errors.password.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="label-text">Language</label>
          <select
            {...register("language")}
            className="select select-bordered select-md"
            name="language"
            id="language"
          >
            <option value="en">en</option>
            <option value="de">de</option>
            <option value="fr">fr</option>
          </select>
        </div>
        <input
          className="btn bg-blue-400 text-black rounded w-fit place-self-center uppercase"
          type="submit"
          value="signup"
        />
      </form>

      {submitted && (
        <div>
          <p>Hola</p>
          <p>Your email is: {submitted.email}</p>
        </div>
      )}
    </div>
  );
}
export default App;
