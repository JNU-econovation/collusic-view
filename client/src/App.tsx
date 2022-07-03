import React from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { NavBarView } from "./view/NavBarView";
// import { MainPageView } from "./view/MainPageView";
// import { CreateRequestPageView } from "./view/CreateRequestPageView";
// import { DetailRequestPageView } from "./view/DetailRequestPageView";
// import { CreateContributePageView } from "./view/CreateContributePageView";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        {/* <NavBarView></NavBarView> */}
        <Routes>
          {/* <Route path="/main/requestprojects" element={<MainPageView />} />
          <Route path="/requestprojects" element={<CreateRequestPageView />} />
          <Route
            path="/requestprojects/:id"
            element={<DetailRequestPageView></DetailRequestPageView>}
          ></Route>
          <Route
            path="/requestprojects/:id/contributeprojects"
            element={<CreateContributePageView />}
          ></Route> */}
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
