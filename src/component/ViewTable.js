
import React, { useEffect, useState } from 'react'
import {AiOutlineArrowUp} from 'react-icons/ai'
import {AiOutlineArrowDown} from 'react-icons/ai'

export default function ViewTable({emp,search,startDate, endDate, isSearch}) {
  const [empone , setEmpone] = useState([{id:'1'}])
  const [isTrue, setIsTrue] = useState(false)
 
  useEffect(()=>{
  
   const em = emp?.filter(e =>  `${e?.applicationId}`.includes(search)||`${e?.applicationType}`.includes(search)|| `${e?.actionType}`.includes(search))
   
   setEmpone(em)
  
    
  },[search])

  useEffect(()=>{
    const startYear = `${startDate}`.split('-')[0];
    const endYear = `${endDate}`.split('-')[0];
    const startDay = `${startDate}`.split('-')[1];
    const endDay = `${endDate}`.split('-')[1];
    const startMonth = `${startDate}`.split('-')[2];
    const endMonth = `${endDate}`.split('-')[2];
    
    if(isSearch){
  const em = emp?.filter(e=> {
    if(`${e.creationTimestamp}`.split('-')[0]>= startYear && `${e.creationTimestamp}`.split('-')[0]<= endYear && startYear != endYear){
      return true
    }
    else if(`${e.creationTimestamp}`.split('-')[1]>= startDay && `${e.creationTimestamp}`.split('-')[1]<= endDay && startDay != endDay){
      return true
    }
    else if(`${e.creationTimestamp}`.split('-')[2]>= startMonth && `${e.creationTimestamp}`.split('-')[2]<= endMonth && startMonth != endMonth){
      return true
    }

  
  })

  setEmpone(em)
    }
  },[startDate,endDate])

  const sortArray = (a)=>{
    setIsTrue(!isTrue);
    let e =[]
    
      if(isTrue){
        if(a =="logId")
        e =  emp.sort((a,b)=> b.logId - a.logId)
        setEmpone(e)
      }else {
        e= emp.sort((a,b)=> a.logId - b.logId)
        setEmpone(e)
      }
      
      if(a=="applicationType" && isTrue){
        e= emp.sort((a,b)=> a.applicationType > b.applicationType? -1: 1)
        setEmpone(e)
      }else {
        e = emp.sort((a,b)=> a.applicationType > b.applicationType ? 1: -1)
  setEmpone(e)
      }

      if(a=="applicationId" && isTrue){
        e = emp.      sort((a,b)=> b.applicationId - a.applicationId)
        setEmpone(e)
      }else {
        e= emp.sort((a,b)=>a.applicationId -b.applicationId)
        setEmpone(e)
      }
      if(a=="actionType" && isTrue) {
        e=emp.sort((a,b)=> a.actionType > b.actionType? -1: 1)
        setEmpone(e)
      }else {
        e = emp.sort((a,b)=> a.actionType > b.actionType? 1: -1)
        setEmpone(e)
      }

      if(a=="Date:Time" && isTrue){
        e=emp.sort((a,b)=> b.creationTimestamp - a.creationTimestamp)
        setEmpone(e)
      }else {
        e= emp.sort((a,b)=> a.creationTimestamp - b.creationTimestamp)
        setEmpone(e)
      }
    
  }
  return (

        <table cellPadding="10">
        <thead>
          <tr>
            <th onClick={()=>sortArray('logId')}>Log ID{!isTrue ?<AiOutlineArrowDown/>:<AiOutlineArrowUp/>}</th>
          <th onClick={()=> sortArray('applicationType')}>Application Type {!isTrue? <AiOutlineArrowDown/>:<AiOutlineArrowUp/>}</th>
            <th onClick={()=> sortArray('applicationId')}>Application ID {!isTrue? <AiOutlineArrowDown/>:<AiOutlineArrowUp/>}</th>
            <th onClick={()=> sortArray('actionType')}>Action {!isTrue? <AiOutlineArrowDown/>:<AiOutlineArrowUp/>}</th>
            <th>Action Details{!isTrue? <AiOutlineArrowDown/>:<AiOutlineArrowUp/>}</th>
            <th onClick={()=> sortArray("Date:Time")}>Date:Time{!isTrue? <AiOutlineArrowDown/>:<AiOutlineArrowUp/>}</th>
          </tr>
        </thead>
        <tbody>
       {
       empone?.length >0?
       empone?.map(e=>{
        return <tr key={e.logId}>
          <td key={e.applicationId}>{e.logId}</td>
          <td key={e.applicationId}>{e.applicationType}</td>
          <td key={e.applicationId}>{e.applicationId}</td>
          <td key={e.applicationId}>{e.actionType}</td>
          <td key={e.applicationId}>{e.actionDetails}</td>
          <td key={e.applicationId}>{e.creationTimestamp}</td>
        </tr>
       })
       : emp?.map(e=>{
            return <tr key={e.logId}>
                <td key={e.applicationId}>{e.logId}</td>
                <td key={e.applicationId}>{e.applicationType}</td>
                <td key={e.applicationId}>{e.applicationId}</td>
                <td key={e.applicationId}>{e.actionType}</td>
                <td key={e.applicationId}>{e.actionDetails}</td>
                <td key={e.applicationId}>{e.creationTimestamp}</td>
            </tr>
        })
       }
         
        </tbody>
      </table>
      )
    
}
