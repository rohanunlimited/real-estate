import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import ViewTable from './component/ViewTable';
import Pagination from './component/Pagination';
import Header from './component/Header';

function App() {
 
  const[currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const[search, setSearch] = useState("")
  const [startDate, setStartDate]= useState("");
  const [endDate, setEndDate] = useState("");
  const [isSearch, setIsSearch] = useState(false)
  const[emp, setEmp] = useState([]);

  useEffect(async ()=>{
    const res = await axios.get("https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f");
    const array = [...res.data.result.auditLog]
    setEmp(array)
  },[])

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = emp.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (num)=> {
  
    setCurrentPage(num)}
  return (
    <div id='App' className="App">
      <Header setSearch={setSearch} emp={emp} setEndDate={setEndDate} setStartDate={setStartDate} setIsSearch={setIsSearch}/>
      <ViewTable emp={currentPosts} search={search.trim()} startDate={startDate} endDate={endDate} isSearch={isSearch}/>
      <Pagination postPerPage={postsPerPage} totalPost={emp.length} paginate={paginate} />
    </div>
  );
}

export default App;
