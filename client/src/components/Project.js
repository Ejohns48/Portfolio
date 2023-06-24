import React from 'react'
import '../css/Portfolio.css'

const Project = ({title, description, mp4Source, className}) => {
  return (
          <div className={className}>
            <h2>{title}</h2>
            <video width="360" height="240" controls={true} playsInline={true} muted={true}>
              <source src={mp4Source} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p>{description}</p>
          </div>
  )
}

export default Project
