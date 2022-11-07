import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TicketPage from "./pages/TicketPage";
import Nav from "./components/Nav";
import CategoriesContext from "./Hooks/context";

function App() {
  const [categories, setCategories] = useState(null);
  const value = { categories, setCategories };

  return (
    <div className="App">
      <CategoriesContext.Provider value={value}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ticket" element={<TicketPage />} />
            <Route
              path="/ticket/:id"
              element={<TicketPage editMode={true} />}
            />
          </Routes>
        </BrowserRouter>
      </CategoriesContext.Provider>
    </div>
  );
}

export default App;
