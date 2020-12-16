API Share (Deployed on Heroku)
=====

### API Triangulation example:
https://apishare.herokuapp.com/triangulation_box?width=100&height=100&dept=100

Для триангуляции бокса был собран node C++ addon из библиотеки [earcut.cpp](https://github.com/mapbox/earcut.hpp.git)

### В директории проекта доступны следующие скрипты:

#### `npm start`

Запуск предварительно собранного проекта.\
Откройте [http://localhost:3000](http://localhost:3000) для просмотра в браузере.

#### `npm run build`
Запуск производственной сборки.

#### `npm run dev`
Запуск проекта в режиме разработки.

### `npm run build:addon`
Запуск сборки nodejs дополнения из earcut.cpp.\
(Для сборки должны быть установлены инструменты разработчика С++ и Pyton).