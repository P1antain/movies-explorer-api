# Проект Movies Api
## Что же за Movies Api?
>Mesto Api - это апи часть приложения Movies на Express.js Приложение предназначено для поиска фильма по их названию, сохранению фильмов и "избранное"
## Перед началом работы проверить
1) В консоли проверяем установлен ли Node.js
* `node -v`
* `npm -v`
2) Наличие установленной программы(Windows OS)
* `Наличие Git Bush`

Если все установленно смотрим **Запуск**

## Установка (Windows OS)
1) [Node.js](https://nodejs.org/en/)
2) [Git Bash](https://gitforwindows.org/index.html)

## Запуск проекта
1) С помощью Git Bush выполняем команду

`git clone https://github.com/P1antain/movies-explorer-api.git`

2) Открываем работу, в проектной среде через терминал выполняем команду(устанавливаем модули для локального сервера)

`npm install`

3) Запускаем локальный сервер командой через терминал

`npm start`


#### Используемые технологии в проекте
+ NodeJS
+ Express
+ MongoDB

#### Возможности проекта
>  Создавать пользователя и проходить аутентификацию
>> Аутентификация выполнена по средствам куки
>
> Получать информацию о пользователе, обновлять её (Email и Имя)
>
> Создавать понравившейся фильм, посредствам лайка, удалять фильм

#### Запросы для тестирования Postman
Роуты
Для пользователей:</br>
<table>
<tr>
<td align="center"><strong>Запрос</strong></th>
<td align="center"><strong>Роут</strong></th>
<td align="center"> <strong>Описание</strong></th>
</tr>
<tr>
<td align="center">POST</td>
<td align="center">/signup</td>
<td>Создает пользователя и сразу аутентифицирует</td>
</tr>
<tr>
<td align="center">POST</td>
<td align="center">/signin</td>
<td>Проверяет переданные в теле почту и пароль и заходит на сайт</td>
</tr>
<tr>
<td align="center">GET</td>
<td align="center">/signout</td>
<td>Производит выход из аккаунта с удалением данных куки</td>
</tr>
<tr>
<td align="center">GET</td>
<td align="center">/users/me</td>
<td>Возвращает информацию о пользователе (email и имя)</td>
</tr>
<tr>
<td align="center">PATCH</td>
<td align="center">/users/me</td>
<td>Обновляет информацию о пользователе (email и имя)</td>
</tr>
</table>


Для фильмов:</br>
<table>
<tr>
<td align="center"><strong>Запрос</strong></th>
<td align="center"><strong>Роут</strong></th>
<td align="center"> <strong>Описание</strong></th>
</tr>

<tr>
<td align="center">GET</td>
<td align="center">/movies</td>
<td>Возвращает все сохраненные карточки </td>
</tr>

<tr>
<td align="center">POST</td>
<td align="center">/movies </td>
<td>Сохраняет понравившийся фильм</td>
</tr>

<tr>
<td align="center">DELETE</td>
<td align="center">/movies/:movieId </td>
<td>Удаляет понравившийся фильм по ID</td>
</tr>
</table>

# Спасибо за внимание

<p align="center">
<img src="https://99px.ru/sstorage/86/2015/12/image_86271215043043632690.gif"  alt="image"/>
</p>
