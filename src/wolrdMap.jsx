import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import { useNavigate } from "react-router-dom";

export default function WorldMap() {
  const svgRef = useRef();
  const navigate = useNavigate();

  const tooltipRef = useRef();
  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("width", "100%")
      .attr("height", "100%");

    const projection = d3.geoNaturalEarth1()
      .scale(width / 1.3 / Math.PI)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath(projection);

    d3.json("https://unpkg.com/world-atlas@2.0.2/countries-110m.json").then((topology) => {
      const countries = feature(topology, topology.objects.countries);

      svg.selectAll("path")
        .data(countries.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#ccc")
        .attr("stroke", "#333")
        .on("mouseover",function (event,d){
          d3.select(this).attr("fill","#037ef3");
          
          d3.select(tooltipRef.current)
            .style("opacity",1)
            .html(d.properties.name || d.id);
        })
        .on("mousemove",function(event){
          d3.select(tooltipRef.current)
            .style("left", `${event.pageX + 10}px`)
            .style("top",`${event.pageY + 10}px`);
        })
        .on("mouseout",function (){
          d3.select(this).attr("fill","#ccc");
          d3.select(tooltipRef.current).style("opacity",0);

        })
        .on("click", function(event,d) {
          navigate(`/aim/${d.properties.name}`);
        } )
    });
  }, [navigate]);

  return (
    <div className="w-screen h-screen">
      <svg ref={svgRef} className="w-full h-full" />

      <div
        ref={tooltipRef}
        className="pointer-events-none fixed z-50 px-2 py-1 bg-black text-white text-sm rounded shadow transition-opacity duration-150"
        style={{opacity:0 , left:0, top:0}}
      ></div>


    </div>
  );
}
