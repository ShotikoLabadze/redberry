# Redberry Bootcamp Platform

A full-stack, responsive course management application built with **React**, **TypeScript**, and a **Service-Based Architecture**. The platform allows users to browse courses, filter by complex criteria, manage their profiles, and enroll in courses with a smart scheduling system.

## 🚀 Technical Highlights

- **Smart Enrollment Logic**: A multi-step (dependent selection) process that guides users through selecting a weekly schedule, time slot, and session type.
- **Conflict Management**: Implemented backend-integrated conflict detection (HTTP 409) that prevents users from enrolling in overlapping course schedules.
- **URL-Based State Management**: Search filters (categories, topics, instructors) are synchronized with the URL using `useSearchParams` for persistent state and deep linking.
- **Parallel Data Fetching**: Optimized initial loading times by using `Promise.all` for concurrent API requests.
- **Responsive & Accessible UI**: A mobile-friendly design with conditional rendering for authorized vs. guest users.

## 🛠️ How to Run the Project

Follow these steps to get the project running locally on your machine.

### 1. Clone the Repository

First, clone the project from GitHub:

```bash
git clone [your_github_link]
cd [project_name]
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Application

```bash
npm start
```

## 📁 Project Structure

```text
src/
├── api/             # Service-based architecture for API calls
│   ├── auth.service.ts
│   └── course.service.ts
├── assets/          # Static assets (Icons, Images)
├── components/      # Reusable UI components
│   ├── Catalog/     # URL-synced filtering logic
│   ├── Enrollment/  # Complex multi-step enrollment system
│   └── ...
├── context/         # React Context for global state
├── layout/          # Common layout components (Navbar, Footer)
└── utils/           # Helper functions (Formatters, dynamic URL generators)
```
