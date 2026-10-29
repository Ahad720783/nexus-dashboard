/**
 * Mock Data Repository
 * All initial mock seed data for users, analytics, dashboard metrics, activities, and settings.
 * In production with a real backend, this file can be removed or kept for offline testing/storybook.
 */

export const users = [
  {
    id: 1,
    name: "Alex Morgan",
    email: "alex.morgan@nexus.io",
    role: "Super Admin",
    department: "Executive",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    joinedDate: "2023-01-15",
    lastActive: "Just now"
  },
  {
    id: 2,
    name: "Elena Rostova",
    email: "elena.r@nexus.io",
    role: "Admin",
    department: "Engineering",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 345-6789",
    location: "Seattle, WA",
    joinedDate: "2023-03-22",
    lastActive: "12 mins ago"
  },
  {
    id: 3,
    name: "Marcus Vance",
    email: "marcus.vance@nexus.io",
    role: "Manager",
    department: "Product",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 456-7890",
    location: "Austin, TX",
    joinedDate: "2023-05-10",
    lastActive: "1 hour ago"
  },
  {
    id: 4,
    name: "Sophia Chen",
    email: "sophia.chen@nexus.io",
    role: "Editor",
    department: "Design",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 567-8901",
    location: "New York, NY",
    joinedDate: "2023-06-18",
    lastActive: "3 hours ago"
  },
  {
    id: 5,
    name: "David Kim",
    email: "david.kim@nexus.io",
    role: "Viewer",
    department: "Marketing",
    status: "Inactive",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 678-9012",
    location: "Chicago, IL",
    joinedDate: "2023-08-04",
    lastActive: "2 days ago"
  },
  {
    id: 6,
    name: "Amara Diallo",
    email: "amara.diallo@nexus.io",
    role: "Admin",
    department: "Engineering",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 789-0123",
    location: "Denver, CO",
    joinedDate: "2023-09-12",
    lastActive: "30 mins ago"
  },
  {
    id: 7,
    name: "Lucas Silva",
    email: "lucas.silva@nexus.io",
    role: "Editor",
    department: "Sales",
    status: "Suspended",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 890-1234",
    location: "Miami, FL",
    joinedDate: "2023-10-01",
    lastActive: "1 week ago"
  },
  {
    id: 8,
    name: "Rachel Green",
    email: "rachel.g@nexus.io",
    role: "Manager",
    department: "Operations",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 901-2345",
    location: "Boston, MA",
    joinedDate: "2023-11-19",
    lastActive: "5 hours ago"
  },
  {
    id: 9,
    name: "Tariq Mansour",
    email: "tariq.m@nexus.io",
    role: "Viewer",
    department: "Support",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 012-3456",
    location: "Toronto, CA",
    joinedDate: "2024-01-08",
    lastActive: "45 mins ago"
  },
  {
    id: 10,
    name: "Chloe Dupont",
    email: "chloe.dupont@nexus.io",
    role: "Editor",
    department: "Product",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 123-4567",
    location: "Paris, FR",
    joinedDate: "2024-02-14",
    lastActive: "4 hours ago"
  },
  {
    id: 11,
    name: "Liam O'Connor",
    email: "liam.oc@nexus.io",
    role: "Admin",
    department: "Security",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 234-9876",
    location: "Dublin, IE",
    joinedDate: "2024-03-01",
    lastActive: "10 mins ago"
  },
  {
    id: 12,
    name: "Priya Sharma",
    email: "priya.s@nexus.io",
    role: "Manager",
    department: "Engineering",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 345-8765",
    location: "Bangalore, IN",
    joinedDate: "2024-04-11",
    lastActive: "20 mins ago"
  }
];

export const currentUser = {
  id: 1,
  name: "Alex Morgan",
  email: "alex.morgan@nexus.io",
  role: "Super Admin",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  title: "Chief Technology Officer",
  department: "Executive",
  phone: "+1 (555) 234-5678",
  location: "San Francisco, CA",
  bio: "Leading technology initiatives and digital transformation. Passionate about scalable architecture and high-performance design systems.",
  timezone: "America/Los_Angeles (GMT-7)",
  language: "English (US)",
  theme: "light",
  notifications: {
    emailAlerts: true,
    securityAlerts: true,
    weeklyDigest: false,
    desktopPush: true
  }
};

export const dashboardStats = [
  {
    id: "revenue",
    title: "Total Revenue",
    value: "$124,592",
    rawNumber: 124592,
    change: "+14.8%",
    trend: "up",
    timeframe: "vs last month",
    icon: "DollarSign"
  },
  {
    id: "users",
    title: "Active Users",
    value: "14,820",
    rawNumber: 14820,
    change: "+9.2%",
    trend: "up",
    timeframe: "vs last month",
    icon: "Users"
  },
  {
    id: "conversion",
    title: "Conversion Rate",
    value: "3.42%",
    rawNumber: 3.42,
    change: "+0.8%",
    trend: "up",
    timeframe: "vs last month",
    icon: "TrendingUp"
  },
  {
    id: "server_uptime",
    title: "System Uptime",
    value: "99.98%",
    rawNumber: 99.98,
    change: "-0.01%",
    trend: "down",
    timeframe: "30-day average",
    icon: "Activity"
  }
];

export const revenueAnalytics = [
  { month: "Jan", revenue: 65000, target: 60000, expenses: 42000 },
  { month: "Feb", revenue: 72000, target: 65000, expenses: 44000 },
  { month: "Mar", revenue: 84000, target: 70000, expenses: 49000 },
  { month: "Apr", revenue: 79000, target: 75000, expenses: 46000 },
  { month: "May", revenue: 95000, target: 80000, expenses: 51000 },
  { month: "Jun", revenue: 104000, target: 85000, expenses: 55000 },
  { month: "Jul", revenue: 112000, target: 90000, expenses: 58000 },
  { month: "Aug", revenue: 118000, target: 95000, expenses: 60000 },
  { month: "Sep", revenue: 124592, target: 100000, expenses: 62000 },
];

export const recentActivities = [
  {
    id: 101,
    user: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    action: "deployed release",
    target: "v2.8.4 to Production",
    timestamp: "10 minutes ago",
    type: "system"
  },
  {
    id: 102,
    user: "Alex Morgan",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    action: "updated role for",
    target: "Marcus Vance (Manager)",
    timestamp: "45 minutes ago",
    type: "user"
  },
  {
    id: 103,
    user: "Rachel Green",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    action: "generated quarterly financial report",
    target: "Q3_Revenue_Audit.pdf",
    timestamp: "2 hours ago",
    type: "file"
  },
  {
    id: 104,
    user: "David Kim",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    action: "requested access to",
    target: "Financial Analytics Board",
    timestamp: "5 hours ago",
    type: "security"
  },
  {
    id: 105,
    user: "Security GuardBot",
    avatar: null,
    action: "blocked suspicious IP address",
    target: "192.168.4.12",
    timestamp: "8 hours ago",
    type: "alert"
  }
];

export const recentTransactions = [
  {
    id: "TX-9481",
    customer: "Starlight Technologies",
    contact: "billing@starlight.io",
    plan: "Enterprise Annual",
    amount: "$24,000",
    status: "Completed",
    date: "2024-09-20"
  },
  {
    id: "TX-9480",
    customer: "HyperScale Ventures",
    contact: "finance@hyperscale.co",
    plan: "Growth Pro",
    amount: "$3,499",
    status: "Completed",
    date: "2024-09-19"
  },
  {
    id: "TX-9479",
    customer: "Apex Global Labs",
    contact: "accounts@apexlabs.org",
    plan: "Enterprise Monthly",
    amount: "$2,850",
    status: "Processing",
    date: "2024-09-19"
  },
  {
    id: "TX-9478",
    customer: "OmniCorp Software",
    contact: "payables@omnicorp.dev",
    plan: "Starter Team",
    amount: "$890",
    status: "Completed",
    date: "2024-09-18"
  },
  {
    id: "TX-9477",
    customer: "Vanguard Design Co",
    contact: "hello@vanguard.studio",
    plan: "Growth Pro",
    amount: "$3,499",
    status: "Failed",
    date: "2024-09-17"
  }
];

export const notificationsList = [
  {
    id: "notif-1",
    title: "New Team Member Invited",
    description: "Elena Rostova accepted your invitation to join Engineering.",
    time: "5m ago",
    read: false,
    type: "user"
  },
  {
    id: "notif-2",
    title: "Database Backup Completed",
    description: "Automated snapshot backup was completed successfully (2.4 GB).",
    time: "1h ago",
    read: false,
    type: "success"
  },
  {
    id: "notif-3",
    title: "Storage Warning",
    description: "Cloud storage volume is at 82% capacity.",
    time: "4h ago",
    read: true,
    type: "warning"
  }
];

export const initialApiKeys = [
  {
    id: "key-1",
    name: "Production Webhook",
    prefix: "nx_live_9984",
    created: "2024-02-10",
    lastUsed: "2 mins ago",
    status: "Active"
  },
  {
    id: "key-2",
    name: "Staging Pipeline",
    prefix: "nx_test_4182",
    created: "2024-05-18",
    lastUsed: "3 days ago",
    status: "Active"
  },
  {
    id: "key-3",
    name: "Legacy Analytics Sync",
    prefix: "nx_live_1092",
    created: "2023-11-04",
    lastUsed: "1 month ago",
    status: "Revoked"
  }
];
