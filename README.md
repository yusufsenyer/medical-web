# Website Builder Rails

Full-stack website builder application with Rails API backend and Next.js frontend.

## Project Structure

```
├── backend/          # Rails API-only backend
├── frontend/         # Next.js frontend application
├── README.md         # This file
└── .gitignore        # Combined gitignore
```

## Quick Start

### Prerequisites
- Ruby 3.x
- Rails 8.x
- Node.js 18+
- npm or yarn

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yusufsenyer/website_builder_rails.git
   cd website_builder_rails
   ```

2. **Setup Backend (Rails API)**
   ```bash
   cd backend
   bundle install
   rails db:create db:migrate
   rails server
   ```
   Backend will run on `http://localhost:3000`

3. **Setup Frontend (Next.js)**
   ```bash
   cd frontend
   npm install
   npm run dev -- --port 3001
   ```
   Frontend will run on `http://localhost:3001`

## API Endpoints

- Health Check: `GET /api/v1/health`
- More endpoints will be documented as they are developed

## Environment Variables

### Backend (.env)
```
DATABASE_URL=sqlite3:storage/development.sqlite3
RAILS_ENV=development
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/v1
NODE_ENV=development
```

## Development

- Backend API runs on port 3000
- Frontend runs on port 3001
- CORS is configured for cross-origin requests
- API client is configured to use environment variables

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
