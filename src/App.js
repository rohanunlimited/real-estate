import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Table from './component/Table';
import { Route, Routes } from 'react-router-dom';


function App() {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [loading, setLoading] = useState(true)
  const [emp, setEmp] = useState([]);
  const [isFilter, setIsFilter] = useState(false)



  useEffect(async () => {
    try {
      setLoading(true)
      const res = await axios.get("https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f");
      const array = [...res.data.result.auditLog]

      setEmp(array)
      setLoading(false);

    } catch (e) {

    }
  }, [])

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = emp.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (num) => {
    setLoading(true)
    setCurrentPage(num)
    setTimeout(() => {
      setLoading(false)
    }, 10)
  }
  return (
    <div data-testid='app' className="App">
      <Routes>
        <Route path='/' element={<Table emp={currentPosts} log={emp} loading={loading} setIsFilter={setIsFilter} postPerPage={postsPerPage}
          totalPost={emp.length}
          currentPage={currentPage}
          paginate={paginate}
          isFilter={isFilter}
        />} />
      </Routes>


      {/* { !isFilter && } */}
    </div>
  );
}

export default App;
