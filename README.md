# Nexus Admin - Enterprise SaaS Frontend Application

A production-grade, highly responsive administrative SaaS frontend built with **React (JavaScript) + Vite + Tailwind CSS + React Router + Lucide Icons**.

The application currently operates on a decoupled **Mock Data & Service Layer**, engineered so that a real backend REST or GraphQL API can be connected seamlessly by updating the service files without redesigning or rewriting any UI components.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Launch

```bash
# 1. Navigate to the project directory
cd "nexus-dashboard"

# 2. Install dependencies
npm install

# 3. Start the local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠 Tech Stack

- **Framework**: [React 18](https://react.dev/) (Functional Components & Hooks)
- **Language**: JavaScript (ES Modules, strictly no TypeScript as requested)
- **Bundler / Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

```text
src/
├── assets/                    # Static assets & icons
├── components/
│   ├── common/                # Reusable UI component library
│   │   ├── Badge.jsx          # Status pills & semantic tags with dot indicators
│   │   ├── Button.jsx         # Buttons (primary, secondary, outline, ghost, danger, loading spinner)
│   │   ├── Card.jsx           # Cards with headers, footers, and hover elevation
│   │   ├── ConfirmationDialog.jsx # Specialized modal for dangerous actions
│   │   ├── Dropdown.jsx       # Custom accessible select menu
│   │   ├── Input.jsx          # Form inputs (text, email, password toggle, select, textarea)
│   │   ├── Loader.jsx         # Full-screen & inline animated loading spinners
│   │   ├── Modal.jsx          # Accessible dialog modals with backdrop blur & ESC dismiss
│   │   ├── Pagination.jsx     # Pagination bar with page jumping & records count
│   │   ├── SearchBar.jsx      # Debounced search bar with clear button & shortcut key
│   │   ├── Skeleton.jsx       # Card & table row skeleton placeholders
│   │   ├── Table.jsx          # Sortable data table with loading & empty states
│   │   └── Toast.jsx          # Toast notification alerts
│   └── layout/                # Layout components
│       ├── MobileNav.jsx      # Slide-out drawer for tablet/mobile viewports
│       ├── Navbar.jsx         # Sticky top header with notifications & profile dropdown
│       ├── NotificationDropdown.jsx # Real-time notification menu with unread badges
│       └── Sidebar.jsx        # Enterprise dark sidebar with active link indicators
├── context/
│   ├── AuthContext.jsx        # Global authentication state provider
│   └── ToastContext.jsx       # Global toast notification queue
├── data/
│   └── mockData.js            # Initial mock dataset (users, KPIs, charts, activity logs)
├── hooks/
│   ├── useAuth.js             # Authentication consumer hook
│   ├── useDebounce.js         # Input debouncing hook
│   ├── useToast.js            # Toast alert trigger hook
│   └── useUsers.js            # Dedicated hook encapsulating user state, filters, & mutations
├── layouts/
│   ├── AuthLayout.jsx         # Split-screen auth layout for Login & Register
│   └── DashboardLayout.jsx    # Responsive application shell layout
├── pages/
│   ├── Analytics.jsx          # Conversion funnel, traffic breakdown & server health
│   ├── Dashboard.jsx          # KPI metrics, revenue charts, activity log, transactions
│   ├── Login.jsx              # Sign-in form with demo 1-click auto-fill
│   ├── NotFound.jsx           # 404 error fallback page
│   ├── Profile.jsx            # User profile, password management, notification toggles
│   ├── Register.jsx           # Account creation with password confirmation & validation
│   ├── Settings.jsx           # Workspace config, API key generator & cache management
│   └── Users.jsx              # Full CRUD user management with search, filter, CSV export
├── routes/
│   ├── AppRoutes.jsx          # Route definitions
│   └── ProtectedRoute.jsx     # Route authentication guard
├── services/                  # Backend-Ready Service Layer
│   ├── api.js                 # Central API client config (VITE_API_BASE_URL) & delay simulator
│   ├── authService.js         # Auth handlers (login, register, logout, update profile)
│   ├── dashboardService.js    # Statistics, charts, and activity feeds
│   ├── settingsService.js     # Workspace parameters and developer API keys
│   └── userService.js         # User CRUD, pagination, filtering, and CSV generation
├── utils/
│   ├── formatters.js          # Currency, date, numbers, and initials formatters
│   ├── storage.js             # Safe localStorage abstraction for mock persistence
│   └── validators.js          # Email, password, and required field validators
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🔌 Connecting a Real Backend Later

The application is architected according to the strict flow:
```text
UI Component  ──>  Custom Hook  ──>  Service Layer  ──>  Mock Data (Now)
                                                    ──>  Real Backend API (Later)
```

### Steps to Switch to a Real Backend:

1. Open `.env` and specify your backend API URL:
   ```env
   VITE_API_BASE_URL=https://api.yourdomain.com/v1
   ```

2. In `src/services/api.js`, the `apiClient` (`get`, `post`, `put`, `delete`) already handles `Bearer` token injection and base URL resolution.

3. Update the functions inside `src/services/userService.js`:
   ```javascript
   // Before (Mock):
   export const getUsers = async (params) => {
     await delay(300);
     return mockFilteredUsers;
   };

   // After (Real API):
   export const getUsers = async (params) => {
     const query = new URLSearchParams(params).toString();
     return apiClient.get(`/users?${query}`);
   };
   ```

**Zero UI components need to be modified.**

---

## 🌟 Pages & Key Features

| Page | URL | Description |
| :--- | :--- | :--- |
| **Login** | `/login` | Email/password sign-in with live validation, demo auto-fill button, and session storage. |
| **Register** | `/register` | Account onboarding with password strength validation and department selection. |
| **Dashboard** | `/` or `/dashboard` | KPI stat cards, interactive SVG revenue chart, recent activities, and transaction table. |
| **User Management** | `/users` | Paginated user table, debounced search, role/status filters, Add User modal, Edit User modal, Delete confirmation dialog, and CSV export. |
| **Analytics** | `/analytics` | User conversion funnel, traffic channel breakdown, and global infrastructure health telemetry. |
| **Profile** | `/profile` | Profile details editor, password updater with validation, and notification preference toggles. |
| **Settings** | `/settings` | Workspace organization configuration, API keys generator/revoker, and client cache purge. |
| **404 Page** | `*` | Graceful fallback route with return navigation. |

---

## 🛡️ Form Validation & Interactive States

- **Validation**: All forms include client-side validation for required fields, email formatting, and password constraints.
- **States**: Buttons and forms display loading spinners during simulated network delay and disable interactive elements to prevent duplicate submissions.
- **Toasts**: Instant feedback upon create, edit, delete, export, or login actions.
- **Data Persistence**: Changes made to users, profile, settings, and API keys are stored in `localStorage` so they persist through browser refreshes.
