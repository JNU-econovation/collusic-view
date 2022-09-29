import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NavBar } from "./components/blocks/NavBar";

import { SignInViewModel } from "./viewmodel/SignInViewModel";
import { StartPageView } from "./view/StartPageView";
import { SignUpViewModel } from "./viewmodel/SignUpViewModel";
import { RedirectViewModel } from "./viewmodel/RedirectViewModel";
import { ProjectListView } from "./view/ProjectListView";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/signin" element={<SignInViewModel />} />
        <Route path="/signup" element={<SignUpViewModel />} />
        <Route path="/auth/redirect/:snsType" element={<RedirectViewModel />} />
        <Route path="/" element={<StartPageView />} />
        <Route path="/projectlist" element={<ProjectListView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
