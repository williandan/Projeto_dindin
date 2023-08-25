import React from "react";
import "./logo.css"
import polygon from "../imgs/polygon.png"

export default function Logo() {
  return (
    <div className="logo" >
      <div className="polygon">
        <img src={polygon} className="polygon" alt="polygon" />
      </div>
      <h1>DinDin</h1>
    </div>
  )
}
