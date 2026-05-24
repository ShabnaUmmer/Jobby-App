// Complete jobs database with all employment types
export const jobsDatabase = [
  {
    id: "1",
    title: "Frontend Developer",
    company_name: "Google",
    company_logo_url: "https://img.icons8.com/color/240/google-logo.png",
    location: "Bangalore, India",
    country: "India",
    city: "Bangalore",
    package_per_annum: "12 LPA",
    employment_type: "FULLTIME",
    rating: 4.5,
    experience_required: "2-4 years",
    min_experience: 2,
    max_experience: 4,
    job_description: "Join Google as a Frontend Developer and build scalable React applications used by millions worldwide. You'll work on cutting-edge technologies including Next.js, TypeScript, and modern CSS frameworks. Collaborate with world-class designers and backend engineers to create exceptional user experiences. This role offers opportunities to work on high-impact projects and grow your technical skills. Google provides continuous learning opportunities and a collaborative environment where innovation thrives.",
    requirements: ["React", "JavaScript", "REST API", "HTML5", "CSS3", "Git"],
    skills: [
      { name: "React", image_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "JavaScript", image_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", image_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" }
    ],
    date_posted: "2024-01-15",
    deadline: "2024-02-15",
    company_website_url: "https://careers.google.com",
    life_at_company: {
      description: "Google offers free meals, gym facilities, and continuous learning opportunities.",
      image_url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400"
    },
    benefits: ["Health Insurance", "Stock Options", "Free Meals", "Gym Membership"]
  },
  {
    id: "2",
    title: "Backend Developer",
    company_name: "Amazon",
    company_logo_url: "https://img.icons8.com/color/240/amazon.png",
    location: "Hyderabad, India",
    country: "India",
    city: "Hyderabad",
    package_per_annum: "18 LPA",
    employment_type: "FULLTIME",
    rating: 4.6,
    experience_required: "3-5 years",
    min_experience: 3,
    max_experience: 5,
    job_description: "Amazon is seeking a talented Backend Developer to build scalable microservices and REST APIs that power millions of transactions daily. You'll work on high-performance distributed systems using AWS cloud technologies. The role involves designing database schemas, optimizing queries, and ensuring system reliability. You'll collaborate with cross-functional teams to deliver features that enhance customer experience. Amazon offers a fast-paced environment where you can take ownership and make significant impact.",
    requirements: ["Node.js", "Python", "AWS", "Databases", "Microservices"],
    skills: [
      { name: "Node.js", image_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Python", image_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "AWS", image_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" }
    ],
    date_posted: "2024-01-10",
    deadline: "2024-02-10",
    company_website_url: "https://amazon.jobs",
    life_at_company: {
      description: "Amazon fosters innovation with a Day 1 culture. Employees enjoy competitive benefits.",
      image_url: "https://images.unsplash.com/photo-1523475496153-3d4267c3d9b9?w=400"
    },
    benefits: ["Health Insurance", "Employee Discount", "401k", "Parental Leave"]
  },
  {
    id: "3",
    title: "Part Time UI Designer",
    company_name: "Adobe",
    company_logo_url: "https://img.icons8.com/color/240/adobe.png",
    location: "Remote, India",
    country: "India",
    city: "Remote",
    package_per_annum: "8 LPA",
    employment_type: "PARTTIME",
    rating: 4.3,
    experience_required: "1-3 years",
    min_experience: 1,
    max_experience: 3,
    job_description: "Adobe is looking for a creative UI Designer to work part-time on exciting design projects. You'll create beautiful user interfaces for creative software products used by millions. This flexible role allows you to work remotely and maintain work-life balance. You'll collaborate with product managers and developers to implement pixel-perfect designs. Adobe values creativity and offers a supportive environment for designers to grow their skills.",
    requirements: ["Figma", "UI Design", "Adobe XD", "Prototyping"],
    skills: [
      { name: "Figma", image_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Adobe XD", image_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg" }
    ],
    date_posted: "2024-01-12",
    deadline: "2024-02-12",
    company_website_url: "https://adobe.com/careers",
    life_at_company: {
      description: "Adobe offers creative freedom and work-life balance.",
      image_url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400"
    },
    benefits: ["Flexible Hours", "Creative Tools", "Learning Resources", "Remote Work"]
  },
  {
    id: "4",
    title: "Freelance WordPress Developer",
    company_name: "Automattic",
    company_logo_url: "https://img.icons8.com/color/240/wordpress.png",
    location: "Remote, Worldwide",
    country: "India",
    city: "Remote",
    package_per_annum: "10 LPA",
    employment_type: "FREELANCE",
    rating: 4.4,
    experience_required: "2-5 years",
    min_experience: 2,
    max_experience: 5,
    job_description: "Join Automattic as a freelance WordPress developer to build custom themes and plugins for diverse clients. This is a project-based role with flexible schedule. You'll work on exciting web development projects and contribute to open-source community. The position offers competitive project rates and the freedom to choose your workload. Perfect for developers who value autonomy and variety in their work.",
    requirements: ["WordPress", "PHP", "JavaScript", "CSS", "MySQL"],
    skills: [
      { name: "WordPress", image_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" },
      { name: "PHP", image_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" }
    ],
    date_posted: "2024-01-08",
    deadline: "2024-02-08",
    company_website_url: "https://automattic.com/work-with-us",
    life_at_company: {
      description: "Automattic is fully distributed with employees in 70+ countries.",
      image_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400"
    },
    benefits: ["Global Community", "Flexible Schedule", "Project Variety", "Remote First"]
  },
  {
    id: "5",
    title: "Summer Internship - Software Engineering",
    company_name: "Microsoft",
    company_logo_url: "https://img.icons8.com/color/240/microsoft.png",
    location: "Hyderabad, India",
    country: "India",
    city: "Hyderabad",
    package_per_annum: "4 LPA",
    employment_type: "INTERNSHIP",
    rating: 4.7,
    experience_required: "0-1 years",
    min_experience: 0,
    max_experience: 1,
    job_description: "Microsoft offers a 3-month summer internship for passionate engineering students. You'll work on real-world projects with experienced mentors and learn industry best practices. Interns get hands-on experience with Azure cloud services and modern development tools. This is an excellent opportunity to kickstart your career at a top tech company. Top performers receive full-time offers upon completion.",
    requirements: ["Programming basics", "Problem Solving", "Teamwork", "Communication"],
    skills: [
      { name: "C#", image_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
      { name: ".NET", image_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" }
    ],
    date_posted: "2024-01-05",
    deadline: "2024-02-05",
    company_website_url: "https://careers.microsoft.com",
    life_at_company: {
      description: "Microsoft interns receive mentorship from industry experts.",
      image_url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400"
    },
    benefits: ["Paid Internship", "Mentorship", "Free Food", "Networking"]
  }
];

// Generate 95 more jobs with all employment types
const companies = ["Netflix", "Meta", "Apple", "Salesforce", "Uber", "Airbnb", "Twitter", "LinkedIn", "Spotify", "Slack"];
const titles = ["Software Engineer", "Data Scientist", "DevOps Engineer", "Product Manager", "QA Engineer", "Technical Writer"];
const locations = ["Bangalore", "Hyderabad", "Pune", "Chennai", "Mumbai", "Delhi"];
const packages = ["6 LPA", "8 LPA", "10 LPA", "12 LPA", "15 LPA", "18 LPA", "20 LPA"];
const employmentTypes = ["FULLTIME", "PARTTIME", "FREELANCE", "INTERNSHIP"];

let id = 6;
for (let i = 0; i < 95; i++) {
  const employmentType = employmentTypes[i % 4];
  let jobDesc = "";
  
  if (employmentType === "FULLTIME") {
    jobDesc = `Join ${companies[i % companies.length]} as a ${titles[i % titles.length]} and become part of an innovative team building cutting-edge solutions. You'll work on high-impact projects that serve millions of users worldwide. The role offers excellent growth opportunities, competitive compensation, and a collaborative work environment. You'll collaborate with talented engineers and product managers to deliver exceptional results. The company provides comprehensive benefits including health insurance, stock options, and professional development budget.`;
  } else if (employmentType === "PARTTIME") {
    jobDesc = `${companies[i % companies.length]} is seeking a ${titles[i % titles.length]} for a part-time position with flexible hours. This role is perfect for professionals seeking work-life balance while contributing to meaningful projects. You'll work 20-25 hours per week with flexible scheduling options. The position offers competitive hourly rates and the opportunity to work with a world-class team. Part-time employees receive pro-rated benefits and access to learning resources.`;
  } else if (employmentType === "FREELANCE") {
    jobDesc = `Freelance ${titles[i % titles.length]} needed for project-based work with ${companies[i % companies.length]}. This is a remote position with flexible deadlines and competitive project rates. You'll have the freedom to choose projects that match your skills and schedule. The ideal candidate is self-motivated and delivers high-quality work independently. Join our talent network for consistent freelance opportunities with fair compensation.`;
  } else {
    jobDesc = `${companies[i % companies.length]} offers a ${titles[i % titles.length]} internship program for students and recent graduates. This is a 3-6 month paid internship with hands-on learning opportunities. You'll work on real projects, receive mentorship from industry experts, and gain valuable experience. Interns have access to training programs and networking events. Top performers may receive full-time offers upon completion.`;
  }
  
  jobsDatabase.push({
    id: (id++).toString(),
    title: titles[i % titles.length],
    company_name: companies[i % companies.length],
    company_logo_url: `https://img.icons8.com/color/240/${companies[i % companies.length].toLowerCase()}.png`,
    location: `${locations[i % locations.length]}, India`,
    country: "India",
    city: locations[i % locations.length],
    package_per_annum: packages[i % packages.length],
    employment_type: employmentType,
    rating: 3.8 + (i % 12) / 10,
    experience_required: `${(i % 5) + 1}-${(i % 5) + 3} years`,
    min_experience: (i % 5) + 1,
    max_experience: (i % 5) + 3,
    job_description: jobDesc,
    requirements: ["Strong problem-solving", "Team collaboration", "Good communication", "Continuous learning"],
    skills: [
      { name: "JavaScript", image_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "React", image_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" }
    ],
    date_posted: `2024-01-${10 + (i % 20)}`,
    deadline: `2024-02-${10 + (i % 20)}`,
    company_website_url: `https://${companies[i % companies.length].toLowerCase()}.com/careers`,
    life_at_company: {
      description: `${companies[i % companies.length]} offers a dynamic work environment with focus on innovation and employee well-being.`,
      image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400"
    },
    benefits: ["Health Insurance", "Flexible Hours", "Learning Budget", "Remote Options"]
  });
}

export const getJobs = () => jobsDatabase;
export const getJobById = (id) => jobsDatabase.find(job => job.id === id);

export const searchJobs = (searchTerm, filters = {}) => {
  let filtered = [...jobsDatabase];
  
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(job => 
      job.title.toLowerCase().includes(term) ||
      job.company_name.toLowerCase().includes(term) ||
      job.location.toLowerCase().includes(term)
    );
  }
  
  // Fix: Filter by employment_type properly
  if (filters.employment_type && filters.employment_type.length) {
    filtered = filtered.filter(job => 
      filters.employment_type.includes(job.employment_type)
    );
  }
  
  if (filters.minimum_package) {
    const minPackage = parseInt(filters.minimum_package);
    filtered = filtered.filter(job => {
      const pkg = parseInt(job.package_per_annum);
      return pkg >= minPackage / 100000;
    });
  }
  
  if (filters.location) {
    const locationTerm = filters.location.toLowerCase();
    filtered = filtered.filter(job =>
      job.location.toLowerCase().includes(locationTerm)
    );
  }
  
  if (filters.sort_by === 'salary_high') {
    filtered.sort((a, b) => parseInt(b.package_per_annum) - parseInt(a.package_per_annum));
  } else if (filters.sort_by === 'salary_low') {
    filtered.sort((a, b) => parseInt(a.package_per_annum) - parseInt(b.package_per_annum));
  } else if (filters.sort_by === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }
  
  return filtered;
};