#!/bin/bash

echo "🚀 Запуск dev середовища..."

# Зупиняємо production compose якщо запущений
docker-compose down 2>/dev/null

# Запускаємо dev compose
docker-compose -f docker-compose.dev.yml up -d

echo "⏳ Чекаємо на запуск сервісів..."
sleep 5

# Синхронізуємо базу
echo "🗄️ Синхронізуємо базу..."
docker-compose -f docker-compose.dev.yml exec backend npx prisma db push

echo "✅ Dev середовище готове!"
echo "🌐 Фронтенд: http://localhost:3000"
echo "🔧 Бекенд: http://localhost:3001"
echo "👨‍💼 Адмін: http://localhost:3000/admin"

# Показуємо логи
echo "📋 Логи (Ctrl+C для виходу):"
docker-compose -f docker-compose.dev.yml logs -f 