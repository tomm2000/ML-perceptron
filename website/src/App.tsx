import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Layout from './pages/layout';
import MnistPage from './pages/mnist';
import LinerTest from './pages/LinearTest';

const App = () => {
  return (
    
      <Router>
        <Layout>
           <Routes>
            <Route path="/" element= {<Prova1 />} />
            <Route path = "/mnist" element={<MnistPage />} />
            <Route path = "/line" element={<LinerTest />} />
          </Routes>
        </Layout>
      </Router>
    
  );
};  

// A <Route> is only ever to be used as the child of <Routes> element, never rendered directly.
// Please wrap your <Route> in a <Routes>.

export default App;

const Prova = () =>{
  return(
    <div>
      <p>ciao</p>
    </div>
  )
}
const Prova1 = () =>{
  return(
    <div>
      <p>ciaoa</p>
    </div>
  )
}
