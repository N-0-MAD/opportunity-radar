# Opportunity Radar

> Stop searching. Start discovering.

Opportunity Radar is a full-stack web application that helps students and early-career professionals discover opportunities that actually match their profile instead of endlessly scrolling through job boards.

Rather than displaying every opportunity available, Opportunity Radar focuses on relevance by organizing and presenting opportunities in a clean, personalized interface.

---

## Live Demo

**Application:** https://opportunity-radar-zhz7.vercel.app/

---

## Why I Built This

Finding internships, scholarships, hackathons, and fellowships usually means opening dozens of tabs across LinkedIn, company career pages, university portals, and job boards.

I wanted to build a single place where users could:

- Discover opportunities
- Save interesting ones
- Track applications
- Authenticate securely
- Have their data persist across sessions

This project also helped me learn how to build a complete production-ready application using modern web technologies instead of relying on mock frontend data.

---

# Features

### Authentication

- Google OAuth using Supabase Auth
- Protected routes
- Persistent login sessions
- Secure logout
- User profile powered by authenticated Google account

---

### Discover Opportunities

- Search opportunities
- Filter by:
  - Role
  - Location
  - Source
  - Opportunity Type
- Match score ranking
- Opportunity details drawer

---

### Save & Track

Users can

- Save opportunities
- Track opportunities
- Persist actions in Supabase
- Restore state after refresh

---

### User Profile

Displays authenticated user information including

- Name
- Email
- Avatar
- User ID

---

### Responsive UI

Works across desktop and mobile devices with a clean modern interface.

---

# Tech Stack

## Frontend

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Base UI
- Lucide Icons

## Backend

- Supabase
- PostgreSQL
- Supabase Authentication
- Server Components
- API Routes

## Deployment

- Vercel

---

# Architecture

The project follows a layered architecture instead of directly querying the database from components.

```

UI
↓
Service Layer
↓
Repository Layer
↓
Supabase

```

This separation keeps business logic independent from the UI and makes the project easier to maintain.

---

# Project Structure

```

app/
components/
lib/
├── repositories/
├── services/
├── supabase/
public/

```

---

# Screenshots

- Dashboard
<img width="1881" height="907" alt="image" src="https://github.com/user-attachments/assets/7691d8e1-a074-4201-8eb5-5d05f8f92adb" />

<img width="1893" height="911" alt="image" src="https://github.com/user-attachments/assets/f3f48bc4-654b-44ee-999a-c608bae679c3" />

- Discover
<img width="1596" height="812" alt="image" src="https://github.com/user-attachments/assets/11dd2f28-cd51-42a7-9ade-25299b0bef38" />

<img width="1912" height="900" alt="image" src="https://github.com/user-attachments/assets/32329ee8-834f-4b51-a207-24fa8670906b" />


  



- Profile
<img width="1878" height="898" alt="image" src="https://github.com/user-attachments/assets/cc2f3def-192a-4403-b230-e9b495d29ccf" />

<img width="1918" height="898" alt="image" src="https://github.com/user-attachments/assets/2e78b661-cd02-4bf4-8637-89da783675bf" />


- Login
<img width="1906" height="903" alt="image" src="https://github.com/user-attachments/assets/3b66b9b5-ed9e-4a10-af0f-6262c6968cfc" />

- Opportunity Drawer
<img width="1918" height="877" alt="image" src="https://github.com/user-attachments/assets/ee1579f1-2b0c-4ec4-b855-b9d89ae259f5" />

<img width="1880" height="870" alt="image" src="https://github.com/user-attachments/assets/2b902ece-b3ea-4532-809e-e69a21a64508" />


---

# Running Locally

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
pnpm install
```

Create

```
.env.local
```

with

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Run the application

```bash
pnpm dev
```

Production build

```bash
pnpm build
```

---

# Lessons Learned

This project taught me much more than building a frontend.

Some of the things I learned include:

- Implementing Google OAuth
- Managing authenticated sessions
- Protecting routes
- Working with PostgreSQL
- Designing Repository and Service layers
- Deploying production applications on Vercel
- Debugging middleware and deployment issues
- Replacing mock data with persistent backend data

---

# Future Improvements

Some ideas I may continue exploring:

- Resume upload
- AI-powered opportunity recommendations
- Calendar reminders
- Email notifications
- Admin dashboard
- Analytics for application tracking

---

# License

This project is available under the MIT License.

---

Made with ☕ and many debugging sessions.
