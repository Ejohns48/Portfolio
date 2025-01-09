import React from 'react'
import Project from '../components/Project'
const Portfolio = () => {
  return (
    <div className='project-container'>
      <Project 
        className='project-box project-box-left'
        title="Capstone Project"
        description="Final project for my senior year of college."
        mp4Source="../media/videos/sample.mp4"
      />
      <Project 
        className='project-box project-box-middle'
        title="Epic Website"
        description="Project for updating a mock school website."
        mp4Source="../media/videos/bgmov.mp4"
      />
      <Project 
        className='project-box project-box-right'
        title="Epic Website"
        description="Project for updating a mock school website."
        mp4Source="../media/videos/bgmov.mp4"
      />
      <Project 
        className='project-box project-box-left2'
        title="Capstone Project"
        description="Final project for my senior year of college."
        mp4Source="../media/videos/sample.mp4"
      />
      <Project 
        className='project-box project-box-middle2'
        title="Epic Website"
        description="Project for updating a mock school website."
        mp4Source="../media/videos/bgmov.mp4"
      />
      <Project 
        className='project-box project-box-right2'
        title="Epic Website"
        description="Project for updating a mock school website."
        mp4Source="../media/videos/bgmov.mp4"
      />
    </div>
  )
}

export default Portfolio