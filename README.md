# Inventory & Logistics ERP - Frontend Dashboard

A production-grade, responsive dashboard for managing enterprise inventory and logistics operations. Built with a focus on scalability, maintainability, and real-time data integrity.

## 🚀 Tech Stack

- **Core**: [Next.js 16 (App Router)](https://nextjs.org/)
- **State Management**: [TanStack Query v5](https://tanstack.com/query/latest)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Tables**: [TanStack Table v8](https://tanstack.com/table/latest)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API Client**: [Axios](https://axios-http.com/)

## 📂 Folder Structure

```
├── app/                  # Next.js App Router pages & layouts
│   ├── (auth)/           # Authentication routes (login, register)
│   ├── (dashboard)/      # Protected dashboard routes
│   │   ├── users/        # User management feature
│   │   ├── products/     # Product management feature
│   │   └── ...           # Other domain features
├── components/           # Shared UI components
│   ├── ui/               # Shadcn primitive components
│   ├── forms/            # Dynamic form engine
│   └── tables/           # Reusable data table engine
├── constants/            # Centralized API, Form, and Table configurations
├── hooks/                # Custom React hooks (auth, api factory)
├── lib/                  # Utilities (axios, auth, formatting)
├── schemas/              # Zod validation schemas
└── types/                # Global TypeScript definitions
```

## 🛠️ Development Workflow

### Setup Instructions
1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables (see below)
4. Start the dev server: `npm run dev`

### Environment Variables
Create a `.env` file in the root:
```env
NEXT_PUBLIC_API_BASE_URL="https://your-api-endpoint.com/api/v1"
```

### Production Build
```bash
npm run build
npm run start
```

## 🏗️ Core Architectures

### 1. Authentication Flow
- **Cookie-based**: Uses `httpOnly` cookies for secure token storage.
- **Server Actions**: `lib/auth.ts` handles session lifecycle on the server.
- **Client Cache**: `lib/token-cache.ts` optimizes client-side API calls by caching the token in memory, reducing server round-trips.
- **Middleware**: Routes are protected via Next.js middleware and layout redirects.

### 2. Dynamic Form Architecture
Forms are configuration-driven using the `DynamicForm` component. 
- **Scalability**: New forms can be added by defining a schema and a field array.
- **Validation**: Strict Zod validation integrated with React Hook Form.
- **Dynamic Options**: Supports async loading of select options (e.g., loading suppliers list into a product form).

### 3. Data Table Architecture
Powered by TanStack Table, the `DataTable` component provides:
- **Configuration-based**: Columns defined in `constants/table.constants.tsx`.
- **Performance**: Optimized rendering for large datasets.
- **Features**: Built-in searching, pagination, and status badge rendering.
- **Export**: Integrated CSV export system.

### 4. API Layer
- **Centralized Endpoints**: All URLs managed in `constants/api.constants.ts`.
- **Factory Hooks**: `useApiQuery` and `useApiMutation` reduce boilerplate and ensure consistent error handling across the app.
- **Interceptors**: Global Axios interceptors handle 401/403 errors and automatic token injection.

## 📊 Reporting & Exports
The system includes a reporting module that allows users to export data as CSV files directly from the table views using the `ExportButton` component.

## 🔒 Security
- CSRF protection via SameSite cookies.
- Input sanitization through Zod schemas.
- Protected route boundaries in Next.js layouts.

## 🚀 Deployment Notes
- **Vercel**: The recommended deployment platform. Connect your GitHub repository and Vercel will automatically configure the build settings.
- **Docker**: Can be containerized using a multi-stage Dockerfile. Ensure `NEXT_PUBLIC_API_BASE_URL` is set at build time.
- **Node Server**: When deploying to a traditional Node environment, use `npm run build` followed by `npm run start` and manage the process with PM2 or systemd.