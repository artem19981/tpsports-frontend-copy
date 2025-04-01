FROM node:18 as build
WORKDIR /app

# Копируем только файлы зависимостей, чтобы сохранить кэш
COPY package.json yarn.lock ./

# Устанавливаем зависимости, если package.json или yarn.lock изменились
RUN yarn install --frozen-lockfile --prefer-offline

# Теперь копируем остальной код
COPY . .

# Сборка приложения
RUN yarn run build

# Финальный образ
FROM node:18 as runner
WORKDIR /app

# Копируем все файлы из сборочного контейнера
COPY --from=build /app /app

EXPOSE 3000

CMD ["yarn", "start"]
