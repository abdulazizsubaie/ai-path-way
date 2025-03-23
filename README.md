# Career Pathway AI Assistant for Saudi Students

A full-stack web application designed to help Saudi students identify and pursue optimal career paths aligned with Vision 2030 and the local job market.

## Project Overview

The Career Pathway AI Assistant analyzes structured career data relevant to Saudi Arabia and provides personalized career recommendations aligned with the local job market, industry demands, and cultural considerations.

### Key Features

- **Personalized Career Recommendations**: Based on user profiles, skills, and interests
- **Vision 2030 Alignment**: Career paths aligned with Saudi Arabia's strategic goals
- **Comparative Analysis**: Comparison of salary ranges, market demand, and growth potential
- **Actionable Next Steps**: Tailored advice for Saudi students, including relevant training and certifications

## Project Structure

The project is organized into two main parts:

### Backend (Node.js/Express/MongoDB)

- **Models**: User, UserProfile, Career
- **Controllers**: User, Profile, Career
- **Routes**: API endpoints for users, profiles, and careers
- **Middleware**: Authentication, error handling
- **Config**: Database connection, environment variables

### Frontend (React)

- **Components**: Reusable UI components (Navbar, Footer, etc.)
- **Pages**: Main application views (Home, About, UserList, UserDetail, etc.)
- **Services**: API communication
- **Utils**: Helper functions

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB
- npm or yarn

### Quick Setup (Recommended)

1. Clone the repository:
   ```
   git clone <repository-url>
   cd real-vscod
   ```

2. Check if your system meets all requirements:
   ```
   npm run check
   ```

3. Run the setup script:
   ```
   npm run setup
   ```
   
   This script will:
   - Install all dependencies
   - Set up environment variables
   - Import sample data
   - Start the application

4. Open your browser and navigate to `http://localhost:3000`

### Manual Installation

If you prefer to set up the application manually, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd real-vscod
   ```

2. Install all dependencies:
   ```
   npm run install-all
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/career-pathway
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   ```

4. Import sample data:
   ```
   npm run data:import
   ```

5. Start the application:
   ```
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a single user
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

### Profiles
- `GET /api/profiles` - Get all profiles (admin only)
- `GET /api/profiles/:id` - Get a single profile
- `GET /api/profiles/user/:userId` - Get profile by user ID
- `POST /api/profiles` - Create a new profile
- `PUT /api/profiles/:id` - Update a profile
- `DELETE /api/profiles/:id` - Delete a profile
- `PUT /api/profiles/:id/skills` - Update profile skills
- `PUT /api/profiles/:id/interests` - Update profile interests
- `PUT /api/profiles/:id/experience` - Add experience to profile
- `DELETE /api/profiles/:id/experience/:expId` - Delete experience from profile
- `PUT /api/profiles/:id/certifications` - Add certification to profile
- `DELETE /api/profiles/:id/certifications/:certId` - Delete certification from profile

### Careers
- `GET /api/careers` - Get all careers
- `GET /api/careers/:id` - Get a single career
- `POST /api/careers` - Create a new career (admin only)
- `PUT /api/careers/:id` - Update a career (admin only)
- `DELETE /api/careers/:id` - Delete a career (admin only)
- `GET /api/careers/recommendations/:userId` - Get career recommendations for a user
- `GET /api/careers/data/industries` - Get all industries
- `GET /api/careers/data/roles` - Get all job roles
- `GET /api/careers/data/skills` - Get skills in demand

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)

### Frontend
- React
- React Router
- Axios
- CSS

## Future Enhancements

- User authentication with JWT
- Admin dashboard for managing career data
- Advanced recommendation algorithm
- Integration with job posting APIs
- Mobile application

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Saudi Vision 2030
- Ministry of Education, Saudi Arabia
- Saudi Data and AI Authority (SDAIA)
