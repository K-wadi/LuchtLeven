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
- **Analytics**: PostHog
- **Error Tracking**: Sentry

### DevOps & Infrastructure
- **Hosting**: Vercel
- **CI/CD**: GitHub Actions
- **Monitoring**: Vercel Analytics
- **Testing**: Jest + React Testing Library
- **E2E Testing**: Playwright

## Project Structure
```
luchtleven/
├── app/                    # Next.js app directory
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
│   ├── api/              # API utilities
│   ├── auth/             # Auth utilities
│   ├── db/               # Database utilities
│   └── utils/            # General utilities
├── hooks/                # Custom React hooks
├── styles/               # Global styles
├── types/                # TypeScript types
├── prisma/               # Database schema
└── public/               # Static assets
```

## Database Schema

### Users
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  role          UserRole  @default(PATIENT)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  profile       Profile?
  healthData    HealthData[]
  medications   Medication[]
  appointments  Appointment[]
  messages      Message[]
}
```

### Profiles
```prisma
model Profile {
  id            String    @id @default(cuid())
  userId        String    @unique
  user          User      @relation(fields: [userId], references: [id])
  dateOfBirth   DateTime?
  gender        Gender?
  height        Float?
  weight        Float?
  conditions    String[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### Health Data
```prisma
model HealthData {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  type          HealthDataType
  value         Float
  unit          String
  recordedAt    DateTime
  notes         String?
  createdAt     DateTime  @default(now())
}
```

### Medications
```prisma
model Medication {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  name          String
  dosage        String
  frequency     String
  startDate     DateTime
  endDate       DateTime?
  reminders     Reminder[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### Appointments
```prisma
model Appointment {
  id            String    @id @default(cuid())
  patientId     String
  doctorId      String
  patient       User      @relation("PatientAppointments", fields: [patientId], references: [id])
  doctor        User      @relation("DoctorAppointments", fields: [doctorId], references: [id])
  date          DateTime
  type          AppointmentType
  status        AppointmentStatus
  notes         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### Messages
```prisma
model Message {
  id            String    @id @default(cuid())
  senderId      String
  receiverId    String
  sender        User      @relation("SentMessages", fields: [senderId], references: [id])
  receiver      User      @relation("ReceivedMessages", fields: [receiverId], references: [id])
  content       String
  read          Boolean   @default(false)
  createdAt     DateTime  @default(now())
}
```

## Site Structure

### Public Pages
- Home (/)
- About (/over-ons)
- Blog (/blog)
- Contact (/contact)
- Privacy Policy (/privacy)
- Terms of Service (/voorwaarden)

### Patient Dashboard
- Overview (/dashboard)
- Health Profile (/dashboard/profiel)
- Health Data (/dashboard/gezondheid)
- Medications (/dashboard/medicatie)
- Exercises (/dashboard/oefeningen)
- Nutrition (/dashboard/voeding)
- Progress (/dashboard/vooruitgang)
- Chat (/dashboard/chat)
- Calendar (/dashboard/agenda)

### Doctor Dashboard
- Overview (/dashboard/arts)
- Patients (/dashboard/arts/patienten)
- Appointments (/dashboard/arts/afspraken)
- Messages (/dashboard/arts/berichten)
- Analytics (/dashboard/arts/analytics)
- Settings (/dashboard/arts/instellingen)

## Design System

### Color Palette
- Primary: #2B6CB0 (Trustworthy Blue)
- Secondary: #48BB78 (Healthy Green)
- Accent: #F6AD55 (Warm Orange)
- Background: #F7FAFC (Light) / #1A202C (Dark)
- Text: #2D3748 (Light) / #F7FAFC (Dark)
- Success: #48BB78
- Warning: #ECC94B
- Error: #F56565

### Typography
- Primary Font: Inter (Modern, clean, highly readable)
- Secondary Font: Source Sans Pro (Friendly, approachable)
- Scale: 12px, 14px, 16px, 18px, 20px, 24px, 30px, 36px, 48px

## Content Strategy

### Tone of Voice
- Professional yet approachable
- Clear and concise
- Encouraging and supportive
- Educational and informative
- Trustworthy and reliable

### Writing Principles
1. Use clear, simple language
2. Focus on benefits and outcomes
3. Include social proof and testimonials
4. Create emotional connection
5. Provide actionable steps
6. Use storytelling elements

## Features Implementation

### Phase 1: Core Platform
- User authentication
- Basic profiles
- Health data tracking
- Medication management
- Basic dashboard

### Phase 2: Advanced Features
- AI health analysis
- Exercise tracking
- Nutrition planning
- Doctor-patient chat
- Appointment scheduling

### Phase 3: Gamification & Integration
- Points system
- Progress tracking
- Health app integration
- Advanced analytics
- AI chatbot

## Development Workflow

1. Set up development environment
2. Implement authentication
3. Create core UI components
4. Build database schema
5. Develop API endpoints
6. Implement features
7. Add testing
8. Deploy to staging
9. User acceptance testing
10. Production deployment

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run database migrations: `npx prisma migrate dev`
5. Start development server: `npm run dev`

## Environment Variables
```env
DATABASE_URL=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
SUPABASE_URL=
SUPABASE_ANON_KEY=
OPENAI_API_KEY=
```

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details. 