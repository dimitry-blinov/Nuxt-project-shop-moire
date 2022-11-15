#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка приложения
yarn generate

# переход в каталог сборки
cd dist

# инициализация репозитория и загрузка кода в GitHub
git init
git add -A
git commit -m 'deploy'


git push -f git@github.com:dimitry-blinov/Nuxt-project-shop-moire.git master:gh-pages

cd -
