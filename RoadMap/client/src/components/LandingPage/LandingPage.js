import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AssistantIcon from "@mui/icons-material/Assistant";
import image from "./landingPage.svg";
import { useNavigate } from "react-router";

const currencies = [
  { value: "Basic", label: "Basic" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
];

const suggestedPrompts = [
  { id: 1, text: "Software Developer" },
  { id: 2, text: "Backend Developer" },
  { id: 3, text: "Full Stack Developer" },
];

const logos = {
  morning: image,
  afternoon: image,
  evening: image,
};

const LandingPage = () => {
  const [textFieldValue, setTextFieldValue] = useState("");
  const [greeting, setGreeting] = useState("");
  const [logo, setLogo] = useState("");

  const navigate = useNavigate();

  sessionStorage.setItem("name", "Sample Account");
  sessionStorage.setItem("email", "educonnect@gmail.com");
  sessionStorage.setItem(
    "picture",
    "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"
  );
  sessionStorage.setItem("isLoggedIn", "true");

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      window.location.href = "http://localhost:8000";
    }
  }, []);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 8 && currentHour < 12) {
      setGreeting("Good Morning,");
      setLogo(logos.morning);
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good Afternoon,");
      setLogo(logos.afternoon);
    } else {
      setGreeting("Good Evening,");
      setLogo(logos.evening);
    }
  }, []);

  const handlePromptClick = (text) => {
    setTextFieldValue(text);
  };

  const handleGenerateClick = () => {
    console.log("Generate button clicked");
    navigate("/loading?role=" + textFieldValue);
  };

  return (
    <Card
      color="neutral"
      style={{
        marginTop: "40px",
        marginLeft: "220px",
        marginRight: "220px",
        borderRadius: "10px",
        // backgroundImage: "linear-gradient(to bottom, #aeaeae, #c2c2c2, #d6d6d6, #eaeaea, #ffffff)",
      }}
    >
      <CardContent>
        <div style={{ textAlign: "center" }}>
          <img src={image} />
        </div>
        <Typography variant="h4" align="center" style={{ marginTop: "30px" }}>
          {greeting} {sessionStorage.getItem("name") || "User"}
        </Typography>
        <Container>
          <Grid
            container
            spacing={2}
            style={{
              marginTop: "20px",
              padding: "20px",
              justifyContent: "center",
            }}
          >
            {/* Left Column */}
            <Grid item xs={12} md={8}>
              <TextField
                value={textFieldValue}
                onChange={(e) => setTextFieldValue(e.target.value)}
                fullWidth
                multiline
                maxRows={4}
                label="Enter the field you want to shine in"
                variant="outlined"
                style={{ marginTop: "20px" }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                  width: "60%",
                }}
              >
                {suggestedPrompts.map((prompt) => (
                  <Button
                    key={prompt.id}
                    onClick={() => handlePromptClick(prompt.text)}
                    variant="outlined"
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    fullWidth
                  >
                    <IconButton size="small" aria-label="search">
                      <AssistantIcon />
                    </IconButton>
                    <span
                      style={{ marginLeft: "10px", flex: 1, textAlign: "left" }}
                    >
                      {prompt.text}
                    </span>
                  </Button>
                ))}
              </div>
            </Grid>
          </Grid>
          <CardActions style={{ display: "flex", justifyContent: "center" }}>
            {textFieldValue !== "" && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateClick}
              >
                Start Learning!
              </Button>
            )}
            {textFieldValue === "" && (
              <Button disabled variant="contained" color="primary">
                Start Learning!
              </Button>
            )}
          </CardActions>
        </Container>
      </CardContent>
    </Card>
  );
};

export default LandingPage;
