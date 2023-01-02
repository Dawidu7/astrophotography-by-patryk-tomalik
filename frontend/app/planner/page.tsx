'use client'

import { use, useState } from 'react'


const getData = async () => await fetch(`${process.env.BACKEND_URL}/planner/`)

const Planner = () => {
  return (
    <div>Planner</div>
  )
}

export default Planner