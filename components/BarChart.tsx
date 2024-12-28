"use client"

// import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import PlotChart from "./barConfig"
import axios from "axios"

type Props = {
  classNamsse: "string"
}

const BarChart = (props: Props) => {
  const [data, setData] = useState([])
  // http://api.openweathermap.org/data/2.5/air_pollution/history?lat=508&lon=50&start=1606223802&end=1606482999&appid={API key}
  // http://api.openweathermap.org/data/2.5/air_pollution/history?lat={lat}&lon={lon}&start={start}&end={end}&appid={API key}
  const firstCall = async () => {
    const options = {
      method: "GET",
      url: "https://search.worldbank.org/api/v3/wds?format=json&qterm=wind%20turbine&fl=docdt,count",
      // url: "https://imdb-top-100-movies.p.rapidapi.com/",
      headers: {
        "Content-Type": "application/json",
      },
    }

    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/geohacker/india/master/district/india_district.geojson"
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // }
      )
      setData(response?.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    firstCall()
  }, [])
  return (
    <div>
      <h1>My Vega-Lite Chart</h1>
      <PlotChart chartData={data} />
      <h1 className="bg-red-800">Bar Chart {props.classNamsse} </h1>
    </div>
  )
}

export default BarChart
