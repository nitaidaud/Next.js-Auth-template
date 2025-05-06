# Auth Template

<div align="center">
  
  ![Auth Template Banner](https://img.shields.io/badge/Auth-Template-0A0A0A?style=for-the-badge&logo=github&logoColor=white)
  
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![NextAuth.js](https://img.shields.io/badge/NextAuth.js-1A1A1A?style=for-the-badge&logo=next.js&logoColor=white)](https://next-auth.js.org/)
  [![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  
  A minimal and customizable authentication template for modern full-stack applications
  
</div>

## ✨ Features

- 🔐 Secure authentication with NextAuth.js
- 📱 Responsive design with Tailwind CSS
- 🚀 Next.js App Router architecture
- 🗄️ Database integration with Prisma ORM
- 🔄 Google OAuth integration
- ⚡ Fast and SEO-friendly

## 🧰 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/nitaidaud/auth-template.git
cd auth-template
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env` file in the root directory with the following:

```env
# Can be any strong secret, just keep it consistent across environments
AUTH_SECRET=your_custom_auth_secret

# PostgreSQL database URL in Prisma format
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

# Google OAuth credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Required by NextAuth for trusted environments
AUTH_TRUST_HOST=true
```

### Database Setup

Initialize Prisma and set up your database:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### Run the Application

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` to see your application running.

## 🔑 Setting Up Google OAuth

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Select **Web application** as the application type
6. Add your authorized redirect URI:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
   (Update with your production URL when deploying)
7. Copy the generated **Client ID** and **Client Secret** to your `.env` file

## 📁 Project Structure

```
auth-template/
├── app/                # Next.js App Router
│   ├── api/            # API routes
│   ├── auth/           # Authentication pages
│   └── ...             # Other pages
├── components/         # React components
├── lib/                # Utility functions and libraries
├── prisma/             # Prisma schema and migrations
├── public/             # Static assets
└── ...                 # Config files
```

## 🛠️ Customization

- **Theme**: Modify `tailwind.config.js` to customize your design tokens
- **Authentication**: Add more providers in `auth.js`
- **Database Schema**: Update `prisma/schema.prisma` for additional models

---
