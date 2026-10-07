// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         <Route
//           path="/login"
//           element={<Login />}
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;




import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Welcome from "./pages/Welcome";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/welcome"
          element={<Welcome />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;