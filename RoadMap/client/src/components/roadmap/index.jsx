import React from 'react';
import { Container, Box, Typography, Card, CardContent, CardActions, Button, LinearProgress } from '@mui/material';
import Feedback from '../FeedBack';

const roadmaps = [
  {
    title: 'Full Stack Developer',
    description: 'Learn the basics of HTML, CSS, and JavaScript and build your first web project.',
    progress: 70,
    link: "http://localhost:3000/roadmap/1?role=Full%20Stack%20Developer"
  },
  {
    title: 'Machine Learning Engineer',
    description: 'An introduction to data science with Python, covering data analysis and machine learning.',
    progress: 40,
    link: "http://localhost:3000/roadmap/2?role="+'Machine Learning Engineer'
  },
  {
    title: 'Backend Developer at MicroSoft',
    description: 'Start building scalable and robust backend applications in Microsoft.',
    progress: 90,
    link: "http://localhost:3000/roadmap/3?role="+'Backend Developer at MicroSoft'
  }
];

const RoadmapCard = ({ title, description, progress, link }) => {
  const handleContinueLearning = () => {
    window.location.href = link;
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" color="primary" onClick={handleContinueLearning}>Continue Learning</Button>
        <Button size="small" variant="contained" color="secondary">Archive</Button>
        <Button size="small" variant="contained" color="error">Un-enroll</Button>
        <div style={{ marginLeft: '280px', marginBottom: '5px' }}>
        <Feedback />
        </div>
      </CardActions>
    </Card>
  );
};

const RoadmapList = () => {
  return (
    <Container>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h3" component="h3" gutterBottom>
          My Roadmaps
        </Typography>
        <img src="https://aelaschool.com/wp-content/uploads/2023/03/s-para-designers-como-se-destacar-na-profissao-2000-995x520png_7f978937ea42896b62df171f17e5c7fb_2000.png" alt="Roadmap Graphic" style={{ maxWidth: '100%', height: 'auto' }} />
      </Box>
      {roadmaps.map((roadmap, index) => (
        <RoadmapCard 
          key={index} 
          title={roadmap.title} 
          description={roadmap.description} 
          progress={roadmap.progress} 
          link={roadmap.link}
        />
      ))}
    </Container>
  );
};

export default RoadmapList;
