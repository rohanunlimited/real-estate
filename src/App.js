import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Table from './component/Table';
import { Route, Routes } from 'react-router-dom';


function App() {

 
  const [loading, setLoading] = useState(true)
  const [emp, setEmp] = useState([]);
  const [isFilter, setIsFilter] = useState(false)



  useEffect(async () => {
    try {
      setLoading(true)
      const res = await axios.get("https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f");
      const array = [...res.data.result.auditLog]
        
      const a = array.sort((a,b)=>{
        const reversed = -1;
        return reversed* a?.applicationType?.localeCompare(b?.applicationType)
      })
      setEmp(a)
      setLoading(false);

    } catch (e) {

    }
  }, [])



  
  return (
    <div data-testid='app' className="App">
      <Routes>
        <Route path='/' element={<Table  log={emp} loading={loading} setIsFilter={setIsFilter} 
          setLoading={setLoading}
          setEmp={setEmp}
        
          isFilter={isFilter}
        />} />
      </Routes>


      {/* { !isFilter && } */}
    </div>
  );
}

export default App;
