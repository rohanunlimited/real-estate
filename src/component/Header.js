import React, { useEffect, useState } from 'react'
import './Header.css'

export default function Header({setSearch,emp, setStartDate, setEndDate,setIsSearch}) {
  

  const searchApplicationId = (e)=>{
    setIsSearch(false)
      setSearch(e.target.value)
  }

  const searchEmployeeName = (e)=>{
    setIsSearch(false)
    setSearch(e.target.value)
  }

  const searchApplicationType = (e)=>{

   setSearch(e.target.value)
  }
  const searchActionType = (e)=>{

    setSearch(e.target.value)
  }

  const searchFromDate = (e)=>{
    
    setStartDate(e.target.value)
  }

  const searchToDate = (e)=>{
   
    setEndDate(e.target.value)
  }

  const handleclick = ()=>{
    setIsSearch(true)
  
  }
  return (
    <div  className="header">
    <div>
    <span>Employee Name</span>
    <input placeholder='e.g. Admin User' onChange={()=> searchEmployeeName()}/>
    </div>
    <div>
    <span>Action type</span>
    <select defaultValue={null}
    placeholder="select action type"
    onClick={(e)=> searchActionType(e)}>{
      emp?.map(em=>{
        return <option key={em.logId}>
          {em.actionType}
        </option>
      })
      }</select>
    </div>
    <div>
    <span>Application type</span>
    <select 
    placeholder='select application type'
    onClick={(e)=> searchApplicationType(e)}>{
      emp?.map(e=>{
        return <option key={e.logId}>
          {e.applicationType}
        </option>
      })
      }</select>
    </div>
    <div>
    <span>From Date</span>
    <input placeholder='YYYY-MM-DD' onChange={(e)=> searchFromDate(e)}/>
    </div>
    <div>
    <span>To Date</span>
    <input placeholder='YYYY-MM-DD' onChange={(e)=> searchToDate(e)}  />
    </div>
    <div>
    <span>Application ID</span>
    <input placeholder='e.g. 219841/2021'  onChange={(e)=> searchApplicationId(e)}/>
    </div>
    <div>
        <input type="button" className="button" value="Search Logger" onClick={()=> handleclick()}/>
    </div>
    </div>
  )
}
