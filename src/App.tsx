// import "./App.css";
// import Createform from "./Component/Create_Form/index";
// import Showdata from "./Component/Show_data/index";
// import Sidebar from "./Component/Sidebar/index";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import UpdateForm from "./Component/Update_form/index";
// import Login from "./Component/login/index";
// import ShowState from "./Component/ShowState/index";

// function App() {
//   return (
//     <div className="page">
//       <Router>
//         <Routes>
//           <Route path="/" element={<Sidebar />}>
//             <Route path="/" element={<Login />} />
//             <Route path="/Createform" element={<Createform />} />
//             <Route path="/Showdata" element={<Showdata />} />
//             <Route path="/ShowState" element={<ShowState />} />
//             <Route path="/Updateform/:id" element={<UpdateForm />} />
//           </Route>
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Component/Sidebar/index";
import Createform from "./Component/Create_Form/index";
import Showdata from "./Component/Show_data/index";
import UpdateForm from "./Component/Update_form/index";
import Login from "./Component/login/index";
import ShowState from "./Component/ShowState/index";
import Game from "./Component/Game/game";

function App() {

  return (
    <div className="page">
      <Router>
        <Routes>
            <Route path="/" element={<Sidebar />}>
              <Route path="/login" element={<Login />} />
              <Route path="/Createform" element={<Createform />} />
              <Route path="/Showdata" element={<Showdata />} />
              <Route path="/ShowState" element={<ShowState />} />
              <Route path="/Updateform/:id" element={<UpdateForm />} />
              <Route path="/Game" element={<Game />} />
            </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
