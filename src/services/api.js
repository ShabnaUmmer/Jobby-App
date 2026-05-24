import { getJobs, getJobById, searchJobs } from './jobsData';

class APIService {
  constructor() {
    this.delay = 500;
  }

  async fetchJobs(params = {}) {
    const { 
      search = '', 
      employment_type = [], 
      minimum_package = '', 
      location = '',
      sort_by = 'relevance',
      min_experience = '',
      max_experience = ''
    } = params;
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const filters = {
          employment_type: employment_type.length ? employment_type : [],
          minimum_package: minimum_package || '',
          location: location || '',
          min_experience,
          max_experience,
          sort_by
        };
        const jobs = searchJobs(search || '', filters);
        resolve({ jobs, total: jobs.length });
      }, this.delay);
    });
  }

  async fetchJobById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const job = getJobById(id);
        if (job) {
          const similarJobs = getJobs()
            .filter(j => j.id !== id && 
              (j.skills?.some(skill => 
                job.skills?.some(js => js.name === skill.name)
              ) || 
              j.title.toLowerCase().includes(job.title.toLowerCase().split(' ')[0]))
            )
            .slice(0, 4);
          
          resolve({ 
            job_details: job, 
            similar_jobs: similarJobs 
          });
        } else {
          reject({ error: 'Job not found' });
        }
      }, this.delay);
    });
  }

  async fetchProfile(token) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
          const user = JSON.parse(currentUser);
          resolve({
            profile_details: {
              name: user.name || user.username,
              profile_image_url: user.avatar,
              email: user.email,
            }
          });
        } else {
          resolve({
            profile_details: {
              name: "User",
              profile_image_url: "",
              email: "",
            }
          });
        }
      }, 300);
    });
  }

  async login(credentials) {
    const { username, password } = credentials;
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
          const userProfile = {
            id: user.id,
            username: user.username,
            name: user.name || user.username,
            email: user.email,
          };
          localStorage.setItem('currentUser', JSON.stringify(userProfile));
          resolve({ 
            jwt_token: `jwt-token-${user.id}`, 
            user: userProfile 
          });
        } else {
          reject({ error_msg: 'Invalid username or password!' });
        }
      }, 500);
    });
  }

  async register(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const exists = users.some(u => u.username === userData.username || u.email === userData.email);
        
        if (exists) {
          reject({ error_msg: 'Username or email already exists!' });
        } else {
          const newUser = {
            id: Date.now(),
            name: userData.name || userData.username,
            username: userData.username,
            email: userData.email,
            password: userData.password,
            createdAt: new Date().toISOString()
          };
          users.push(newUser);
          localStorage.setItem('users', JSON.stringify(users));
          resolve({ message: 'Registration successful!' });
        }
      }, 500);
    });
  }
}

const apiServiceInstance = new APIService();
export default apiServiceInstance;