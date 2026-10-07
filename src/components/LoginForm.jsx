import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight
} from "lucide-react";

import { loginUser } from "../services/authService";


function LoginForm() {

  const navigate = useNavigate();


  // ================================
  // FORM DATA
  // ================================

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });


  // ================================
  // PASSWORD VISIBILITY
  // ================================

  const [showPassword, setShowPassword] = useState(false);


  // ================================
  // FORM VALIDATION ERRORS
  // ================================

  const [errors, setErrors] = useState({});


  // ================================
  // REMEMBER ME
  // ================================

  const [rememberMe, setRememberMe] = useState(false);


  // ================================
  // LOADING STATE
  // ================================

  const [loading, setLoading] = useState(false);


  // ================================
  // BACKEND ERROR
  // ================================

  const [serverError, setServerError] = useState("");


  // ================================
  // SUCCESS MESSAGE
  // ================================

  const [successMessage, setSuccessMessage] = useState("");


  // ================================
  // HANDLE INPUT CHANGE
  // ================================

  const handleChange = (event) => {

    const { name, value } = event.target;


    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));


    // Remove field error while typing

    setErrors((previous) => ({
      ...previous,
      [name]: ""
    }));


    // Remove server error when user changes input

    setServerError("");

    setSuccessMessage("");
  };


  // ================================
  // FORM VALIDATION
  // ================================

  const validateForm = () => {

    const newErrors = {};


    // Username validation

    if (!formData.username.trim()) {

      newErrors.username =
        "Username is required.";

    }


    // Password validation

    if (!formData.password) {

      newErrors.password =
        "Password is required.";

    }


    // Minimum password length

    if (
      formData.password &&
      formData.password.length < 6
    ) {

      newErrors.password =
        "Password must contain at least 6 characters.";

    }


    setErrors(newErrors);


    return Object.keys(newErrors).length === 0;
  };


  // ================================
  // HANDLE LOGIN
  // ================================

  const handleSubmit = async (event) => {

    event.preventDefault();


    // Clear previous messages

    setServerError("");

    setSuccessMessage("");


    // Validate form

    const isValid = validateForm();


    if (!isValid) {
      return;
    }


    try {

      // Start loading

      setLoading(true);


      // Send login request to Spring Boot

      const response = await loginUser({

        username: formData.username,

        password: formData.password

      });


      console.log(
        "Login Response:",
        response
      );


      // ================================
      // SUCCESSFUL LOGIN
      // ================================

      if (response.token) {

        /*
          Backend response:

          {
            "message": "Login successful",
            "token": "eyJ..."
          }
        */


        // Store token according to Remember Me

        if (rememberMe) {

          localStorage.setItem(
            "authToken",
            response.token
          );

        } else {

          sessionStorage.setItem(
            "authToken",
            response.token
          );

        }


        // Show success message

        setSuccessMessage(
          response.message ||
          "Login successful."
        );


        // Open Welcome page after 1 second

        setTimeout(() => {

          navigate("/welcome");

        }, 1000);


        console.log(
          "JWT stored successfully."
        );

      } else {

        // Backend responded but no token

        setServerError(
          "Login failed. Authentication token was not received."
        );

      }

    } catch (error) {

      console.error(
        "Login Error:",
        error
      );


      // ================================
      // BACKEND ERROR
      // ================================

      if (error.response) {

        setServerError(

          error.response.data?.message ||

          "Invalid username or password."

        );

      }

      // ================================
      // NETWORK ERROR
      // ================================

      else if (error.request) {

        setServerError(
          "Unable to connect to the server. Please check the backend connection."
        );

      }

      // ================================
      // UNKNOWN ERROR
      // ================================

      else {

        setServerError(
          "Something went wrong. Please try again."
        );

      }

    } finally {

      // Stop loading

      setLoading(false);

    }

  };


  return (

    <div className="login-card">


      {/* =================================
          HEADER
      ================================== */}

      <div className="login-header">

        <span className="welcome-label">
          WELCOME BACK
        </span>


        <h2>
          Sign in to your account
        </h2>


        <p>
          Enter your credentials to continue.
        </p>

      </div>


      {/* =================================
          SERVER ERROR
      ================================== */}

      {serverError && (

        <div className="alert alert-error">

          <span className="alert-icon">
            !
          </span>


          <span>
            {serverError}
          </span>

        </div>

      )}


      {/* =================================
          SUCCESS MESSAGE
      ================================== */}

      {successMessage && (

        <div className="alert alert-success">

          <span className="alert-icon success-icon">
            ✓
          </span>


          <span>
            {successMessage}
          </span>

        </div>

      )}


      {/* =================================
          LOGIN FORM
      ================================== */}

      <form onSubmit={handleSubmit}>


        {/* =================================
            USERNAME
        ================================== */}

        <div className="form-group">

          <label htmlFor="username">
            Username
          </label>


          <div
            className={`input-wrapper ${
              errors.username
                ? "input-error"
                : ""
            }`}
          >

            <Mail
              className="input-icon"
              size={19}
            />


            <input
              id="username"

              name="username"

              type="text"

              placeholder="Enter your username"

              value={formData.username}

              onChange={handleChange}

              autoComplete="username"

              disabled={loading}
            />

          </div>


          {/* Username Error */}

          {errors.username && (

            <span className="field-error">
              {errors.username}
            </span>

          )}

        </div>


        {/* =================================
            PASSWORD
        ================================== */}

        <div className="form-group">

          <div className="password-label-row">

            <label htmlFor="password">
              Password
            </label>


            <button
              type="button"

              className="forgot-password"

              onClick={() => {

                console.log(
                  "Forgot password clicked"
                );

              }}

              disabled={loading}
            >
              Forgot password?
            </button>

          </div>


          <div
            className={`input-wrapper ${
              errors.password
                ? "input-error"
                : ""
            }`}
          >

            <LockKeyhole
              className="input-icon"
              size={19}
            />


            <input
              id="password"

              name="password"

              type={
                showPassword
                  ? "text"
                  : "password"
              }

              placeholder="Enter your password"

              value={formData.password}

              onChange={handleChange}

              autoComplete="current-password"

              disabled={loading}
            />


            {/* Password Visibility */}

            <button
              type="button"

              className="password-toggle"

              onClick={() =>
                setShowPassword(
                  (previous) => !previous
                )
              }

              disabled={loading}

              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >

              {showPassword ? (

                <EyeOff size={19} />

              ) : (

                <Eye size={19} />

              )}

            </button>

          </div>


          {/* Password Error */}

          {errors.password && (

            <span className="field-error">
              {errors.password}
            </span>

          )}

        </div>


        {/* =================================
            REMEMBER ME
        ================================== */}

        <div className="login-options">

          <label className="remember-wrapper">

            <input
              type="checkbox"

              checked={rememberMe}

              onChange={(event) =>
                setRememberMe(
                  event.target.checked
                )
              }

              disabled={loading}
            />


            <span className="custom-checkbox"></span>


            <span>
              Remember me
            </span>

          </label>

        </div>


        {/* =================================
            LOGIN BUTTON
        ================================== */}

        <button
          type="submit"

          className="login-button"

          disabled={loading}
        >

          {loading ? (

            <>

              <span className="spinner"></span>

              <span>
                Signing in...
              </span>

            </>

          ) : (

            <>

              <span>
                Sign in
              </span>

              <ArrowRight size={19} />

            </>

          )}

        </button>


      </form>


      {/* =================================
          SECURITY MESSAGE
      ================================== */}

      <div className="security-note">

        <LockKeyhole size={15} />

        <span>
          Protected with secure authentication
        </span>

      </div>


    </div>

  );

}


export default LoginForm;














// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   Mail,
//   LockKeyhole,
//   Eye,
//   EyeOff,
//   ArrowRight
// } from "lucide-react";

// import { loginUser } from "../services/authService";


// function LoginForm() {

//   // ================================
//   // FORM DATA
//   // ================================

//   const [formData, setFormData] = useState({
//     username: "",
//     password: ""
//   });


//   // ================================
//   // PASSWORD VISIBILITY
//   // ================================

//   const [showPassword, setShowPassword] = useState(false);


//   // ================================
//   // FORM VALIDATION ERRORS
//   // ================================

//   const [errors, setErrors] = useState({});


//   // ================================
//   // REMEMBER ME
//   // ================================

//   const [rememberMe, setRememberMe] = useState(false);


//   // ================================
//   // LOADING STATE
//   // ================================

//   const [loading, setLoading] = useState(false);


//   // ================================
//   // BACKEND ERROR
//   // ================================

//   const [serverError, setServerError] = useState("");


//   // ================================
//   // SUCCESS MESSAGE
//   // ================================

//   const [successMessage, setSuccessMessage] = useState("");


//   // ================================
//   // HANDLE INPUT CHANGE
//   // ================================

//   const handleChange = (event) => {

//     const { name, value } = event.target;


//     setFormData((previous) => ({
//       ...previous,
//       [name]: value
//     }));


//     // Remove field error while typing

//     setErrors((previous) => ({
//       ...previous,
//       [name]: ""
//     }));


//     // Remove server error when user changes input

//     setServerError("");

//     setSuccessMessage("");
//   };


//   // ================================
//   // FORM VALIDATION
//   // ================================

//   const validateForm = () => {

//     const newErrors = {};


//     // Username validation

//     if (!formData.username.trim()) {

//       newErrors.username =
//         "Username is required.";

//     }


//     // Password validation

//     if (!formData.password) {

//       newErrors.password =
//         "Password is required.";

//     }


//     // Minimum password length

//     if (
//       formData.password &&
//       formData.password.length < 6
//     ) {

//       newErrors.password =
//         "Password must contain at least 6 characters.";

//     }


//     setErrors(newErrors);


//     return Object.keys(newErrors).length === 0;
//   };


//   // ================================
//   // HANDLE LOGIN
//   // ================================

//   const handleSubmit = async (event) => {

//     event.preventDefault();


//     // Clear previous messages

//     setServerError("");

//     setSuccessMessage("");


//     // Validate form

//     const isValid = validateForm();


//     if (!isValid) {
//       return;
//     }


//     try {

//       // Start loading

//       setLoading(true);


//       // Send login request to Spring Boot

//       const response = await loginUser({

//         username: formData.username,

//         password: formData.password

//       });


//       console.log(
//         "Login Response:",
//         response
//       );


//       // ================================
//       // SUCCESSFUL LOGIN
//       // ================================

//       if (response.token) {

//         /*
//           Backend response:

//           {
//             "message": "Login successful",
//             "token": "eyJ..."
//           }
//         */


//         // Store token according to Remember Me

//         if (rememberMe) {

//           localStorage.setItem(
//             "authToken",
//             response.token
//           );

//         } else {

//           sessionStorage.setItem(
//             "authToken",
//             response.token
//           );

//         }


//         // Show success message

//         setSuccessMessage(
//           response.message ||
//           "Login successful."
//         );


//         console.log(
//           "JWT stored successfully."
//         );

//       } else {

//         // Backend responded but no token

//         setServerError(
//           "Login failed. Authentication token was not received."
//         );

//       }

//     } catch (error) {

//       console.error(
//         "Login Error:",
//         error
//       );


//       // ================================
//       // BACKEND ERROR
//       // ================================

//       if (error.response) {

//         setServerError(

//           error.response.data?.message ||

//           "Invalid username or password."

//         );

//       }

//       // ================================
//       // NETWORK ERROR
//       // ================================

//       else if (error.request) {

//         setServerError(
//           "Unable to connect to the server. Please check the backend connection."
//         );

//       }

//       // ================================
//       // UNKNOWN ERROR
//       // ================================

//       else {

//         setServerError(
//           "Something went wrong. Please try again."
//         );

//       }

//     } finally {

//       // Stop loading

//       setLoading(false);

//     }

//   };


//   return (

//     <div className="login-card">


//       {/* =================================
//           HEADER
//       ================================== */}

//       <div className="login-header">

//         <span className="welcome-label">
//           WELCOME BACK
//         </span>


//         <h2>
//           Sign in to your account
//         </h2>


//         <p>
//           Enter your credentials to continue.
//         </p>

//       </div>


//       {/* =================================
//           SERVER ERROR
//       ================================== */}

//       {serverError && (

//         <div className="alert alert-error">

//           <span className="alert-icon">
//             !
//           </span>


//           <span>
//             {serverError}
//           </span>

//         </div>

//       )}


//       {/* =================================
//           SUCCESS MESSAGE
//       ================================== */}

//       {successMessage && (

//         <div className="alert alert-success">

//           <span className="alert-icon success-icon">
//             ✓
//           </span>


//           <span>
//             {successMessage}
//           </span>

//         </div>

//       )}


//       {/* =================================
//           LOGIN FORM
//       ================================== */}

//       <form onSubmit={handleSubmit}>


//         {/* =================================
//             USERNAME
//         ================================== */}

//         <div className="form-group">

//           <label htmlFor="username">
//             Username
//           </label>


//           <div
//             className={`input-wrapper ${
//               errors.username
//                 ? "input-error"
//                 : ""
//             }`}
//           >

//             <Mail
//               className="input-icon"
//               size={19}
//             />


//             <input
//               id="username"

//               name="username"

//               type="text"

//               placeholder="Enter your username"

//               value={formData.username}

//               onChange={handleChange}

//               autoComplete="username"

//               disabled={loading}
//             />

//           </div>


//           {/* Username Error */}

//           {errors.username && (

//             <span className="field-error">
//               {errors.username}
//             </span>

//           )}

//         </div>


//         {/* =================================
//             PASSWORD
//         ================================== */}

//         <div className="form-group">

//           <div className="password-label-row">

//             <label htmlFor="password">
//               Password
//             </label>


//             <button
//               type="button"

//               className="forgot-password"

//               onClick={() => {

//                 console.log(
//                   "Forgot password clicked"
//                 );

//               }}

//               disabled={loading}
//             >
//               Forgot password?
//             </button>

//           </div>


//           <div
//             className={`input-wrapper ${
//               errors.password
//                 ? "input-error"
//                 : ""
//             }`}
//           >

//             <LockKeyhole
//               className="input-icon"
//               size={19}
//             />


//             <input
//               id="password"

//               name="password"

//               type={
//                 showPassword
//                   ? "text"
//                   : "password"
//               }

//               placeholder="Enter your password"

//               value={formData.password}

//               onChange={handleChange}

//               autoComplete="current-password"

//               disabled={loading}
//             />


//             {/* Password Visibility */}

//             <button
//               type="button"

//               className="password-toggle"

//               onClick={() =>
//                 setShowPassword(
//                   (previous) => !previous
//                 )
//               }

//               disabled={loading}

//               aria-label={
//                 showPassword
//                   ? "Hide password"
//                   : "Show password"
//               }
//             >

//               {showPassword ? (

//                 <EyeOff size={19} />

//               ) : (

//                 <Eye size={19} />

//               )}

//             </button>

//           </div>


//           {/* Password Error */}

//           {errors.password && (

//             <span className="field-error">
//               {errors.password}
//             </span>

//           )}

//         </div>


//         {/* =================================
//             REMEMBER ME
//         ================================== */}

//         <div className="login-options">

//           <label className="remember-wrapper">

//             <input
//               type="checkbox"

//               checked={rememberMe}

//               onChange={(event) =>
//                 setRememberMe(
//                   event.target.checked
//                 )
//               }

//               disabled={loading}
//             />


//             <span className="custom-checkbox"></span>


//             <span>
//               Remember me
//             </span>

//           </label>

//         </div>


//         {/* =================================
//             LOGIN BUTTON
//         ================================== */}

//         <button
//           type="submit"

//           className="login-button"

//           disabled={loading}
//         >

//           {loading ? (

//             <>

//               <span className="spinner"></span>

//               <span>
//                 Signing in...
//               </span>

//             </>

//           ) : (

//             <>

//               <span>
//                 Sign in
//               </span>

//               <ArrowRight size={19} />

//             </>

//           )}

//         </button>


//       </form>


//       {/* =================================
//           SECURITY MESSAGE
//       ================================== */}

//       <div className="security-note">

//         <LockKeyhole size={15} />

//         <span>
//           Protected with secure authentication
//         </span>

//       </div>


//     </div>

//   );

// }


// export default LoginForm;