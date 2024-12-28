import React, { useEffect, useRef, useState } from "react"
import * as Plot from "@observablehq/plot"
import axios from "axios"

const GeoConfig = ({ chartData }) => {
  const indiaRef = useRef()

  useEffect(() => {
    if (chartData) {
      const indiaMap = Plot.plot({
        projection: {
          type: "mercator", // Map projection type
          domain: chartData, // Automatically fits to GeoJSON data
        },
        marks: [
          Plot.geo(chartData, {
            stroke: "black",
            fill: "Cornsilk",
            strokeWidth: 1,
          }),
          // Plot.geo(statemesh),
          // Plot.text(
          //   geoOp,
          //   Plot.centroid({
          //     text: (d) => d.properties.name,
          //     fill: "black",
          //     stroke: "white",
          //     textAnchor: "start",
          //     marginTop: "50px",

          //   })
          // ),

          Plot.dot(
            chartData,
            Plot.geoCentroid({
              r: (d) => d.properties.tiger_population,
              fill: "orange",
              stroke: "black",
              tip: {
                clip: "frame",
                fill: "black",
                pointer: "xy",
              },
              href: "source",
              target: "blank",
              strokeWidth: 2,
              title: (d) =>
                `${d.properties.name}: ${d.properties.tiger_population} tigers`,
            })
          ),
        ],
      })

      const indiaMap2 = Plot.plot({
        projection: {
          type: "mercator", // Map projection type
          domain: chartData, // Automatically fits to GeoJSON data
          // projection: "albers-usa",
        },
        marks: [
          // Plot.geo(geoOp, {
          //   //   x: "name",
          //   //   y: "name",
          //   r: "tiger_population",
          //   stroke: "red",
          //   fill: "red",
          //   fillOpacity: 0.52,
          // }),
          // Plot.geo(geoOp, { strokeOpacity: 0.1, tip: true, title: "name" }),
          // Plot.dot(geoOp, {
          //   //   fy: "tiger_population",
          //   r: (d) =>
          //     d.properties.tiger_population > 0
          //       ? 0.001
          //       : // `rgba(255, 100, 20, ${d.properties.tiger_population / 50})`
          //         0,
          //   // "green",
          //   //   r: 1.5,
          //   fill: "orange",
          //   //   tip: true,
          //   stroke: "white", // Border color
          //   //   title: "date",
          //   //   channels: {  },
          // }),

          // Plot.geo(geoOp, {
          //   r: (d) => (d.properties.tiger_population > 0 ? 0.1 : 0.1),
          //   fill: (d) =>
          //     d.properties.tiger_population > 0
          //       ? `rgba(255, 100, 20, ${d.properties.tiger_population / 30})`
          //       : "green",
          //   title: (d) =>
          //     `${d.properties.name}: ${d.properties.tiger_population} tigers`,
          //   stroke: "white", // Border color
          // }),

          Plot.sphere(chartData, {
            r: (d) => (d.properties.tiger_population > 0 ? 1.0 : 0.1),
            fill: (d) =>
              d.properties.tiger_population > 0
                ? `rgba(255, 100, 20, ${d.properties.tiger_population / 30})`
                : "green",
            title: (d) =>
              `${d.properties.name}: ${d.properties.tiger_population} tigers`,
            stroke: "white", // Border color
          }),
        ],
      })

      indiaRef.current.appendChild(indiaMap)

      return () => {
        indiaMap.remove() // Clean up when the component unmounts
      }
    }
  }, [chartData])

  return (
    <div className="grid grid-cols-1 w-full h-full gap-4">
      <div ref={indiaRef}></div>
    </div>
  )
}

export default GeoConfig
