"use client"

// import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import GeoConfig from "./geoConfig"
import axios from "axios"

type Props = {
  classNamsse: "string"
}

const Geochart = (props: Props) => {
  const [data, setData] = useState([])
  const [geoData, setGeoData] = useState()

  const getGeoData = async () => {
    try {
      const dataApi = await axios.get(
        "https://gist.githubusercontent.com/lifeanubis/1572a9fec699fb530a922d3fb1f231c9/raw/d742cfdd26225be75745a4ebb668eec3aeede975/india_json"
      )
      setGeoData(dataApi.data)
    } catch (error) {
      console.log(error, "-----")
    }
  }

  const firstCall = async () => {
    const options = {
      method: "GET",
      url: "https://search.worldbank.org/api/v3/wds?format=json&qterm=wind%20turbine&fl=docdt,count",
      headers: {
        "Content-Type": "application/json",
      },
    }

    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/geohacker/india/master/district/india_district.geojson"
      )
      setData(response?.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    // firstCall()
    getGeoData()
  }, [])
  return (
    <div>
      <h1>My Vega-Lite Chart</h1>
      <GeoConfig chartData={geoData} />
      <h1 className="bg-red-800">Bar Chart {props.classNamsse} </h1>
    </div>
  )
}

export default Geochart
