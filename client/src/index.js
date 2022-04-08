import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import "./index.css"
import App from "./App"
import Edit from "./components/Edit"
import Save from "./components/Save"
import reportWebVitals from "./reportWebVitals"

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/edit' element={<Edit />} />
      <Route path='/save' element={<Save />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
)

reportWebVitals()
