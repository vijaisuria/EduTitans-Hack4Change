const express = require("express");
const axios = require("axios");
const app = express();
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

var cors = require("cors");
app.use(cors());

const client_id = "86esikhquc3kvq";
const client_secret = "sb1eReXGPS4YrWdE";
const redirect_uri = "http://127.0.0.1:8000/auth/linkedin/callback";

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse JSON request bodies
app.use(express.json());

// Initialize the GoogleGenerativeAI instance
const genAI = new GoogleGenerativeAI("AIzaSyCX5FtJT6mGq3ehcM_Z0R7aKUn525UINFQ");

// Function to get universal skills
async function getUniversalSkills(role) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Currently I am at a novice, give me a proper set of skill names only in sequence 
            that I should follow in order to become proficient in ${role} example: Python, git, et`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();

  return text;
}

// Function to get the learning path
async function getLearningPath(role, universalSkills, userSkills) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Hey, I want to become a ${role}, and ${universalSkills} \
    is a universal set of skills that are needed to reach a advanced level in ${role}. And the skills I currently have are ${userSkills}. 
    Please generate a JSON file that includes all the required skills in the correct sequence in which I need to learn them. For skills that 
    are equivalent in the learning path and I can choose to learn any one of them,group these skills together in the same sublist inside the 
    JSON file at their correct subfield. Mark the skills I already have with (already have). Here is an example of the desired format: 
    ['skills_required' : [['field': 'Basics and Fundamentals','skills': ['Computer Science Fundamentals','Programming Basics (already have)']],
    ['field': 'Programming Language','skills': [['Python', 'JavaScript', 'Java (already have)', 'C++'],'Syntax','Basic Programming Constructs']], 
    ['Front-end': ['HTML','CSS',['React', 'Angular', 'Vue.js']]], if I would have asked to become a software engineer. So here in this example 
    as 'React', 'Angular' and 'Vue.js' are equivalent in the learning path, they are grouped together in the same sublist, while HTML, CSS are 
    independent and both should be done in sequence so they are not in a sublist. So, the structure you have to follow is, 
    ['field':'field_name','skills':[skill1, skill2, [skill3_1, skill3_2], skill4]].`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();

  return text;
}

// Define the API endpoint for generating the learning path
app.post("/generate-learning-path", async (req, res) => {
  try {
    const { role, userSkills } = req.body;
    const universalSkills = await getUniversalSkills(role);
    const learningPath = await getLearningPath(
      role,
      universalSkills,
      userSkills
    );

    // Step 1: Remove the backticks and the "json" label
    const cleanedJsonString = learningPath.replace(/```json\n|\n```/g, "");

    // Step 2: Extract JSON part using regex
    const jsonStringPart = cleanedJsonString.match(/\[\s*\{[\s\S]*\}\s*\]/)[0];

    // Step 3: Parse the JSON string
    const jsonData = JSON.parse(jsonStringPart);

    res.json({ jsonData, experience: "Sample Data" });
  } catch (error) {
    console.error("Error generating learning path:", error);
    res
      .status(500)
      .send("An error occurred while generating the learning path.");
  }
});

app.get("/login", (req, res) => {
  res.send(`
        <div style="text-align: center; margin-top: 50px;">
            <img src="edu-connect-logo.png" alt="Company Logo" style="width: 150px; margin-bottom: 20px;">
            <p>Welcome to Our Company. Please sign in with LinkedIn to continue.</p>
            <a href="https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${client_id}&redirect_uri=${encodeURIComponent(
    redirect_uri
  )}&state=YF67HJGT9WD&scope=profile%20email%20openid">
                <img src="linkedin-signin.png" alt="Sign in with LinkedIn" style="width: 200px;">
            </a>
        </div>
    `);
});

// Serve the HTML file for the root endpoint
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/auth/linkedin/callback", async (req, res) => {
  const code = req.query.code;
  const state = req.query.state;

  if (!code || state !== "YF67HJGT9WD") {
    return res.status(400).send("Invalid code or state");
  }

  try {
    const tokenResponse = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      null,
      {
        params: {
          grant_type: "authorization_code",
          code,
          redirect_uri,
          client_id,
          client_secret,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Store the access token in the session or a database for further use
    // req.session.accessToken = accessToken;

    console.log(accessToken);

    // Redirect to a route that fetches and displays user info
    res.redirect("/profile?token=" + accessToken);
    // res.send(accessToken);
  } catch (error) {
    console.error("Error fetching access token:", error);
    res.status(500).send("Error fetching access token");
  }
});

app.get("/profile", async (req, res) => {
  const accessToken = req.query.token;

  if (!accessToken) {
    return res
      .status(401)
      .send("Access token not found. Please sign in again.");
  }

  try {
    const userInfoResponse = await axios.get(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userInfo = userInfoResponse.data;

    // Redirect to localhost:3000 with user info as query parameters
    const userInfoQuery = encodeURIComponent(JSON.stringify(userInfo));
    res.redirect(`http://localhost:3000/profile?userInfo=${userInfoQuery}`);
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).send("Error fetching user info");
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
