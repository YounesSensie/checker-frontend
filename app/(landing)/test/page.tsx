"use client"
import { sendWelcomeCheckerEmail } from '@/app/actions/send-welcomingmail'
import React, { useState } from 'react'

const PageTest = () => {
  const[loading , setloading] = useState(false)
  const user = {
    firstName: "Saif",
    lastName: "Allah Lajmi",
    email: "lajmi.saif.ellah@gmail.com",
    role: "CHECKER",
  }
  const handelClick = async() => {
    try{
      setloading(true)
     await sendWelcomeCheckerEmail(user as any)
    }catch(error){

    }finally{
      setloading(false)
    }
  }
    return (
    <div className='flex p-5 mt-16'>
      <button onClick={handelClick} disabled={loading}>
        {loading ? "Loading..." : "Test Button"}
      </button>
    </div>
  )
}

export default PageTest
