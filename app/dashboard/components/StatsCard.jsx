import React from 'react'
import { Card, CardHeader, CardBody, CardFooter,Button } from "@nextui-org/react";
import ArrowIcon from "../../icons/ArrowIcon"

const StatCard = ({ title, month, percentage, statistic,icon }) => {
  return (
    <Card className='hover:bg-orange-500 cursor-pointer'>
      <CardHeader className="flex flex-col gap-1 justify-start items-start">
        <div className=" w-full flex justify-between">
          <h1 className="text-xl">{title}</h1>
          <div>{icon}</div>
        </div>
        <h2 className="text-right text-lg text-default-500">{month}</h2>
        <small className="text-default-400">{`${percentage}%`}</small>
      </CardHeader>
      <CardBody>
        <h1 className="text-2xl font-bold">{statistic}</h1>
      </CardBody>
      <CardFooter>
        <Button variant='ghost' endContent={<ArrowIcon/>}>View Details</Button>
      </CardFooter>
    </Card>
  )
}

export default StatCard