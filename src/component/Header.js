import React, { useEffect, useRef, useState } from 'react'
import './Header.css'

export default function Header({ setSearch, emp, setStartDate, setEndDate, setIsSearch }) {
    const [empValue, setEmpValue] = useState([]);
    const [actionType, setActionType] = useState('');
    const [applicationType, setApplicationType] = useState('');
    const [applicationId, setApplicationId] = useState('');
    const [emp2, setEmp2Value] = useState([])
    const [fdate, setfdate] = useState('');
    const [tdate, settdate] = useState('')
    const myparams = useRef();
    myparams.current = new URLSearchParams(window.location.search);

    useEffect(() => {
        if (myparams.current) {
            if (myparams.current.has('actionType')) {

                setActionType(myparams.current.get('actionType').replaceAll('"', ''))
            }
            else if (myparams.current.has('applicationType')) {

                setApplicationType(myparams.current.get('applicationType').replaceAll('"', ''))
            }
            else if (myparams.current.has('applicationId')) {
                setApplicationId(myparams.current.get('applicationId').replaceAll('"', ''))
            }
            else if (myparams.current.has('startDate') && myparams.current.has('endDate')) {
                setfdate(myparams.current.get('startDate'))
                settdate(myparams.current.get('endDate'))
                
            }
        }
    }, [])


    useEffect(() => {   

        const emp2 = [];
        const res = {};
        for (let i = 0; i < emp.length; i++) {
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
        for (let i = 0; i < emp.length; i++) {
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
        myparams.current = {}


    }



    const searchApplicationType = (e) => {

        setApplicationType(e.target.value)
        setActionType('')
        setApplicationId('')
        setStartDate('')
        setEndDate('')
        myparams.current = {}
    }
    const searchActionType = (e) => {
        setActionType(e.target.value)
        setApplicationType('');
        setApplicationId('');
        setStartDate('');
        setEndDate('');
        myparams.current = {}
    }

    const searchFromDate = (e) => {
        setActionType('');
        setApplicationType('');
        setApplicationId('');
        setEndDate('');
        setfdate(e.target.value)
    }

    const searchToDate = (e) => {
        setActionType('');
        setApplicationType('');
        setApplicationId('');
        setStartDate('');
        settdate(e.target.value)
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
        } else if (fdate) {
            setStartDate(fdate)
        } else if (tdate) {
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

                        empValue?.map(em => {
                            return <option key={em?.logId}>
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
                            return <option key={e?.logId}>
                                {e?.applicationType}
                            </option>
                        })
                    }</select>
            </div>
            <div>
                <span>From Date</span>
                <input placeholder='YYYY-MM-DD' onChange={(e) => searchFromDate(e)} />
            </div>
            <div>
                <span>To Date</span>
                <input placeholder='YYYY-MM-DD' onChange={(e) => searchToDate(e)} />
            </div>
            <div>
                <span>Application ID</span>
                <input placeholder='e.g. 219841/2021' name="applicationId" onChange={(e) => searchApplicationId(e)} />
            </div>
            <div>
                <input type="button" className="button" value="Search Logger" onClick={() => handleclick()} />
            </div>
        </div>
    )
}