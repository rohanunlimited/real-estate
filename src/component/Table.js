import React, { useEffect, useMemo, useRef, useState } from 'react'
import Header from './Header'
import { AiOutlineArrowUp } from 'react-icons/ai'
import { AiOutlineArrowDown } from 'react-icons/ai';
import './Table.css'
import Pagination from './Pagination';
import { Navigate, useNavigate } from 'react-router';

export default function Table({ log,isFilter, loading, setIsFilter,setEmp, setLoading }) {
    const [empOne, setEmpOne] = useState([]);
    const [sortLogId, setSortLogId] = useState('');
    const [applicationSortId, setApplicationSortId] = useState('');
    const [applicationTypeSort, setApplicationTypeSort] = useState(false);
    const [sortActionType, setSortActionType] = useState(false);
    const [dateSort, setDateSort] = useState(false);
    const[isSort, setSort] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

useEffect(()=>{
 handlelog()
},[loading])

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = empOne?.length==0 || empOne?.length == 100 ? log?.slice(indexOfFirstPost, indexOfLastPost): empOne?.slice(indexOfFirstPost, indexOfLastPost);
const navigate = useNavigate()
const paginate = (num) => {
    setLoading(true)
    setCurrentPage(num)
    setTimeout(() => {
      setLoading(false)
    }, 10)
  }

    const handlelog = ()=>{
       
        if(!isFilter){
           setEmpOne(log)
        }else {
            setEmpOne(empOne)
          
        
        }
    }
    
   

    const sortLogById = (order) => {
        
        let em = []
        if (order === 'dsc') {
           
            em = log?.sort((a, b) => b?.logId - a?.logId)
            
           
        } else {
           
            em = log?.sort((a, b) => a?.logId - b?.logId)
          
        }
        setEmpOne(em)
        navigate("/")
    }

    const applicationIdSort = (order) => {
        
        let em = []
        if (order === 'dsc') {
        
            em = log?.sort((a, b) => b?.applicationId - a?.applicationId)
            
            
           
        } else {
    
            em = log?.sort((a, b) => a?.applicationId - b?.applicationId)
           
        }
        setEmpOne(em)
        navigate("/")
    }


    const applicationTypeBySort = (type, order) => {
        navigate("/")
      
        let em = []
        em = log?.sort((a, b) => {
            if(type==="applicationType"){
            const isreversed = order === 'asc' ? 1 : -1
            return isreversed * a?.applicationType?.localeCompare(b.applicationType)
            }
            else if(type==="actionType"){
                const isreversed = order === 'asc' ? 1 : -1
                return isreversed * a?.actionType?.localeCompare(b.actionType)
            }
            else if(type==="dateSort"){
                const isreversed = order === 'asc' ? 1 : -1
                return isreversed * a?.creationTimestamp?.localeCompare(b.creationTimestamp)
            }
        })
        console.log('newsort',em)
        setEmpOne(em)
        navigate("/")
    }

    return (
        <>
            <Header emp={log} empOne={currentPosts} setCurrentPage={setCurrentPage} setSort={setSort} setEmpOne={setEmpOne}  setIsFilter={setIsFilter} setEmp={setEmp}/>
            <table>
                <thead>

                    <tr>
                        <th >LogId <AiOutlineArrowUp onClick={()=> sortLogById('asc')} /> <AiOutlineArrowDown onClick={()=>sortLogById('dsc')}/></th>
                        <th
                          
                        >Application Type<AiOutlineArrowUp onClick={()=> applicationTypeBySort('applicationType','asc')}/> <AiOutlineArrowDown onClick={()=> applicationTypeBySort('applicationType','dsc')} /></th>
                        <th
                             
     
     
     
     >Application ID  <AiOutlineArrowUp  onClick={()=> applicationIdSort('asc') } />  <AiOutlineArrowDown  onClick={()=> applicationIdSort('dsc')}/></th>
                        <th
                    

                        >Action<AiOutlineArrowUp onClick={()=> applicationTypeBySort('actionType','asc')} />  <AiOutlineArrowDown onClick={()=> applicationTypeBySort('actionType','dsc')} /></th>
                        <th>Action Details</th>
                        <th
                    
                        >Date:Time sort <AiOutlineArrowUp onClick={()=> applicationTypeBySort('dateSort','asc')} /> <AiOutlineArrowDown onClick={()=> applicationTypeBySort('datesort', 'dsc')}/></th>
                    </tr>

                </thead>
                <tbody>
                    {
                    (empOne?.length!= 100 || isSort) ?empOne?.length==0?<h1>Value not found</h1>:  currentPosts?.map((e, index) => (
                            <tr key={index}>
                                <td>{e?.logId}</td>
                                <td>{e?.applicationType}</td>
                                <td>{e?.applicationId}</td>
                                <td>{e?.actionType}</td>
                                <td>{e?.actionDetails}</td>
                                <td>{e?.creationTimestamp}</td>
                                 
                            </tr>

                        ))

                            : currentPosts?.map((e, index) => (
                                <tr key={index}>
                                    <td>{e.logId}</td>
                                    <td>{e.applicationType}</td>
                                    <td>{e.applicationId}</td>
                                    <td>{e.actionType}</td>
                                    <td>{e.actionDetails}</td>
                                    <td>{e.creationTimestamp}</td>
                                    
                                </tr>
                            ))
                    }
                </tbody>
            </table>
          {
            empOne?.length != 0 && 
          <Pagination postPerPage={postsPerPage} totalPost={empOne?.length == 0 || empOne?.length == 100 ?log?.length:empOne?.length}  currentPage={currentPage} paginate={paginate} />
          }
        </>
    )
}
