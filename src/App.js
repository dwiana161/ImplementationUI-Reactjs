import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from './Component/Dashboard/Dashboard';
import Monitoring from './Component/Dashboard/Monitoring';
import Report from './Component/Dashboard/Report';
import Geofence from './Component/Dashboard/Geofence';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route element={<Dashboard />}>
          <Route path='/' element={<Monitoring />}/>
          <Route path='report' element={<Report />}/>
          <Route path='geofence' element={<Geofence />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
