# Sungreen Habarana — Restaurant Website

A premium, nature-inspired restaurant website for **restaurant.sungreenhabarana.com**.

- **Frontend:** React + Vite (TanStack Start) + Tailwind CSS v4
- **Backend:** Ballerina REST API
- **Database:** MySQL 8
- **Auth:** JWT (admin)
- **Deploy:** Docker + docker-compose

## Project Structure

```
.
├── src/                      # React frontend
│   ├── routes/               # Pages: /, /menu, /about, /reservation, /contact, /admin
│   ├── components/site/      # Header, Footer, Layout
│   ├── lib/menu-data.ts      # Demo menu data
│   ├── assets/               # Images
│   └── styles.css            # Design tokens (Tailwind v4)
├── backend/
│   ├── restaurant_api.bal    # Ballerina service
│   ├── Ballerina.toml
│   ├── Config.toml.example
│   ├── openapi.yaml
│   ├── Dockerfile
│   └── db/schema.sql         # MySQL schema + sample data
├── Dockerfile                # Frontend image
├── docker-compose.yml        # web + api + mysql
└── README.md
```

## Quick Start (Docker)

```bash
docker compose up --build
```

- Web → http://localhost:3000
- API → http://localhost:8080
- MySQL → localhost:3306 (user `sungreen` / pass `sungreen_pw`)

Default admin: `admin` / `admin123` (change immediately).

## Local Development

### Frontend
```bash
bun install
bun run dev
# create .env with: VITE_API_BASE_URL=http://localhost:8080
```

### Backend
```bash
cd backend
cp Config.toml.example Config.toml   # edit values
bal run
```

### Database
```bash
mysql -u root -p < backend/db/schema.sql
```

## API Endpoints

| Method | Path                       | Auth  |
|--------|----------------------------|-------|
| GET    | `/api/menu`                | -     |
| GET    | `/api/menu/{id}`           | -     |
| POST   | `/api/menu`                | Admin |
| PUT    | `/api/menu/{id}`           | Admin |
| DELETE | `/api/menu/{id}`           | Admin |
| POST   | `/api/reservations`        | -     |
| GET    | `/api/reservations`        | Admin |
| PUT    | `/api/reservations/{id}`   | Admin |
| DELETE | `/api/reservations/{id}`   | Admin |
| POST   | `/api/contact`             | -     |
| GET    | `/api/contact`             | Admin |
| POST   | `/api/auth/login`          | -     |
| POST   | `/api/auth/logout`         | -     |

OpenAPI spec: `backend/openapi.yaml`.

## Deployment

1. Set strong values for `JWT_SECRET` and MySQL credentials in `docker-compose.yml`
   (or use a `.env` file / secret manager).
2. Point `restaurant.sungreenhabarana.com` to your server.
3. Front the stack with Nginx/Caddy for HTTPS and reverse-proxy `/api` to port 8080.
4. `docker compose up -d --build`

### Sample Caddy config
```
restaurant.sungreenhabarana.com {
  reverse_proxy /api/* api:8080
  reverse_proxy web:3000
}
```

## Design

- **Palette:** Dark Green `#1f4d3a` · Gold `#c8a96b` · White · Light Beige
- **Typography:** Cormorant Garamond (display) · Jost (sans)
- All tokens live in `src/styles.css` — never hardcode colors in components.

## License

MIT — built with care in the wilds of Habarana.
# sg-rest
