"use client"

import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/navigation'
import OrderController from '@/app/controllers/OrderController'
export default function OrderDetails({params}) {


  useEffect(()=>{
    const controller = new OrderController();
    const {error}= controller.fetchSingleOrder(params.id).then((data)=>{
      console.log(data)
    })
  })
  return (
    <div className='px-6' >
      <h1 className='text-3xl font-bold'>Order Details</h1>
        
    </div>
    
  )
}
