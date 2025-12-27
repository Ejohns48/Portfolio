import React, { memo } from 'react'
import Project from '../components/Project'
import { useCMS } from '../context/CMSContext';

// Default projects fallback
const defaultProjects = [
  { id: 1, className: 'project-box project-box-left', title: 'Capstone Project', description: 'Final project for my senior year of college.', videoSource: '../media/videos/sample.mp4' },
  { id: 2, className: 'project-box project-box-middle', title: 'Epic Website', description: 'Project for updating a mock school website.', videoSource: '../media/videos/bgmov.mp4' },
  { id: 3, className: 'project-box project-box-right', title: 'Epic Website', description: 'Project for updating a mock school website.', videoSource: '../media/videos/bgmov.mp4' },
  { id: 4, className: 'project-box project-box-left2', title: 'Capstone Project', description: 'Final project for my senior year of college.', videoSource: '../media/videos/sample.mp4' },
  { id: 5, className: 'project-box project-box-middle2', title: 'Epic Website', description: 'Project for updating a mock school website.', videoSource: '../media/videos/bgmov.mp4' },
  { id: 6, className: 'project-box project-box-right2', title: 'Epic Website', description: 'Project for updating a mock school website.', videoSource: '../media/videos/bgmov.mp4' }
];

const Portfolio = memo(() => {
  const { content, isLoading } = useCMS();
  
  const projects = content?.projects || defaultProjects;

  if (isLoading) {
    return <div className='project-container'>Loading projects...</div>;
  }

  return (
    <div className='project-container'>
      {projects.map((project) => (
        <Project 
          key={project.id}
          className={project.className}
          title={project.title}
          description={project.description}
          mp4Source={project.videoSource}
        />
      ))}
    </div>
  )
});

Portfolio.displayName = 'Portfolio';

export default Portfolio