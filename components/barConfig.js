import React, { useEffect, useRef } from "react"
import * as Plot from "@observablehq/plot"
import { data } from "./data"

const PlotChart = ({ chartData }) => {
  const chartRef = useRef()
  const chartRef2 = useRef()

  useEffect(() => {
    const dataOp = data

    const chart = Plot.plot({
      y: {
        type: "point",
        // grid: true,
        // label: "Temperature (°C)",
        // transform: (f) => (f - 32) * (5 / 9) // convert Fahrenheit to Celsius
      },
      style: {
        // fontSize: "32px",
        // color: "black",
        // background: "black",
      },
      marks: [
        // Plot.barY(dataOp, {
        //   // fill: "green",
        //   x: "body_mass_g",
        //   y: "flipper_length_mm",
        //   opacity: 0.6,
        // }),

        Plot.dot(chartData, {
          color: {
            // type: "diverging",
            // scheme: "BuRd",
            ticks: 5,
          },
          x: "year",
          y: "rating",
          type: "point",
          fill: "green",
          stroke: "year",
          href: "image",
          target: "_blank",
          channels: {
            image: "image",
            genre: "genre",
            rank: "rank",
          },
          tip: {
            clip: "frame",
            fill: "black",
          },
        }),
      ],
    })

    const chart2 = Plot.plot({
      // y: {
      //   // grid: true,
      //   // label: "genre",
      //   transform: (f) => f, // convert Fahrenheit to Celsius
      // },
      style: {
        // fontSize: "32px",
        // color: "black",
        // background: "black",
      },
      marks: [
        // Plot.barY(dataOp, {
        //   // fill: "green",
        //   x: "body_mass_g",
        //   y: "flipper_length_mm",
        //   opacity: 0.6,
        // }),

        Plot.dot(chartData, {
          x: "year",
          y: "genre",
          type: "point",
          fill: "green",
          stroke: "year",
          href: "image",
          target: "_blank",
          channels: {
            image: "image",
            genre: "genre",
            rank: "rank",
          },
          tip: {
            clip: "frame",
            fill: "black",
          },
        }),
      ],
    })
    // fetch("https://raw.githubusercontent.com/geohacker/india/master/district/india_district.geojson")
    // .then((response) => response.json())
    // .then((indiaGeoJSON) => {
    const indiaMap = Plot.plot({
      projection: {
        type: "mercator", // Map projection type
        domain: geoOp, // Automatically fits to GeoJSON data
      },
      marks: [
        Plot.geo(geoOp, {
          stroke: "black", // Border color
          fill: "lightblue", // Fill color for regions
        }),
      ],
    })

    // document.body.appendChild(indiaMap) // Add the map to the page

    chartRef.current.appendChild(indiaMap)
    // chartRef2.current.appendChild(chart2)

    return () => {
      chart.remove() // Clean up when the component unmounts
    }
  }, [chartData])

  return (
    <div className="grid grid-cols-1 w-full h-full gap-4">
      {/* <div ref={chartRef2}></div> */}
      <div ref={chartRef}></div>
    </div>
  )
}

export default PlotChart
