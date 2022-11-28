import React, { useEffect, useMemo, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Pagination from './component/Pagination';
import Table from './component/Table';


function App() {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [loading, setLoading] = useState(true)
  const [emp, setEmp] = useState([]);
  const myparams = useRef();

  myparams.current = new URLSearchParams(window.location.search)
         

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
  const empnew = useMemo(() => currentPosts, [indexOfLastPost])
  const paginate = (num) => {
    setLoading(true)
    setCurrentPage(num)
    setTimeout(() => {
      setLoading(false)
    }, 10)
  }
  return (
    <div id='App' className="App">
      <Table emp={currentPosts} loading={loading} log={emp}  myparams={myparams}/>

      <Pagination postPerPage={postsPerPage} totalPost={emp.length} paginate={paginate} />
    </div>
  );
}

export default App;
