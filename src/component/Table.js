import React, { useEffect, useMemo, useRef, useState } from 'react'
import Header from './Header'
import { AiOutlineArrowUp } from 'react-icons/ai'
import { AiOutlineArrowDown } from 'react-icons/ai';
import './Table.css'
import Pagination from './Pagination';

export default function Table({ emp,  log,loading,isFilter,postPerPage, totalPost,currentPage,paginate, setIsFilter }) {
    const [empOne, setEmpOne] = useState([]);
    const [sortLogId, setSortLogId] = useState('');
    const [applicationSortId, setApplicationSortId] = useState('');
    const [applicationTypeSort, setApplicationTypeSort] = useState(false);
    const [sortActionType, setSortActionType] = useState(false);
    const [dateSort, setDateSort] = useState(false);
    const[isSort, setSort] = useState(false);

useEffect(()=>{
 handlelog()
},[loading])

    const handlelog = ()=>{
        if(!isFilter){
           setEmpOne(emp)
        }else {
            setEmpOne(empOne)
        }
    }
    
    const sortLogById = () => {
        setSort(true)
        let em = []
        if (sortLogId) {
            em = log?.sort((a, b) => b.logId - a.logId)
        } else {
            em = log?.sort((a, b) => a.logId - b.logId)
        }
        setEmpOne(em)
    }

    const applicationIdSort = () => {
        setSort(true)
        let em = []
        if (applicationSortId) {
            em = log?.sort((a, b) => b.applicationId - a.applicationId)
        } else {
            em = log?.sort((a, b) => a.applicationId - b.applicationId)
        }
        setEmpOne(em)
    }


    const applicationTypeBySort = () => {
        setSort(true)
        let em = []
        em = log?.sort((a, b) => {
            const isreversed = applicationTypeSort ? 1 : -1
            return isreversed * a?.applicationType?.localeCompare(b.applicationType)
        })
        setEmpOne(em)
    }

    const actionTypeSort = () => {
        setSort(true)
        let em = [];
        


        em = log?.sort((a, b) => {
            const isreversed = sortActionType ? 1 : -1;
            return isreversed * a.actionType.localeCompare(b.actionType)
        })
        setEmpOne(em)




    }

    const dateBySort = () => {
        setSort(true)
        let em = [];
        em = log?.sort((a, b) => {
            const isreversed = dateSort ? 1 : -1;
            return isreversed * a.creationTimestamp.localeCompare(b.creationTimestamp)
        })
        setEmpOne(em)

    }

    return (
        <>
            <Header emp={log} empOne={emp} setSort={setSort} setEmpOne={setEmpOne}  setIsFilter={setIsFilter}/>
            <table>
                <thead>

                    <tr>
                        <th onClick={() => {
                            setSortLogId(!sortLogId)
                            sortLogById()
                        }}>LogId  {sortLogId ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}</th>
                        <th
                            onClick={() => {
                                setApplicationTypeSort(!applicationTypeSort)
                                applicationTypeBySort()
                            }}
                        >Application Type{applicationTypeSort ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}</th>
                        <th
                            onClick={() => {
                                setApplicationSortId(!applicationSortId)
                                applicationIdSort()
                            }}
     
     
     
     >Application ID {applicationSortId ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}</th>
                        <th
                            onClick={() => {

                                setSortActionType(!sortActionType);
                                actionTypeSort()


                            }}

                        >Action{sortActionType ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}</th>
                        <th>Action Details</th>
                        <th
                            onClick={() => {
                                setDateSort(!dateSort);
                                dateBySort()
                            }}
                        >Date:Time sort{dateSort ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}</th>
                    </tr>

                </thead>
                <tbody>
                    {
                    empOne?.length!= 100 || isSort?empOne?.length==0?<h1>Value not found</h1>: empOne?.map((e, index) => (
                            <tr key={index}>
                                <td>{e?.logId}</td>
                                <td>{e?.applicationType}</td>
                                <td>{e?.applicationId}</td>
                                <td>{e?.actionType}</td>
                                <td>{e?.actionDetails}</td>
                                <td>{e?.creationTimestamp}</td>
                                 <td>real{index}</td>
                            </tr>

                        ))

                            : emp?.map((e, index) => (
                                <tr key={index}>
                                    <td>{e.logId}</td>
                                    <td>{e.applicationType}</td>
                                    <td>{e.applicationId}</td>
                                    <td>{e.actionType}</td>
                                    <td>{e.actionDetails}</td>
                                    <td>{e.creationTimestamp}</td>
                                    <td>'real'</td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
          { !isFilter && <Pagination postPerPage={postPerPage} totalPost={totalPost}  currentPage={currentPage} paginate={paginate} />}
        </>
    )
}
