import React, { memo } from 'react'
import '../css/Portfolio.css'

const Project = memo(({ title, description, mp4Source, className }) => {
  return (
          <div className={className}>
            <h2>{title}</h2>
            <video 
              className="project-video"
              controls={true} 
              playsInline={true} 
              muted={true}
              preload="none"
              poster=""
              // Responsive video - width/height handled by CSS
              style={{ width: '100%', maxWidth: '360px', height: 'auto' }}
            >
              <source src={mp4Source} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p>{description}</p>
          </div>
  )
});

Project.displayName = 'Project';

export default Project
