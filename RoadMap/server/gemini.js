const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyCX5FtJT6mGq3ehcM_Z0R7aKUn525UINFQ');

async function prompt1(role) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = "Currently I am at a novice, give me a proper set of skill names only in sequence \
            that I should follow in order to become proficient in " + role + " example: Python, git, et"

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log('Universal Skills set ');
  console.log(text);

  return text;
}

async function prompt2(role, universalSkills, userSkills) {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  
    const prompt = "Hey, I want to become a " + role + ", and " + universalSkills + " \
    is a universal set of skills that are needed to reach a advanced level in " + role + ". And the skills I currently have a\
    re " + userSkills + ". Please generate a JSON file that includes all the required skills in the correct sequence in whic\
    h I need to learn them. For skills that are equivalent in the learning path and I can choose to learn any one of them,group these skills to\
    gether in the same sublist inside the JSON file at their correct subfield. Mark the skills I already have with (already have). Here is an e\
    xample of the desired format: ['skills_required' : [['field': 'Basics and Fundamentals','skills': ['Computer Science Fundamentals','Program\
    ming Basics (already have)']],['field': 'Programming Language','skills': [['Python', 'JavaScript', 'Java (already have)', 'C++'],'Syntax','\
    Basic Programming Constructs']], ['Front-end': ['HTML','CSS',['React', 'Angular', 'Vue.js']]], if I would have asked to become a software e\
    nigineer. So here in this example as 'React', 'Angular' and 'Vue.js' are equivalent in the learning path, they are grouped together in the \
    same sublist, while HTML, CSS are independent and both should be done in sequence so they are not in a sublist. So, the structure you have \
    to follow is, ['field':'field_name','skills':[skill1, skill2, [skill3_1, skill3_2], skill4]]."
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log('Final ');
    console.log(text);
}



prompt2('Software Developer', prompt1('Software Developer'), 'HTML, CSS, JavaScript, JQuery');