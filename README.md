# Дитячий футбольний клуб "Ніка" 

Повнофункціональний веб-сайт для дитячого футбольного клубу з бекендом, фронтендом та базою даних.

## Технології

- **Backend**: Node.js + Express + TypeScript + Prisma ORM
- **Frontend**: React + Vite + TypeScript + Tailwind CSS  
- **База даних**: PostgreSQL
- **Контейнеризація**: Docker + Docker Compose

## Швидкий запуск

1. Клонуйте репозиторій:
```bash
git clone <repository-url>
cd nika-website
```

2. Запустіть проект через Docker:
```bash
docker-compose up --build
```

3. Дочекайтеся запуску всіх сервісів та відкрийте:
   - **Фронтенд**: http://localhost:3000
   - **API**: http://localhost:3001/api
   - **База даних**: localhost:5432

## Заповнення тестовими даними

Після першого запуску виконайте:
```bash
docker-compose exec backend npx prisma db push
docker-compose exec backend npx ts-node src/seed.ts
```

## API Endpoints

- `GET /api/health` - Статус сервера
- `GET /api/teams` - Список команд
- `GET /api/players` - Список гравців
- `GET /api/coaches` - Список тренерів
- `GET /api/tournaments` - Список турнірів
- `GET /api/news` - Новини клубу
- `GET /api/videos` - Відеогалерея
- `GET /api/photos` - Фотогалерея
- `GET /api/matches` - Матчі
- `GET /api/trainings` - Тренування
- `GET /api/age-groups` - Вікові групи

## База даних

**Підключення до PostgreSQL:**
- Host: localhost
- Port: 5432
- Database: nika_football_club
- Username: nika
- Password: nika123

## Структура проекту

```
nika-website/
├── backend/          # Node.js API сервер
├── frontend/         # React додаток
├── docker-compose.yml # Конфігурація Docker
└── README.md
```

## Функціональність

- 🏠 Головна сторінка з анімаціями
- 👥 Сторінка команд з віковими групами
- 🏆 Турнірні таблиці
- 🎥 Відеогалерея
- 👨‍🏫 Сторінка тренерів
- 📰 Новини клубу
- 📱 Адаптивний дизайн

## Розробка

Для розробки можна запускати сервіси окремо:

```bash
# База даних
docker-compose up database

# Backend
cd backend
npm install
npm run dev

# Frontend  
cd frontend
npm install
npm run dev
```

## Підтримка

Для питань та підтримки звертайтесь до адміністрації клубу.

## 🎨 Дизайн

Сайт використовує сучасний дизайн з:
- **Синьо-золотою кольоровою схемою** з офіційної емблеми клубу
- **Офіційний логотип** ФК "Ника" в навігації
- Адаптивною версткою для всіх пристроїв
- Інтуїтивною навігацією
- Красивими анімаціями та переходами
- Спеціальними кольорами: `nika-blue` (#1e3a8a), `nika-gold` (#f59e0b)

## 🔧 Розробка

### Локальна розробка без Docker

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Корисні команди
```bash
# Перегляд логів
docker-compose logs -f

# Зупинка сервісів
docker-compose down

# Видалення всіх даних (включно з базою)
docker-compose down -v

# Перебудова контейнерів
docker-compose up --build --force-recreate
```

## 📊 База даних

Схема бази даних включає:
- **AgeGroup** - вікові групи (U-8, U-10, тощо)
- **Team** - команди клубу
- **Player** - гравці команд
- **Coach** - тренери з біографіями та фото (новий!)
- **Match** - матчі
- **Tournament** - турніри
- **TournamentTable** - турнірні таблиці
- **Video** - відеогалерея
- **Photo** - фотогалерея
- **News** - новини
- **Training** - тренування

## 🤝 Внесок у розробку

1. Форкніть репозиторій
2. Створіть гілку для нової функції
3. Зробіть зміни
4. Створіть Pull Request

## 📝 Ліцензія

MIT License

## 📞 Контакти

- **Email**: info@fc-nika.ua
- **Телефон**: +380 XX XXX XX XX
- **Адреса**: м. Київ, вул. Спортивна, 1 