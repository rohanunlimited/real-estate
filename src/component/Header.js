import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import './Header.css'

export default function Header({ setSearch,  emp, setStartDate, setEndDate}) {
    const [empValue, setEmpValue] = useState([]);
    const [actionType, setActionType] = useState('');
    const [applicationType, setApplicationType] = useState('');
    const [applicationId, setApplicationId] = useState('');
    const [emp2, setEmp2Value] = useState([])
    const [fdate, setfdate] = useState('');
    const [tdate, settdate] = useState('')
    
    const navigate = useNavigate()







    useEffect(() => {

        const emp2 = [];
        const res = {};
        for (let i = 0; i < emp?.length; i++) {
            if (res[emp[i].actionType]) {
                continue
            } else {
                emp2.push(emp[i]);
                res[emp[i].actionType] = 1;
            }
        }
        emp2.unshift(null)
        setEmpValue(emp2)

    }, [emp])
    useEffect(() => {

        const emp2 = [];
        const res = {};
        for (let i = 0; i < emp?.length; i++) {
            if (res[emp[i].applicationType]) {
                continue
            } else {
                emp2.push(emp[i]);
                res[emp[i].applicationType] = 1;
            }
        }
        emp2.unshift(null)
        setEmp2Value(emp2)

    }, [emp])

    const searchApplicationId = (e) => {
        setApplicationId(e.target.value)
        setActionType('');
        setApplicationType('');
        setStartDate('');
        setEndDate('');

        navigate("/?applicationId=" + e.target.value)

    }



    const searchApplicationType = (e) => {

        setApplicationType(e.target.value)
        setActionType('')
        setApplicationId('')
        setStartDate('')
        setEndDate('')
        navigate("/?applicationType=" + e.target.value)

    }
    const searchActionType = (e) => {
        setActionType(e.target.value)
        setApplicationType('');
        setApplicationId('');
        setStartDate('');
        setEndDate('');
        navigate("/?actionType=" + e.target.value)


    }

    const searchFromDate = (e) => {
        setActionType('');
        setApplicationType('');
        setApplicationId('');
        const y = `${e.target.value}`.split("-")[0];
        const m = `${e.target.value}`.split("-")[2];
        const d = `${e.target.value}`.split("-")[1];

        navigate("/?startDate=" + `${d}-${m}-${y}` + "/?endDate=" + tdate)
        setfdate(`${d}-${m}-${y}`)

    }

    const searchToDate = (e) => {
        setActionType('');
        setApplicationType('');
        setApplicationId('');
        const y = `${e.target.value}`.split("-")[0];
        const m = `${e.target.value}`.split("-")[2];
        const d = `${e.target.value}`.split("-")[1];
        navigate("/?startDate=" + fdate + "/?endDate=" + `${d}-${m}-${y}`)
        settdate(`${d}-${m}-${y}`)
    }


    const handleclick = () => {

        if (actionType) {

            setSearch({ 'actionType': actionType })

        }
        else if (applicationType) {
            setActionType('')
            setSearch({ 'applicationType': applicationType })
        } else if (applicationId) {
            setSearch({ 'applicationId': applicationId })
        } else if (fdate && tdate) {
            setStartDate(fdate);
            setEndDate(tdate)

        }


    }
    return (

        <div className="header">

            <div>
                <span>Action type</span>
                <select
                    name="actionType"
                    defaultValue={actionType}
                    placeholder="select action type"

                    onClick={(e) => searchActionType(e)}>{

                        empValue?.map((em, index) => {
                            return <option key={index}>
                                {em?.actionType}
                            </option>
                        })
                    }</select>
            </div>
            <div>
                <span>Application type</span>
                <select
                    placeholder='select application type'
                    defaultValue={applicationType}
                    name="applicationType"

                    onClick={(e) => searchApplicationType(e)}>{
                        emp2?.map(e => {
                            return <option key={e?.applicationId}>
                                {e?.applicationType}
                            </option>
                        })
                    }</select>
            </div>
            <div>
                <span>From Date</span>
                <input type="date" placeholder='YYYY-MM-DD' data-testid='startdate' onChange={(e) => searchFromDate(e)} />
            </div>
            <div>
                <span>To Date</span>
                <input type="date" placeholder='YYYY-MM-DD' data-id='enddate' onChange={(e) => searchToDate(e)} />
            </div>
            <div>
                <span>Application ID</span>
                <input placeholder='e.g. 219841/2021' name="applicationId" onChange={(e) => searchApplicationId(e)} />
            </div>
            <div>
                <button type="button" className="button" data-testid="search" onClick={() => handleclick()} >Search Logger</button>

            </div>
            <div>
                <button
                    data-testid="remove"
                    onClick={() => {
                        setSearch({})
                        navigate("/")
                        setActionType("")
                        setApplicationType("");
                        setApplicationId("")
                        setfdate("");
                        settdate("")
                        window.location.reload()
                    }}>remove filter</button>
            </div>
        </div>
    )
}