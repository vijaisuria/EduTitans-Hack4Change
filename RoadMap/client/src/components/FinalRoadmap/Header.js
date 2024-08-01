import React from "react";
import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Breadcrumbs,
  Link,
  Stack,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const HorizontalLinearAlternativeLabelStepper = ({ steps }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

const RoadmapHeader = ({ role, steps }) => {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Home
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/roadmaps">
      Roadmaps
    </Link>,
    <Typography key="3" color="text.primary">
      {role}
    </Typography>,
  ];

  return (
    <Container>
      <Box sx={{ textAlign: "center", my: 4 }}>
        <img
          src="/EduConnect.png"
          alt="Company Logo"
          style={{ maxWidth: "150px", height: "auto" }}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          Career Goal: {role}
        </Typography>
        <Typography variant="h4" component="h5" gutterBottom>
          Duration: 12 weeks (approx.)
        </Typography>
      </Box>
      <Stack spacing={2} sx={{ my: 4 }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <HorizontalLinearAlternativeLabelStepper steps={steps} />
    </Container>
  );
};

export default RoadmapHeader;
