import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Заповнення бази даних тестовими даними...');

  // Створення вікових груп
  const ageGroups = await Promise.all([
    prisma.ageGroup.create({
      data: {
        name: 'U-8',
        minAge: 6,
        maxAge: 8
      }
    }),
    prisma.ageGroup.create({
      data: {
        name: 'U-10',
        minAge: 8,
        maxAge: 10
      }
    }),
    prisma.ageGroup.create({
      data: {
        name: 'U-12',
        minAge: 10,
        maxAge: 12
      }
    }),
    prisma.ageGroup.create({
      data: {
        name: 'U-14',
        minAge: 12,
        maxAge: 14
      }
    }),
    prisma.ageGroup.create({
      data: {
        name: 'U-16',
        minAge: 14,
        maxAge: 16
      }
    })
  ]);

  // Створення команд
  const teams = await Promise.all([
    prisma.team.create({
      data: {
        name: 'Ніка U-8',
        ageGroupId: ageGroups[0].id,
        description: 'Наймолодша команда клубу'
      }
    }),
    prisma.team.create({
      data: {
        name: 'Ніка U-10',
        ageGroupId: ageGroups[1].id,
        description: 'Команда для дітей 8-10 років'
      }
    }),
    prisma.team.create({
      data: {
        name: 'Ніка U-12',
        ageGroupId: ageGroups[2].id,
        description: 'Команда для дітей 10-12 років'
      }
    }),
    prisma.team.create({
      data: {
        name: 'Ніка U-14',
        ageGroupId: ageGroups[3].id,
        description: 'Команда для дітей 12-14 років'
      }
    }),
    prisma.team.create({
      data: {
        name: 'Ніка U-16',
        ageGroupId: ageGroups[4].id,
        description: 'Старша команда клубу'
      }
    })
  ]);

  // Створення тренерів
  const coaches = await Promise.all([
    prisma.coach.create({
      data: {
        firstName: 'Олександр',
        lastName: 'Петренко',
        position: 'Головний тренер',
        experience: 15,
        achievements: 'Майстер спорту України, переможець обласної першості',
        biography: 'Досвідчений тренер з 15-річним стажем роботи з дітьми',
        phone: '+380501234567',
        email: 'petrenko@nika-fc.com',
        teamId: teams[2].id
      }
    }),
    prisma.coach.create({
      data: {
        firstName: 'Ірина',
        lastName: 'Коваленко',
        position: 'Асистент тренера',
        experience: 8,
        achievements: 'Кандидат в майстри спорту, призер чемпіонату області',
        biography: 'Спеціалізується на роботі з молодшими віковими групами',
        phone: '+380501234568',
        email: 'kovalenko@nika-fc.com',
        teamId: teams[1].id
      }
    }),
    prisma.coach.create({
      data: {
        firstName: 'Михайло',
        lastName: 'Іваненко',
        position: 'Тренер воротарів',
        experience: 12,
        achievements: 'Колишній професійний воротар, майстер спорту',
        biography: 'Експерт з підготовки воротарів всіх вікових категорій',
        phone: '+380501234569',
        email: 'ivanenko@nika-fc.com',
        teamId: teams[3].id
      }
    })
  ]);

  // Створення турнірів
  const tournaments = await Promise.all([
    prisma.tournament.create({
      data: {
        name: 'Обласна першість U-12',
        season: '2024/2025',
        ageGroupId: ageGroups[2].id,
        startDate: new Date('2024-09-01'),
        endDate: new Date('2025-05-31'),
        description: 'Обласний чемпіонат для команд U-12'
      }
    }),
    prisma.tournament.create({
      data: {
        name: 'Кубок міста U-14',
        season: '2024/2025',
        ageGroupId: ageGroups[3].id,
        startDate: new Date('2024-10-01'),
        endDate: new Date('2025-04-30'),
        description: 'Міський кубковий турнір для команд U-14'
      }
    })
  ]);

  // Створення новин
  await Promise.all([
    prisma.news.create({
      data: {
        title: 'Початок нового сезону 2024/2025',
        content: 'Футбольний клуб "Ніка" розпочинає новий сезон! Запрошуємо всіх бажаючих на відкриті тренування.',
        excerpt: 'Новий сезон розпочався!',
        published: true,
        publishedAt: new Date()
      }
    }),
    prisma.news.create({
      data: {
        title: 'Перемога команди U-12 в обласній першості',
        content: 'Наша команда U-12 здобула впевнену перемогу з рахунком 3:1 у матчі проти команди "Зірка".',
        excerpt: 'Команда U-12 перемогла з рахунком 3:1',
        published: true,
        publishedAt: new Date()
      }
    }),
    prisma.news.create({
      data: {
        title: 'Набір дітей на новий сезон',
        content: 'Оголошуємо набір дітей віком від 6 до 16 років. Тренування проходять щовівторка та четверга.',
        excerpt: 'Набір дітей на новий сезон',
        published: true,
        publishedAt: new Date()
      }
    })
  ]);

  // Створення відео
  await Promise.all([
    prisma.video.create({
      data: {
        title: 'Тренування команди U-12',
        url: 'https://www.youtube.com/watch?v=example1',
        category: 'training',
        description: 'Відео з тренування нашої команди U-12',
        teamId: teams[2].id
      }
    }),
    prisma.video.create({
      data: {
        title: 'Матч Ніка vs Зірка',
        url: 'https://www.youtube.com/watch?v=example2',
        category: 'match',
        description: 'Найкращі моменти матчу проти команди Зірка'
      }
    }),
    prisma.video.create({
      data: {
        title: 'Техніка ведення м\'яча',
        url: 'https://www.youtube.com/watch?v=example3',
        category: 'training',
        description: 'Навчальне відео з техніки ведення м\'яча'
      }
    })
  ]);

  // Створення фото
  await Promise.all([
    prisma.photo.create({
      data: {
        title: 'Команда U-12 сезон 2024/2025',
        url: '/images/team-u12.jpg',
        category: 'team',
        description: 'Командне фото U-12',
        teamId: teams[2].id
      }
    }),
    prisma.photo.create({
      data: {
        title: 'Тренування на стадіоні',
        url: '/images/training.jpg',
        category: 'training',
        description: 'Тренування команди на стадіоні'
      }
    })
  ]);

  console.log('✅ База даних успішно заповнена тестовими даними!');
}

main()
  .catch((e) => {
    console.error('❌ Помилка при заповненні бази даних:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 