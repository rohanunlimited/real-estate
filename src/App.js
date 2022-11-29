import React, { useEffect, useMemo, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Pagination from './component/Pagination';
import Table from './component/Table';
import { Route, Routes, useSearchParams } from 'react-router-dom';


function App() {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [loading, setLoading] = useState(true)
  const [emp, setEmp] = useState([]);

  const [searchparams] = useSearchParams()
const [searchparam, setSearchParam] = useState({});

useEffect(()=>{
  if(searchparams.has('actionType')){
  setSearchParam({'actionType':searchparams.get('actionType')})
  }
  else if(searchparams.has('applicationType')){
    setSearchParam({'applicationType':searchparams.get('applicationType')})
  }else if(searchparams.has('applicationId')){
    setSearchParam({'applicationId':searchparams.get('applicationId')})
  }else if(searchparams.has('startDate') && searchparams.has('endDate')){
     setSearchParam({'startDate': `${searchparams.get('startDate')}`, 'endDate': `${searchparams.get('endDate')}`})
  }
},[])
 
         

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
    <div  data-testid='app' className="App">
      <Routes>
        <Route path='/' element={ <Table emp={currentPosts} loading={loading} log={emp}   searchparam={searchparam}/>}/>
      </Routes>
     

      <Pagination postPerPage={postsPerPage} totalPost={emp.length}  currentPage={currentPage} paginate={paginate} />
    </div>
  );
}

export default App;
