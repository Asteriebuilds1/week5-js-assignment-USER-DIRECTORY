const API_URL = "https://jsonplaceholder.typicode.com/users";

const loadButton = document.querySelector("#loadButton");
const searchInput = document.querySelector("#searchInput");
const message = document.querySelector("#message");
const userList = document.querySelector("#userList");

// Keep the complete API response separate from the search results.
let allUsers = [];

function showMessage(text, type = "") {
  message.textContent = text;
  message.className = type ? `message ${type}` : "message";
}

function displayUsers(users) {
  // Remove the previous cards before displaying the new results.
  userList.replaceChildren();

  users.forEach(function (user) {
    const card = document.createElement("article");
    card.className = "user-card";

    const name = document.createElement("h2");
    name.textContent = user.name || "Name not available";

    const email = document.createElement("p");
    const emailLabel = document.createElement("strong");
    emailLabel.textContent = "Email: ";
    email.append(emailLabel, document.createTextNode(user.email || "Not available"));

    const city = document.createElement("p");
    const cityLabel = document.createElement("strong");
    cityLabel.textContent = "City: ";
    city.append(cityLabel, document.createTextNode(user.address?.city || "Not available"));

    const organization = document.createElement("p");
    const organizationLabel = document.createElement("strong");
    organizationLabel.textContent = "Organization: ";
    organization.append(
      organizationLabel,
      document.createTextNode(user.company?.name || "Not available")
    );

    card.append(name, email, city, organization);
    userList.appendChild(card);
  });
}

function searchUsers() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredUsers = allUsers.filter(function (user) {
    const name = (user.name || "").toLowerCase();
    const email = (user.email || "").toLowerCase();

    return name.includes(searchTerm) || email.includes(searchTerm);
  });

  displayUsers(filteredUsers);

  if (filteredUsers.length === 0) {
    showMessage(
      searchTerm
        ? `No users match "${searchInput.value.trim()}".`
        : "The API returned no users.",
      "error"
    );
  } else if (searchTerm) {
    showMessage(`${filteredUsers.length} matching user(s) found.`, "success");
  } else {
    showMessage(`${filteredUsers.length} user(s) displayed.`, "success");
  }
}

async function loadUsers() {
  loadButton.disabled = true;
  searchInput.disabled = true;
  showMessage("Loading users...");
  userList.replaceChildren();

  try {
    const response = await fetch(API_URL);

    // fetch() does not reject just because the server responds with an HTTP error.
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}.`);
    }

    const users = await response.json();

    if (!Array.isArray(users)) {
      throw new Error("The API returned data in an unexpected format.");
    }

    allUsers = users;
    searchInput.disabled = false;

    if (allUsers.length === 0) {
      showMessage("The API request succeeded, but no users were returned.");
      userList.replaceChildren();
      return;
    }

    searchUsers();
  } catch (error) {
    allUsers = [];
    searchInput.value = "";
    userList.replaceChildren();
    showMessage(
      `Unable to load users. ${error.message} Check your internet connection and try again.`,
      "error"
    );
  } finally {
    loadButton.disabled = false;
  }
}

loadButton.addEventListener("click", loadUsers);
searchInput.addEventListener("input", searchUsers);

// Load the directory when the page first opens.
loadUsers();
