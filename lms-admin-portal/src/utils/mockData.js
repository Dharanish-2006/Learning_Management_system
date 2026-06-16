export const ADMIN_USER = {
  id: 1, name: 'Sneha Kapoor', email: 'admin@learnhub.com',
  role: 'Super Admin', avatar: 'SK',
};

export const CATEGORIES = ['Programming','Data Science','Web Development','Cloud Computing','UI/UX Design','Digital Marketing','DevOps'];

export const COURSES = [
  { id:1, title:'Complete Python Bootcamp',   instructor:'Dr. Angela Yu',  category:'Programming',      price:1999, originalPrice:4999, students:84320,  rating:4.8, lessons:185, duration:'22h', status:'published', createdAt:'Jan 12, 2024', thumbnail:'🐍' },
  { id:2, title:'Machine Learning A–Z',       instructor:'Kirill Eremenko',category:'Data Science',      price:2499, originalPrice:5999, students:62100,  rating:4.7, lessons:320, duration:'40h', status:'published', createdAt:'Feb 3, 2024',  thumbnail:'🤖' },
  { id:3, title:'The Complete Web Developer', instructor:'Andrei Neagoie', category:'Web Development',   price:1799, originalPrice:3999, students:108000, rating:4.9, lessons:290, duration:'35h', status:'published', createdAt:'Nov 20, 2023', thumbnail:'🌐' },
  { id:4, title:'AWS Solutions Architect',    instructor:'Neal Davis',     category:'Cloud Computing',   price:2999, originalPrice:6999, students:45200,  rating:4.6, lessons:210, duration:'28h', status:'published', createdAt:'Dec 1, 2023',  thumbnail:'☁️' },
  { id:5, title:'UI/UX Design Bootcamp',      instructor:'Sarah Chen',     category:'UI/UX Design',      price:1599, originalPrice:3499, students:31400,  rating:4.8, lessons:145, duration:'18h', status:'draft',     createdAt:'Mar 5, 2024',  thumbnail:'🎨' },
  { id:6, title:'React & Next.js Complete',   instructor:'Maximilian S.',  category:'Web Development',   price:2199, originalPrice:4999, students:135000, rating:4.8, lessons:380, duration:'48h', status:'published', createdAt:'Oct 8, 2023',  thumbnail:'⚛️' },
  { id:7, title:'Digital Marketing 2024',     instructor:'Phil Ebiner',    category:'Digital Marketing', price:1299, originalPrice:2999, students:58700,  rating:4.5, lessons:180, duration:'23h', status:'draft',     createdAt:'Apr 2, 2024',  thumbnail:'📈' },
  { id:8, title:'SQL Mastery',                instructor:'Mosh Hamedani',  category:'Data Science',      price:1499, originalPrice:3499, students:72000,  rating:4.7, lessons:120, duration:'15h', status:'published', createdAt:'Sep 14, 2023', thumbnail:'🗄️' },
];

export const USERS = [
  { id:1,  name:'Arjun Mehta',  email:'arjun.m@gmail.com',    courses:5,  joinedDate:'Jan 12, 2024', status:'active',  avatar:'AM', spent:9495  },
  { id:2,  name:'Priya Sharma', email:'priya.s@outlook.com',  courses:3,  joinedDate:'Feb 3, 2024',  status:'active',  avatar:'PS', spent:5797  },
  { id:3,  name:'Rahul Singh',  email:'rahul.singh@yahoo.com',courses:8,  joinedDate:'Nov 28, 2023', status:'blocked', avatar:'RS', spent:17192 },
  { id:4,  name:'Kavya Nair',   email:'kavya.n@gmail.com',    courses:2,  joinedDate:'Mar 17, 2024', status:'active',  avatar:'KN', spent:3398  },
  { id:5,  name:'Vikram Patel', email:'vikram.p@hotmail.com', courses:11, joinedDate:'Sep 5, 2023',  status:'active',  avatar:'VP', spent:23189 },
  { id:6,  name:'Ananya Reddy', email:'ananya.r@gmail.com',   courses:1,  joinedDate:'Apr 22, 2024', status:'active',  avatar:'AR', spent:1999  },
  { id:7,  name:'Sanjay Kumar', email:'sanjay.k@company.com', courses:4,  joinedDate:'Dec 1, 2023',  status:'active',  avatar:'SK', spent:7796  },
  { id:8,  name:'Deepika Rao',  email:'deepika.r@gmail.com',  courses:6,  joinedDate:'Jan 30, 2024', status:'active',  avatar:'DR', spent:12994 },
  { id:9,  name:'Akash Verma',  email:'akash.v@gmail.com',    courses:2,  joinedDate:'May 5, 2024',  status:'active',  avatar:'AV', spent:4498  },
  { id:10, name:'Meera Iyer',   email:'meera.i@gmail.com',    courses:7,  joinedDate:'Aug 19, 2023', status:'blocked', avatar:'MI', spent:15393 },
];

export const ANALYTICS = {
  userGrowth: [
    {month:'Jan',users:1200},{month:'Feb',users:1800},{month:'Mar',users:2400},
    {month:'Apr',users:3100},{month:'May',users:4200},{month:'Jun',users:5800},
    {month:'Jul',users:7100},{month:'Aug',users:8900},{month:'Sep',users:10200},
    {month:'Oct',users:12400},{month:'Nov',users:14800},{month:'Dec',users:18200},
  ],
  enrollments: [
    {month:'Jan',enrollments:340},{month:'Feb',enrollments:520},{month:'Mar',enrollments:610},
    {month:'Apr',enrollments:780},{month:'May',enrollments:1020},{month:'Jun',enrollments:1280},
    {month:'Jul',enrollments:1560},{month:'Aug',enrollments:1890},{month:'Sep',enrollments:2100},
    {month:'Oct',enrollments:2450},{month:'Nov',enrollments:2890},{month:'Dec',enrollments:3200},
  ],
  revenue: [
    {month:'Jan',revenue:145000},{month:'Feb',revenue:218000},{month:'Mar',revenue:289000},
    {month:'Apr',revenue:371000},{month:'May',revenue:482000},{month:'Jun',revenue:598000},
    {month:'Jul',revenue:724000},{month:'Aug',revenue:892000},{month:'Sep',revenue:1040000},
    {month:'Oct',revenue:1230000},{month:'Nov',revenue:1480000},{month:'Dec',revenue:1820000},
  ],
  popularCourses: [
    {name:'React & Next.js',students:135000},{name:'Python Bootcamp',students:84320},
    {name:'SQL Mastery',students:72000},{name:'ML A-Z',students:62100},
    {name:'Digital Marketing',students:58700},{name:'AWS Architect',students:45200},
  ],
  categoryBreakdown: [
    {name:'Programming',value:32,color:'#00D4AA'},{name:'Web Dev',value:28,color:'#6C5CE7'},
    {name:'Data Science',value:20,color:'#0F2D4A'},{name:'Design',value:10,color:'#FF6B6B'},
    {name:'Cloud',value:10,color:'#F59E0B'},
  ],
};

export const SUMMARY = {
  totalUsers:18200, totalCourses:8, totalEnrollments:596720, revenue:10285256,
  newUsersThisMonth:3400, newCoursesThisMonth:1, newEnrollmentsThisMonth:3200, revenueThisMonth:1820000,
};
