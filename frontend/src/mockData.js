import { Users, BookOpen, CheckSquare, TrendingUp, Award, Clock } from 'lucide-react';

// --- Helper Data ---
const skillsList = [
    'React', 'Node.js', 'Python', 'Machine Learning', 'Data Analysis',
    'UI/UX Design', 'Project Management', 'DevOps', 'Cloud Computing', 'Marketing'
];

const roles = ['Developer', 'Designer', 'Product Manager', 'Data Scientist', 'DevOps Engineer'];

// --- Mock Data ---

export const members = [
    {
        id: 'm1',
        name: 'Sarah Chen',
        initials: 'SC',
        role: 'Senior Developer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        primarySkill: 'React',
        skills: [
            { name: 'React', proficiency: 'Advanced' },
            { name: 'Node.js', proficiency: 'Intermediate' },
            { name: 'UI/UX Design', proficiency: 'Beginner' }
        ],
        participationScore: 85,
        learningPathStatus: 'In Progress',
        interests: ['Machine Learning', 'Cloud Architecture'],
        timeline: [
            { id: 't1', type: 'completed_module', title: 'Advanced React Patterns', date: '2023-10-25' },
            { id: 't2', type: 'joined_path', title: 'Full Stack Mastery', date: '2023-10-01' }
        ]
    },
    {
        id: 'm2',
        name: 'Michael Ross',
        initials: 'MR',
        role: 'Product Manager',
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        primarySkill: 'Project Management',
        skills: [
            { name: 'Project Management', proficiency: 'Advanced' },
            { name: 'Data Analysis', proficiency: 'Intermediate' }
        ],
        participationScore: 92,
        learningPathStatus: 'Completed',
        interests: ['Leadership', 'Agile Methodologies'],
        timeline: [
            { id: 't3', type: 'completed_path', title: 'Agile Leadership', date: '2023-11-05' }
        ]
    },
    {
        id: 'm3',
        name: 'Emma Wilson',
        initials: 'EW',
        role: 'Data Scientist',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        primarySkill: 'Python',
        skills: [
            { name: 'Python', proficiency: 'Advanced' },
            { name: 'Machine Learning', proficiency: 'Advanced' },
            { name: 'Data Analysis', proficiency: 'Advanced' }
        ],
        participationScore: 78,
        learningPathStatus: 'Not Started',
        interests: ['Deep Learning', 'NLP'],
        timeline: []
    },
    {
        id: 'm4',
        name: 'James Rodriguez',
        initials: 'JR',
        role: 'Developer',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        primarySkill: 'Node.js',
        skills: [
            { name: 'Node.js', proficiency: 'Intermediate' },
            { name: 'DevOps', proficiency: 'Beginner' }
        ],
        participationScore: 65,
        learningPathStatus: 'In Progress',
        interests: ['Cloud Computing', 'Security'],
        timeline: [
            { id: 't4', type: 'completed_module', title: 'Docker Basics', date: '2023-11-10' }
        ]
    },
    {
        id: 'm5',
        name: 'Priya Patel',
        initials: 'PP',
        role: 'Designer',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        primarySkill: 'UI/UX Design',
        skills: [
            { name: 'UI/UX Design', proficiency: 'Advanced' },
            { name: 'React', proficiency: 'Beginner' }
        ],
        participationScore: 88,
        learningPathStatus: 'In Progress',
        interests: ['Frontend Development', 'Accessibility'],
        timeline: []
    },
    {
        id: 'm6',
        name: 'David Kim',
        initials: 'DK',
        role: 'DevOps Engineer',
        avatar: null,
        primarySkill: 'DevOps',
        skills: [
            { name: 'DevOps', proficiency: 'Advanced' },
            { name: 'Cloud Computing', proficiency: 'Intermediate' }
        ],
        participationScore: 72,
        learningPathStatus: 'In Progress',
        interests: ['Kubernetes', 'Serverless'],
        timeline: []
    },
    {
        id: 'm7',
        name: 'Lisa Wong',
        initials: 'LW',
        role: 'Developer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        primarySkill: 'React',
        skills: [
            { name: 'React', proficiency: 'Intermediate' },
            { name: 'Node.js', proficiency: 'Beginner' }
        ],
        participationScore: 55,
        learningPathStatus: 'Not Started',
        interests: ['Mobile Development', 'React Native'],
        timeline: []
    },
    {
        id: 'm8',
        name: 'Robert Fox',
        initials: 'RF',
        role: 'Product Manager',
        avatar: null,
        primarySkill: 'Project Management',
        skills: [
            { name: 'Project Management', proficiency: 'Intermediate' }
        ],
        participationScore: 45,
        learningPathStatus: 'Not Started',
        interests: ['Data Analysis', 'Growth Hacking'],
        timeline: []
    },
    {
        id: 'm9',
        name: 'Jennifer Lee',
        initials: 'JL',
        role: 'Data Scientist',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        primarySkill: 'Data Analysis',
        skills: [
            { name: 'Data Analysis', proficiency: 'Advanced' },
            { name: 'Python', proficiency: 'Intermediate' }
        ],
        participationScore: 95,
        learningPathStatus: 'Completed',
        interests: ['Big Data', 'Visualization'],
        timeline: []
    },
    {
        id: 'm10',
        name: 'Thomas Anderson',
        initials: 'TA',
        role: 'Developer',
        avatar: null,
        primarySkill: 'React',
        skills: [
            { name: 'React', proficiency: 'Advanced' },
            { name: 'Node.js', proficiency: 'Advanced' }
        ],
        participationScore: 98,
        learningPathStatus: 'Completed',
        interests: ['System Architecture', 'Blockchain'],
        timeline: []
    },
    {
        id: 'm11',
        name: 'Maria Garcia',
        initials: 'MG',
        role: 'Designer',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        primarySkill: 'UI/UX Design',
        skills: [
            { name: 'UI/UX Design', proficiency: 'Intermediate' }
        ],
        participationScore: 60,
        learningPathStatus: 'In Progress',
        interests: ['Design Systems', 'Prototyping'],
        timeline: []
    },
    {
        id: 'm12',
        name: 'Kevin White',
        initials: 'KW',
        role: 'DevOps Engineer',
        avatar: null,
        primarySkill: 'Cloud Computing',
        skills: [
            { name: 'Cloud Computing', proficiency: 'Advanced' },
            { name: 'DevOps', proficiency: 'Intermediate' }
        ],
        participationScore: 82,
        learningPathStatus: 'In Progress',
        interests: ['Security', 'Compliance'],
        timeline: []
    }
];

export const learningPaths = [
    {
        id: 'p1',
        name: 'Full Stack Mastery',
        description: 'Master both frontend and backend technologies to become a complete developer.',
        skillTags: ['React', 'Node.js', 'Database'],
        difficulty: 'Advanced',
        estimatedDuration: '12 weeks',
        completionRate: 65,
        modules: [
            { id: 'mod1', title: 'Advanced React Patterns', status: 'completed' },
            { id: 'mod2', title: 'Node.js Microservices', status: 'in_progress' },
            { id: 'mod3', title: 'Database Design', status: 'locked' },
            { id: 'mod4', title: 'Deployment & DevOps', status: 'locked' }
        ]
    },
    {
        id: 'p2',
        name: 'Data Science Fundamentals',
        description: 'Learn the basics of data analysis, visualization, and machine learning.',
        skillTags: ['Python', 'Data Analysis', 'ML'],
        difficulty: 'Intermediate',
        estimatedDuration: '10 weeks',
        completionRate: 45,
        modules: [
            { id: 'mod5', title: 'Python for Data Science', status: 'completed' },
            { id: 'mod6', title: 'Data Visualization with Matplotlib', status: 'in_progress' },
            { id: 'mod7', title: 'Intro to Machine Learning', status: 'locked' }
        ]
    },
    {
        id: 'p3',
        name: 'UI/UX Design Principles',
        description: 'Understand the core principles of designing user-friendly interfaces.',
        skillTags: ['UI/UX Design', 'Figma'],
        difficulty: 'Beginner',
        estimatedDuration: '6 weeks',
        completionRate: 80,
        modules: [
            { id: 'mod8', title: 'Design Thinking', status: 'completed' },
            { id: 'mod9', title: 'Wireframing & Prototyping', status: 'completed' },
            { id: 'mod10', title: 'Visual Design Basics', status: 'in_progress' }
        ]
    },
    {
        id: 'p4',
        name: 'DevOps & Cloud',
        description: 'Learn how to deploy, scale, and manage applications in the cloud.',
        skillTags: ['DevOps', 'Cloud Computing', 'AWS'],
        difficulty: 'Advanced',
        estimatedDuration: '14 weeks',
        completionRate: 40,
        modules: [
            { id: 'mod11', title: 'Linux Fundamentals', status: 'completed' },
            { id: 'mod12', title: 'Docker & Containers', status: 'in_progress' },
            { id: 'mod13', title: 'Kubernetes Orchestration', status: 'locked' }
        ]
    },
    {
        id: 'p5',
        name: 'Agile Leadership',
        description: 'Develop the skills needed to lead agile teams effectively.',
        skillTags: ['Project Management', 'Agile', 'Leadership'],
        difficulty: 'Intermediate',
        estimatedDuration: '8 weeks',
        completionRate: 90,
        modules: [
            { id: 'mod14', title: 'Agile Manifesto', status: 'completed' },
            { id: 'mod15', title: 'Scrum Framework', status: 'completed' },
            { id: 'mod16', title: 'Team Dynamics', status: 'completed' }
        ]
    },
    {
        id: 'p6',
        name: 'Modern Marketing',
        description: 'Strategies for digital marketing in the modern age.',
        skillTags: ['Marketing', 'SEO', 'Content'],
        difficulty: 'Beginner',
        estimatedDuration: '5 weeks',
        completionRate: 75,
        modules: [
            { id: 'mod17', title: 'Digital Landscape', status: 'completed' },
            { id: 'mod18', title: 'Content Strategy', status: 'in_progress' }
        ]
    }
];

export const tasks = [
    {
        id: 't1',
        title: 'Complete React Advanced Module',
        description: 'Finish the final project for the Advanced React Patterns module.',
        assignedTo: 'm1',
        skillFocus: 'React',
        dueDate: '2023-11-30',
        status: 'In Progress',
        pathId: 'p1'
    },
    {
        id: 't2',
        title: 'Review PR #452',
        description: 'Code review for the new authentication service.',
        assignedTo: 'm4',
        skillFocus: 'Node.js',
        dueDate: '2023-11-25',
        status: 'Pending',
        pathId: null
    },
    {
        id: 't3',
        title: 'Design System Update',
        description: 'Update the button component variants in Figma.',
        assignedTo: 'm5',
        skillFocus: 'UI/UX Design',
        dueDate: '2023-11-28',
        status: 'Completed',
        pathId: 'p3'
    },
    {
        id: 't4',
        title: 'Data Pipeline Optimization',
        description: 'Optimize the ETL process for faster processing.',
        assignedTo: 'm3',
        skillFocus: 'Data Analysis',
        dueDate: '2023-12-05',
        status: 'In Progress',
        pathId: 'p2'
    },
    {
        id: 't5',
        title: 'Setup CI/CD Pipeline',
        description: 'Configure GitHub Actions for the main repository.',
        assignedTo: 'm6',
        skillFocus: 'DevOps',
        dueDate: '2023-11-29',
        status: 'Pending',
        pathId: 'p4'
    },
    {
        id: 't6',
        title: 'User Research Interviews',
        description: 'Conduct 5 user interviews for the new feature.',
        assignedTo: 'm11',
        skillFocus: 'UI/UX Design',
        dueDate: '2023-12-01',
        status: 'Pending',
        pathId: 'p3'
    },
    {
        id: 't7',
        title: 'Write Unit Tests',
        description: 'Increase test coverage for the payment module.',
        assignedTo: 'm7',
        skillFocus: 'React',
        dueDate: '2023-11-27',
        status: 'Completed',
        pathId: null
    },
    {
        id: 't8',
        title: 'Prepare Sprint Retrospective',
        description: 'Gather metrics and feedback for the retro.',
        assignedTo: 'm2',
        skillFocus: 'Project Management',
        dueDate: '2023-11-24',
        status: 'Completed',
        pathId: 'p5'
    },
    {
        id: 't9',
        title: 'Analyze Churn Rate',
        description: 'Deep dive into last month\'s churn numbers.',
        assignedTo: 'm9',
        skillFocus: 'Data Analysis',
        dueDate: '2023-12-02',
        status: 'In Progress',
        pathId: null
    },
    {
        id: 't10',
        title: 'Migrate to TypeScript',
        description: 'Convert core utilities to TypeScript.',
        assignedTo: 'm10',
        skillFocus: 'React',
        dueDate: '2023-12-10',
        status: 'In Progress',
        pathId: 'p1'
    },
    {
        id: 't11',
        title: 'Security Audit',
        description: 'Run automated security scans and fix critical issues.',
        assignedTo: 'm12',
        skillFocus: 'Cloud Computing',
        dueDate: '2023-12-03',
        status: 'Pending',
        pathId: 'p4'
    },
    {
        id: 't12',
        title: 'Create Marketing Assets',
        description: 'Design banners for the holiday campaign.',
        assignedTo: 'm5',
        skillFocus: 'UI/UX Design',
        dueDate: '2023-11-26',
        status: 'Completed',
        pathId: null
    },
    {
        id: 't13',
        title: 'Update Documentation',
        description: 'Refresh the API documentation.',
        assignedTo: 'm1',
        skillFocus: 'Node.js',
        dueDate: '2023-11-29',
        status: 'Pending',
        pathId: null
    },
    {
        id: 't14',
        title: 'Optimize Database Queries',
        description: 'Fix slow queries in the reporting module.',
        assignedTo: 'm4',
        skillFocus: 'Node.js',
        dueDate: '2023-12-04',
        status: 'In Progress',
        pathId: 'p1'
    },
    {
        id: 't15',
        title: 'Plan Q1 Roadmap',
        description: 'Draft the product roadmap for the next quarter.',
        assignedTo: 'm8',
        skillFocus: 'Project Management',
        dueDate: '2023-12-15',
        status: 'Pending',
        pathId: null
    }
];

export const analytics = {
    memberGrowth: [
        { name: 'Jun', value: 10 },
        { name: 'Jul', value: 15 },
        { name: 'Aug', value: 22 },
        { name: 'Sep', value: 35 },
        { name: 'Oct', value: 48 },
        { name: 'Nov', value: 65 }
    ],
    skillsDistribution: [
        { name: 'React', value: 35 },
        { name: 'Node.js', value: 25 },
        { name: 'Python', value: 20 },
        { name: 'Design', value: 15 },
        { name: 'DevOps', value: 5 }
    ],
    weeklyActiveMembers: [
        { name: 'W1', value: 45 },
        { name: 'W2', value: 52 },
        { name: 'W3', value: 48 },
        { name: 'W4', value: 60 },
        { name: 'W5', value: 58 },
        { name: 'W6', value: 65 },
        { name: 'W7', value: 72 },
        { name: 'W8', value: 80 }
    ],
    engagementByChannel: [
        { channel: 'General', messages: 1250, activeMembers: 45 },
        { channel: 'Engineering', messages: 850, activeMembers: 28 },
        { channel: 'Design', messages: 420, activeMembers: 12 },
        { channel: 'Random', messages: 350, activeMembers: 30 }
    ],
    pathCompletionStats: [
        { name: 'Full Stack', completed: 15, inProgress: 25 },
        { name: 'Data Science', completed: 8, inProgress: 12 },
        { name: 'UI/UX', completed: 20, inProgress: 10 },
        { name: 'DevOps', completed: 5, inProgress: 15 }
    ],
    insightsFeed: [
        { id: 1, title: 'High Engagement', description: 'Weekly active members increased by 15% this week.', tag: 'Growth', icon: 'TrendingUp' },
        { id: 2, title: 'Skill Gap Detected', description: 'Low proficiency in DevOps across the engineering team.', tag: 'Alert', icon: 'AlertTriangle' },
        { id: 3, title: 'Popular Path', description: '"Full Stack Mastery" has the highest completion rate (65%).', tag: 'Success', icon: 'Award' },
        { id: 4, title: 'New Certification', description: 'Sarah Chen completed "Advanced React Patterns".', tag: 'Achievement', icon: 'CheckSquare' },
        { id: 5, title: 'Retention Risk', description: '3 members haven\'t logged in for 14 days.', tag: 'Warning', icon: 'Users' },
        { id: 6, title: 'Productivity Spike', description: 'Task completion rate is up 20% compared to last month.', tag: 'Productivity', icon: 'Zap' },
        { id: 7, title: 'New Interest', description: 'Growing interest in "Machine Learning" among frontend devs.', tag: 'Trend', icon: 'TrendingUp' },
        { id: 8, title: 'Feedback Received', description: 'Positive feedback on the new "Agile Leadership" path.', tag: 'Feedback', icon: 'MessageSquare' }
    ]
};

// --- Helper Functions ---

export const getMemberById = (id) => members.find(m => m.id === id);
export const getTaskById = (id) => tasks.find(t => t.id === id);
export const getPathById = (id) => learningPaths.find(p => p.id === id);
export const getTasksByMember = (memberId) => tasks.filter(t => t.assignedTo === memberId);

// --- Demo Mode Helper ---
export const simulateGrowth = (data) => {
    // Deep copy to avoid mutating original
    const newData = JSON.parse(JSON.stringify(data));

    // Boost numbers by ~10%
    newData.memberGrowth = newData.memberGrowth.map(d => ({ ...d, value: Math.round(d.value * 1.1) }));
    newData.weeklyActiveMembers = newData.weeklyActiveMembers.map(d => ({ ...d, value: Math.round(d.value * 1.1) }));

    return newData;
};

export const settings = {
    theme: 'black-blue',
    accentColor: '#3B82F6',
    dbConnectionString: '',
    webhookUrl: '',
    botEnabled: true,
    inAppNotifications: true,
    emailNotifications: false
};

export const insightsFeed = analytics.insightsFeed;
