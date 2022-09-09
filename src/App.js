import React from 'react';
import FilterPage from './Pages/filter';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FilterContextProvider } from './contexts/Filter.context';
import { ResponseContextProvider } from './contexts/Response.context';
import ProjectDetails from './Pages/ProjectDetailsPage/ProjectDetails';
export default function App() {
  return (
    <BrowserRouter>
      <ResponseContextProvider>
        <FilterContextProvider>
          <Routes>
            <Route path="/portfolio.html" element={<FilterPage />} />
            <Route path="/modal" element={<ProjectDetails />} />
          </Routes>
        </FilterContextProvider>
      </ResponseContextProvider>
    </BrowserRouter>
  );
}
