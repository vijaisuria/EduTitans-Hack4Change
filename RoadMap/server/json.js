const inputString = "```json\n[\n  {\n    \"field\": \"Basics and Fundamentals\",\n    \"skills\": [\n      \"Computer Science Fundamentals\",\n      \"Programming Basics (already have)\"\n    ]\n  },\n  {\n    \"field\": \"Programming Languages\",\n    \"skills\": [\n      [\"Python\", \"JavaScript (already have)\"],\n      \"Syntax\",\n      \"Basic Programming Constructs\"\n    ]\n  },\n  {\n    \"field\": \"Front-end Development\",\n    \"skills\": [\n      \"HTML (already have)\",\n      \"CSS (already have)\",\n      \"JQuery (already have)\",\n      [\"React\", \"Angular\", \"Vue.js\"]\n    ]\n  },\n  {\n    \"field\": \"Version Control\",\n    \"skills\": [\n      \"Git\"\n    ]\n  },\n  {\n    \"field\": \"Data Structures & Algorithms\",\n    \"skills\": [\n      \"Arrays\",\n      \"Lists\",\n      \"Stacks\",\n      \"Queues\",\n      \"Trees\",\n      \"Graphs\",\n      \"Sorting\",\n      \"Searching\"\n    ]\n  },\n  {\n    \"field\": \"Development Tools\",\n    \"skills\": [\n      \"Text Editor (VS Code, Sublime Text)\",\n      \"Terminal/Command Line\",\n      \"Integrated Development Environment (IDE)\"\n    ]\n  },\n  {\n    \"field\": \"Object-Oriented Programming\",\n    \"skills\": [\n      \"Classes\",\n      \"Objects\",\n      \"Inheritance\",\n      \"Polymorphism\"\n    ]\n  },\n  {\n    \"field\": \"Databases\",\n    \"skills\": [\n      \"SQL (MySQL, PostgreSQL)\",\n      \"NoSQL (MongoDB)\"\n    ]\n  },\n  {\n    \"field\": \"Testing & Debugging\",\n    \"skills\": [\n      \"Unit Testing\",\n      \"Integration Testing\",\n      \"Debugging Tools\"\n    ]\n  },\n  {\n    \"field\": \"Software Design Patterns\",\n    \"skills\": [\n      \"Singleton\",\n      \"Factory\",\n      \"Observer\"\n    ]\n  },\n  {\n    \"field\": \"Cloud Computing\",\n    \"skills\": [\n      \"AWS\",\n      \"Azure\",\n      \"Google Cloud\"\n    ]\n  },\n  {\n    \"field\": \"DevOps\",\n    \"skills\": [\n      \"Continuous Integration & Continuous Delivery (CI/CD)\",\n      \"Docker\",\n      \"Kubernetes\"\n    ]\n  },\n  {\n    \"field\": \"Communication & Collaboration\",\n    \"skills\": [\n      \"Agile Methodologies\",\n      \"Teamwork\",\n      \"Technical Writing\",\n      \"Public Speaking\"\n    ]\n  }\n]\n```\n\n**Explanation:**\n\n* **Foundation:** I've included all the basic skills you mentioned, including \"Programming Basics\" marked as (already have) since you have HTML, CSS, and JavaScript.\n* **Intermediate:**  I've added the important intermediate skills, including Object-Oriented Programming, Databases, and Testing & Debugging. \n* **Advanced:**  I've included advanced topics like Design Patterns, Cloud Computing, and DevOps. \n* **Specific Technologies:** I haven't included a specific \"Specific Technologies\" section yet. You can add this later depending on your area of interest.  \n* **Sequencing:** The skills are generally listed in a logical order. For example, you'll need to understand basic programming before you dive into Object-Oriented Programming.\n* **Grouping:** I've grouped equivalent skills (e.g., React, Angular, and Vue.js) within the same sublist, making it clear you can choose one from that group.\n\n**Next Steps:**\n\n1. **Specific Focus:** Decide which specific area of software development you want to focus on (e.g., web development, mobile app development, data science). This will help you prioritize learning.\n2. **Learning Resources:** Find online courses, tutorials, and books for each skill you want to learn.  \n3. **Practice:** The key to becoming a good developer is practice. Start building projects and working on real-world problems. \n\nRemember, the learning process is ongoing. Keep exploring new technologies and keep practicing to stay up-to-date!\n";

// Step 1: Remove the backticks and the "json" label
const cleanedJsonString = inputString.replace(/```json\n|\n```/g, '');

// Step 2: Extract JSON part using regex
const jsonStringPart = cleanedJsonString.match(/\[\s*\{[\s\S]*\}\s*\]/)[0];

// Step 3: Parse the JSON string
const jsonData = JSON.parse(jsonStringPart);

// Step 3: Extract the skills data
const skillsData = jsonData.map(item => item.skills);

// Logging skills data to verify
console.log(jsonStringPart);

const fs = require('fs');

// Step 5: Write jsonData to a file
fs.writeFile('output.json', JSON.stringify(jsonData, null, 2), (err) => {
    if (err) throw err;
    console.log('Data has been written to output.json');
});


