# LuchtLeven - Cystic Fibrosis Health Platform

## Project Overview
LuchtLeven is a comprehensive web platform designed to improve the lives of CF patients in the Netherlands through health tracking, AI-based analysis, and personalized guidance. The platform serves both patients and healthcare providers, offering a secure, professional, and engaging experience.

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: React + Tailwind CSS
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide Icons
- **Date Handling**: date-fns

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Authentication**: NextAuth.js + Supabase Auth
- **Real-time**: Supabase Realtime
- **File Storage**: Supabase Storage

### AI & Analytics
- **Health Analysis**: OpenAI GPT-4
- **Chatbot**: OpenAI GPT-4 + LangChain
- **Analytics**: Vercel Analytics
- **Monitoring**: Sentry

### DevOps
- **Hosting**: Vercel
- **CI/CD**: GitHub Actions
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript

## Project Structure
```
luchtleven/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── (marketing)/       # Public marketing pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── forms/            # Form components
│   ├── charts/           # Chart components
│   └── features/         # Feature-specific components
├── lib/                   # Utility functions
├── hooks/                # Custom React hooks
├── styles/               # Global styles
├── types/                # TypeScript types
├── prisma/               # Database schema
├── public/               # Static assets
└── config/               # Configuration files
```

## Database Schema

### Users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  role ENUM('patient', 'doctor', 'admin'),
  name TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Patient Profiles
```sql
CREATE TABLE patient_profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  date_of_birth DATE,
  gender TEXT,
  weight DECIMAL,
  height DECIMAL,
  conditions TEXT[],
  medications TEXT[],
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Health Records
```sql
CREATE TABLE health_records (
  id UUID PRIMARY KEY,
  patient_id UUID REFERENCES patient_profiles(id),
  fvc DECIMAL,
  fev1 DECIMAL,
  fev1_fvc_ratio DECIMAL,
  date DATE,
  notes TEXT,
  created_at TIMESTAMP
);
```

### Medications
```sql
CREATE TABLE medications (
  id UUID PRIMARY KEY,
  patient_id UUID REFERENCES patient_profiles(id),
  name TEXT,
  dosage TEXT,
  frequency TEXT,
  start_date DATE,
  end_date DATE,
  reminder_time TIME,
  created_at TIMESTAMP
);
```

### Appointments
```sql
CREATE TABLE appointments (
  id UUID PRIMARY KEY,
  patient_id UUID REFERENCES patient_profiles(id),
  doctor_id UUID REFERENCES users(id),
  date TIMESTAMP,
  type TEXT,
  notes TEXT,
  status TEXT,
  created_at TIMESTAMP
);
```

### Messages
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY,
  sender_id UUID REFERENCES users(id),
  receiver_id UUID REFERENCES users(id),
  content TEXT,
  read BOOLEAN,
  created_at TIMESTAMP
);
```

## Pages & Routes

### Public Pages
- Home (/)
- About (/over-ons)
- Contact (/contact)
- Blog (/blog)
- Login (/login)
- Register (/registreren)

### Patient Dashboard
- Overview (/dashboard)
- Health Profile (/dashboard/profiel)
- Health Records (/dashboard/gezondheid)
- Medications (/dashboard/medicijnen)
- Exercises (/dashboard/oefeningen)
- Nutrition (/dashboard/voeding)
- Progress (/dashboard/vooruitgang)
- Chat (/dashboard/chat)
- Calendar (/dashboard/agenda)
- Settings (/dashboard/instellingen)

### Doctor Dashboard
- Overview (/doctor)
- Patients (/doctor/patienten)
- Patient Details (/doctor/patienten/[id])
- Appointments (/doctor/afspraken)
- Messages (/doctor/berichten)
- Analytics (/doctor/analytics)
- Settings (/doctor/instellingen)

## Design System

### Colors
- Primary: #2B6CB0 (Trust Blue)
- Secondary: #48BB78 (Health Green)
- Accent: #F6AD55 (Warm Orange)
- Background: #F7FAFC (Light) / #1A202C (Dark)
- Text: #2D3748 (Light) / #F7FAFC (Dark)

### Typography
- Primary Font: Inter (Modern, Clean)
- Secondary Font: Source Sans Pro (Readable, Friendly)
- Scale: 12px, 14px, 16px, 18px, 20px, 24px, 30px, 36px

### Components
- Buttons (Primary, Secondary, Ghost)
- Cards (Profile, Health, Progress)
- Forms (Input, Select, Checkbox)
- Navigation (Sidebar, Topbar)
- Charts (Line, Bar, Progress)
- Modals (Alert, Confirm, Form)

## Features Implementation

### Phase 1: Core Platform
1. User Authentication
2. Basic Profiles
3. Health Records
4. Medication Tracking
5. Basic Dashboard

### Phase 2: Advanced Features
1. AI Health Analysis
2. Exercise Programs
3. Nutrition Tracking
4. Doctor-Patient Chat
5. Appointment System

### Phase 3: Gamification & Integration
1. Points System
2. Progress Tracking
3. Health App Integration
4. Advanced Analytics
5. AI Chatbot

## Content Strategy

### Tone of Voice
- Professional yet approachable
- Clear and concise
- Encouraging and supportive
- Educational and informative
- Trustworthy and reliable

### Content Types
- Educational Articles
- Health Tips
- Success Stories
- Research Updates
- Exercise Guides
- Nutrition Advice

## Development Workflow

1. **Setup**
   - Initialize Next.js project
   - Configure TypeScript
   - Set up Tailwind CSS
   - Configure ESLint & Prettier
   - Set up Git hooks

2. **Development**
   - Feature branches
   - Component-driven development
   - Test-driven development
   - Regular code reviews
   - Daily standups

3. **Deployment**
   - Vercel preview deployments
   - Staging environment
   - Production deployment
   - Monitoring setup
   - Analytics integration

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run development server: `npm run dev`
5. Build for production: `npm run build`

## Environment Variables
```
DATABASE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
OPENAI_API_KEY=
```

## Contributing
Please read our contributing guidelines before submitting pull requests.

## License
Proprietary - All rights reserved 