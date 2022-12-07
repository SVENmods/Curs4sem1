import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TicketPage from "./pages/TicketPage";
import Nav from "./components/Nav";
import CategoriesContext from "./Hooks/context";
import Profile from "./pages/Profile";
import Graph from "./pages/Graph";
import Header from "./components/Header";

function App() {
  const [categories, setCategories] = useState(null);
  const value = { categories, setCategories };

  return (
    <div className="App">
      <CategoriesContext.Provider value={value}>
        <BrowserRouter>
          <Nav />
          <div className="content">
          <Header/>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ticket" element={<TicketPage />} />
            <Route
              path="/ticket/:id"
              element={<TicketPage editMode={true} />}
            />
            <Route path="/profile" element={<Profile profilePage={true} />} />
            <Route path="/statistics" element={<Graph />} />
          </Routes>
          </div>
        </BrowserRouter>
      </CategoriesContext.Provider>
    </div>
  );
}

export default App;
