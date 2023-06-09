//Make a new input for dni
//Validate it with a regex
//Show the dni on submitted
//Show an error if the dni is not valid
//Change the input border to red if the dni is not valid

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";

export const SignUp = ({ handleData }) => {
  const [showPassword, setShowPassword] = useState(false);

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



  function getInvalidDniError(dni) {
    if (!/^[0-9]{8}[A-Z]$/i.test(dni)) {
      return "Your ID card number must contain 7 digits and a final letter.";
    }
  }


  /* register your input into the hook by invoking the "register" function */
  /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
  //  Watch is used to watch the value of the input
  //  errors is an object that contains all the errors
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handleData(data);
    console.log(data);
  };

  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold">Form</h1>

      <form
        className="flex flex-col md:w-[50vw] w-full border border-secondary p-6 gap-4 rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Email---------------- */}
        <div className="flex flex-col gap-2">
          <label className="label-text">Email</label>
          <input
            className={`input input-md input-bordered  ${errors.email ? "input-error" : ""
              }`}
            placeholder="Email"
            {...register("email", {
              //This is the validation
              required: true,
              pattern: emailPattern,
            })}
          />
          {errors.email?.type == "pattern" && (
            <span className="text-error">Enter a valid email</span>
          )}
        </div>

        {/* Password---------------- */}
        <div className="flex flex-col gap-2">
          <label className="label-text">Password</label>
          <div className="flex flex-col relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`input input-md input-bordered w-full  ${errors.password ? "input-error" : ""
                }`}
              placeholder="password"
              {...register("password", {
                //This is the validation
                required: true,
                validate: getInvalidPasswordError,
              })}
            />
            <button
              className="absolute top-3 right-5 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Icon width={26} icon="iconamoon:eye-light" />
              ) : (
                <Icon width={26} icon="iconoir:eye-close" />
              )}
            </button>
            {errors.password?.type == "validate" && (
              <span className="text-error"> {errors.password.message}</span>
            )}
          </div>
        </div>

        {/* Language---------------- */}
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
        {/* DNI */}
        <div className="flex flex-col gap-2">
          <label className="label-text">DNI</label>
          <input
            type="text"
            className={`input input-md input-bordered w-full  ${errors.dni ? "input-error" : ""
              }`}
            placeholder="12345678A"
            {...register("dni", {
              //This is the validation
              required: "Oye amigo, llena tu DNI",
              validate: getInvalidDniError,
            })}

          />
          {errors.dni && (
            <span className="text-error"> {errors.dni.message}</span>
          )}
   
        </div>
        <input
          className="btn bg-blue-400 text-black rounded w-fit place-self-center uppercase"
          type="submit"
          value="signup"
        />

      </form>
    </div>
  );
};
