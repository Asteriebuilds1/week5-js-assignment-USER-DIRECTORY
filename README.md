# User Directory

A small JavaScript application that retrieves sample users from JSONPlaceholder and displays them in a searchable directory.

## Features

- Retrieves user data from `https://jsonplaceholder.typicode.com/users`.
- Displays each user's full name, email address, city, and organization.
- Searches by part of a name or email address.
- Ignores leading/trailing spaces and capitalization in searches.
- Shows loading, success, no-match, empty-response, and error messages.
- Includes a button to reload the data.

## Project files

- `index.html` — page structure and controls.
- `style.css` — layout and visual styling.
- `script.js` — API request, JSON processing, DOM rendering, search, and error handling.

## How to run

1. Download or clone this project.
2. Open the `user-directory` folder.
3. Open `index.html` in a modern web browser. If your browser restricts local requests, use the VS Code Live Server extension and open the page through its local server.
4. Make sure you have an internet connection because the users are retrieved from an external API.
5. Use the search field to search by name or email. Select **Load users** to request the latest data again.

## JavaScript concepts used

- `async` and `await`
- `fetch()`
- Promises
- `try...catch...finally`
- `response.ok` and `response.json()`
- Arrays and `filter()`
- `includes()`, `trim()`, and `toLowerCase()`
- DOM methods including `createElement()`, `textContent`, `append()`, and `replaceChildren()`
- Event listeners

## API data fields

The API response provides a user's `name`, `email`, `address.city`, and `company.name`. The application reads these fields from the response; the user cards are not hard-coded in the HTML.

