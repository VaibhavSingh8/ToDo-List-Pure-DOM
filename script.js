document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.querySelector(".todo-input");
  const taskDiv = document.getElementById("tasks-div");

  const body = document.body;
  const toggleSwitch = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const backgroundImage = document.querySelector(".image-container img");

  let todos = [];

  function renderTodos() {
    taskDiv.innerHTML = "";
    todos.forEach((todo) => {
      const todoElement = document.createElement("div");
      todoElement.classList.add("todo-item");

      // checkbox creation
      const checkboxContainer = document.createElement("label");
      checkboxContainer.classList.add("checkbox-container");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("todo-checkbox");
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", () => toggleTodo(todo.id));

      const checkmark = document.createElement("span");
      checkmark.classList.add("checkmark");

      checkboxContainer.appendChild(checkbox);
      checkboxContainer.appendChild(checkmark);

      // todo span creation
      const todoText = document.createElement("span");
      todoText.classList.add("todo-text");
      if (todo.completed) todoText.classList.add("completed");
      todoText.textContent = todo.text;

      todoElement.appendChild(checkboxContainer);
      todoElement.appendChild(todoText);

      taskDiv.appendChild(todoElement);
    });
  }

  function addTodo(text) {
    const todo = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    todos.push(todo);
    renderTodos();
  }

  function toggleTodo(id) {
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    renderTodos();
  }

  function updateBackgroundImage() {
    const isMobile = window.innerWidth <= 475;
    const isDarkTheme = body.classList.contains("dark-theme");

    if (isMobile) {
      backgroundImage.src = isDarkTheme
        ? "./images/bg-mobile-dark.jpg"
        : "./images/bg-mobile-light.jpg";
    } else {
      backgroundImage.src = isDarkTheme
        ? "./images/bg-desktop-dark.jpg"
        : "./images/bg-desktop-light.jpg";
    }
  }

  function toggleTheme() {
    body.classList.toggle("dark-theme");

    if (body.classList.contains("dark-theme")) {
      themeIcon.src = "./images/icon-sun.svg";
      themeIcon.alt = "light mode";
    } else {
      themeIcon.src = "./images/icon-moon.svg";
      themeIcon.alt = "dark mode";
    }

    updateBackgroundImage();
  }

  // Initial setup
  updateBackgroundImage();

  // Event listeners
  window.addEventListener("resize", updateBackgroundImage);
  toggleSwitch.addEventListener("click", toggleTheme);

  todoInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && this.value.trim() !== "") {
      addTodo(this.value.trim());
      this.value = "";
    }
  });
});
