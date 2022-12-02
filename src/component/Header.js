import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import './Header.css'

export default function Header({ emp, setEmpOne, setSort, empOne, setIsFilter, setEmp, setCurrentPage }) {
  const [empValue, setEmpValue] = useState([]);
  const [actionType, setActionType] = useState('');
  const [applicationType, setApplicationType] = useState('');
  const [applicationId, setApplicationId] = useState('');
  const [emp2, setEmp2Value] = useState([])
  const [fdate, setfdate] = useState('');
  const [tdate, settdate] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()



  useEffect(() => {

    if (searchParams?.has('actionType')) {
      setActionType(searchParams?.get('actionType'))
    }
    if (searchParams?.has('applicationType')) {
      setApplicationType(searchParams?.get('applicationType'))
    }
    if (searchParams?.has('applicationId')) {
      setApplicationId(searchParams?.get('applicationId'))
    }
    if (searchParams?.has('startDate') && searchParams?.has('endDate')) {
      setfdate(searchParams?.get('startDate'))
      settdate(searchParams?.get('endDate'))
    }
    changeUrlParams()

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
    const emp3 = [];
    const response = {};
    for (let i = 0; i < emp?.length; i++) {
      if (response[emp[i].applicationType]) {
        continue
      } else {
        emp3.push(emp[i]);
        response[emp[i].applicationType] = 1;
      }
    }
    emp3.unshift(null)
    setEmp2Value(emp3)

  }, [emp])

  const searchApplicationId = (e) => {
    setApplicationId(e.target.value)
  }



  const searchApplicationType = (e) => {
    setApplicationType(e.target.value)

  }
  const searchActionType = (e) => {
    setActionType(e.target.value)

  }

  const searchFromDate = (e) => {

    setfdate(e.target.value)

  }

  const searchToDate = (e) => {
    settdate(e.target.value)
  }


  const handleclick = () => {

    let data = new Object();
    let selectedFilter = [];
    if (actionType != "") {
      setIsFilter(true)
      selectedFilter["actionType"] = actionType;
    }
    if (applicationType != "") {
      setIsFilter(true)
      selectedFilter["applicationType"] = applicationType;
    }
    if (fdate != "" && fdate != "Invalid Date") {
      setIsFilter(true)
      selectedFilter["fdate"] = fdate;
    }
    if (tdate != "" && tdate != "Invalid Date") {
      setIsFilter(true)
      selectedFilter["tdate"] = tdate;
    }

    if (applicationId != "") {
      setIsFilter(true)
      selectedFilter["applicationId"] = applicationId;
    }

    data = emp?.filter((item) => {
      let formLength = 0;
      let matchItem = 0;
      for (let key in selectedFilter) {

        if (selectedFilter[key]) {
          formLength++;

          if (isNaN(selectedFilter[key])) {
            if (item[key]) {
              if ((item[key].toLowerCase()).toString().includes(selectedFilter[key].toLowerCase())) {
                matchItem++;
              }
            }

          }
          else {
            if (item[key]) {
              if ((item[key]).toString().includes(selectedFilter[key])) {
                matchItem++;
              }
            }

          }
          if (key === "fdate" || key === 'tdate') {
            let newDate = getNewDate(item['creationTimestamp']);
            let start_date = selectedFilter['fdate'];
            let end_date = selectedFilter['tdate'];

            if (start_date && end_date) {
              if (newDate >= start_date && newDate <= end_date) {
                matchItem++;
              }
            }
            else if (start_date) {
              if ((item["creationTimestamp"].toLowerCase()).toString().includes(start_date)) {
                matchItem++
              }

            }

          }
        }
      }
      if (matchItem === formLength) {
        return item;
      }
});
    setEmpOne(data)
    setCurrentPage(1)
  }


  const changeUrlParams = () => {
    let selectedFilter = {};
    if (actionType != "") {
      selectedFilter["actionType"] = actionType;

    }
    if (applicationType != "") {
      selectedFilter["applicationType"] = applicationType;
    }
    if (fdate != "" && fdate != "Invalid Date") {
      selectedFilter["startDate"] = fdate;
    }
    if (tdate != "" && tdate != "Invalid Date") {
      selectedFilter["endDate"] = tdate;
    }
    if (applicationId != "") {
      selectedFilter["applicationId"] = applicationId;
    }

    let urlparam = "?";

    for (let [key, value] of Object.entries(selectedFilter)) {

      if (value) {
        if (urlparam.length === 1 && urlparam === '?')
          urlparam = urlparam + key + "=" + value;
        else
          urlparam = urlparam + '&' + key + "=" + value;
      }
    }

    handleclick()
    navigate('' + urlparam)

  }


  const getNewDate = (dt) => {
    let date = new Date(dt);
    let month = parseInt(date.getMonth()) + parseInt(1);
    month = `${month}`.length == 1 ? `0${month}` : month
    let newDt = date.getFullYear() + '-' + month + "-" + date.getDate();
    return newDt;
  }

  return (

    <div className="header">

      <div>
        <span>Action type</span>
        <select
          name="actionType"
          placeholder="select action type"
          value={actionType}
          onChange={(e) => searchActionType(e)}>{
            empValue?.map((em, index) => {
              return <option key={`${em?.logId}`}>
                {em?.actionType}
              </option>
            })
          }</select>
      </div>
      <div>
        <span>Application type</span>
        <select
          placeholder='select application type'
          name="applicationType"
          value={applicationType}
          onChange={(e) => searchApplicationType(e)}>{
            emp2?.map(e => {
              return <option key={`${e?.logId}`}>
                {e?.applicationType}
              </option>
            })
          }</select>
      </div>
      <div>
        <span>From Date</span>
        <input type="date" value={fdate} placeholder='YYYY-MM-DD' data-testid='startdate' onChange={(e) => searchFromDate(e)} />
      </div>
      <div>
        <span>To Date</span>
        <input type="date" value={tdate} placeholder='YYYY-MM-DD' data-id='enddate' onChange={(e) => searchToDate(e)} />
      </div>
      <div>
        <span>Application ID</span>
        <input placeholder='e.g. 219841/2021' value={applicationId} name="applicationId" onChange={(e) => searchApplicationId(e)} />
      </div>
      <div>
        <button type="button" className="button" data-testid="search" onClick={() => changeUrlParams()} >Search Logger</button>

      </div>
      <div>
        <button
          className="buttonRemove"
          data-testid="remove"
          onClick={() => {
            setEmpOne(emp)
            navigate("/")
            setSort(false)
            setActionType("")
            setApplicationType("");
            setApplicationId("")
            setfdate("");
            settdate("")
            setIsFilter(false)
          }}>remove filter</button>
      </div>
    </div>
  )
}