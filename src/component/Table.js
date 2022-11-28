import React, { useEffect, useRef, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router-dom'

import { AiOutlineArrowUp } from 'react-icons/ai'
import { AiOutlineArrowDown } from 'react-icons/ai'

export default function Table({ emp, loading, log }) {
    const [search, setSearch] = useState({});
    const [empone, setEmpOne] = useState([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [sortLogId, setSortLogId] = useState('');
    const [applicationsortId, setApplicationSortId] = useState('');
    const [applicationTypeSort, setApplicationTypeSort] = useState('');
    const [sortActionType, setSortActionType] = useState('');
    const [dateSort, setDateSort] = useState(false);

    useEffect(() => {
        const startYear = `${startDate}`.split('-')[0];
        const endYear = `${endDate}`.split('-')[0];
        const startDay = `${startDate}`.split('-')[1];
        const endDay = `${endDate}`.split('-')[1];
        const startMonth = `${startDate}`.split('-')[2];
        const endMonth = `${endDate}`.split('-')[2];


        const em = emp?.filter(e => {
            if (`${e.creationTimestamp}`.split('-')[0] >= startYear && `${e.creationTimestamp}`.split('-')[0] <= endYear && startYear != endYear) {
                return true
            }
            else if (`${e.creationTimestamp}`.split('-')[1] >= startDay && `${e.creationTimestamp}`.split('-')[1] <= endDay && startDay != endDay) {
                return true
            }
            else if (`${e.creationTimestamp}`.split('-')[2] >= startMonth && `${e.creationTimestamp}`.split('-')[2] <= endMonth && startMonth != endMonth) {
                return true
            }


        })

        setEmpOne(em)

    }, [startDate, endDate])





    useEffect(() => {
        setSearch({})
    }, [emp, loading])

    useEffect(() => {
       
        const emp1 = emp.filter(e => {
            if (Object.keys(search)[0] == 'actionType') {
                if(e.actionType.includes(search.actionType)){
                return e.actionType.includes(search.actionType)
                }
            }
            else if (Object.keys(search)[0] == "applicationType") {
                return e?.applicationType?.includes(search.applicationType)
            } else if (Object.keys(search)[0] == "applicationId") {
                return `${e?.applicationId}`.includes(`${search.applicationId}`)
            }
        })


        setEmpOne([...emp1])
    }, [search])

    const sortLogById = () => {
        let em = []
        if (sortLogId) {
            em = emp.sort((a, b) => b.logId - a.logId)
        } else {
            em = emp.sort((a, b) => a.logId - b.logId)
        }
        setEmpOne(em)
    }

    const applicationIdSort = () => {
        let em = []
        if (applicationsortId) {
            em = emp.sort((a, b) => b.applicationId - a.applicationId)
        } else {
            em = emp.sort((a, b) => a.applicationId - b.applicationId)
        }
        setEmpOne(em)
    }


    const applicationTypeBySort = () => {
        let em = []
        if (applicationTypeSort) {
            em = emp.sort()
        } else {
            em = emp.reverse()
        }
        setEmpOne(em)
    }

    const actionTypeSort = () => {
        let em = [];
        if (sortActionType) {
            em = emp.sort()
        } else {
            em = emp.reverse()
        }
        setEmpOne(em)
    }

    const dateBySort = () => {
        let em = [];
        if (dateSort) {
            em = emp.sort()
        } else {
            em = emp.reverse()
        }

    }

    return (
        <>
            <Header emp={log} setSearch={setSearch} setStartDate={setStartDate} setEndDate={setEndDate} />
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
                                setApplicationSortId(!applicationsortId)
                                applicationIdSort()
                            }}
                        >Application ID {applicationsortId ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}</th>
                        <th
                            onClick={() => {
                                setSortActionType(!sortActionType)
                                actionTypeSort()
                            }}

                        >Action{sortActionType ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}</th>
                        <th>Action Details</th>
                        <th
                            onClick={() => {
                                setDateSort(!dateSort);
                                setTimeout(() => dateBySort(), 0)
                            }}
                        >Date:Time sort{dateSort ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}</th>
                    </tr>

                </thead>
                <tbody>
                    {
                        empone?.length ? empone?.map((e, index) => (
                            <tr key={index}>
                                <td>{e?.logId}</td>
                                <td>{e?.applicationType}</td>
                                <td>{e?.applicationId}</td>
                                <td>{e?.actionType}</td>
                                <td>{e?.actionDetails}</td>
                                <td>{e?.creationTimestamp}</td>

                            </tr>

                        )) : emp.map((e, index) => (
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
        </>
    )
}
