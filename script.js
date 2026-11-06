
      const STORAGE_KEY = "little-list-tasks";
      const form = document.querySelector("#add-form");
      const input = document.querySelector("#task-input");
      const taskList = document.querySelector("#task-list");
      const itemsLeft = document.querySelector("#items-left");
      const clearButton = document.querySelector("#clear-completed");
      const filterButtons = document.querySelectorAll(".filter");

      let tasks = loadTasks();
      let currentFilter = "all";

      function loadTasks() {
        try {
          const savedTasks = localStorage.getItem(STORAGE_KEY);
          if (!savedTasks) return [];

          const parsedTasks = JSON.parse(savedTasks);
          if (!Array.isArray(parsedTasks)) return [];

          return parsedTasks.filter((task) =>
            task &&
            typeof task.id === "string" &&
            typeof task.text === "string" &&
            typeof task.completed === "boolean"
          );
        } catch (error) {
          console.error("Could not load your saved tasks.", error);
          return [];
        }
      }

      function saveTasks() {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        } catch (error) {
          console.error("Could not save your tasks.", error);
        }
      }

      function renderTasks() {
        taskList.replaceChildren();

        const visibleTasks = tasks.filter((task) => {
          if (currentFilter === "active") return !task.completed;
          if (currentFilter === "completed") return task.completed;
          return true;
        });

        if (visibleTasks.length === 0) {
          const emptyItem = document.createElement("li");
          emptyItem.className = "empty-state";

          const icon = document.createElement("span");
          icon.className = "empty-icon";
          icon.setAttribute("aria-hidden", "true");
          icon.textContent = currentFilter === "completed" ? "✓" : "✳";

          const message = document.createElement("p");
          if (tasks.length === 0) {
            message.textContent = "Your list is clear. Add a task to get started.";
          } else if (currentFilter === "active") {
            message.textContent = "All caught up — every task is done.";
          } else {
            message.textContent = "No completed tasks yet.";
          }

          emptyItem.append(icon, message);
          taskList.append(emptyItem);
        } else {
          visibleTasks.forEach((task) => {
            const item = document.createElement("li");
            item.className = task.completed ? "task completed" : "task";

            const checkButton = document.createElement("button");
            checkButton.className = "check-button";
            checkButton.type = "button";
            checkButton.setAttribute("aria-label", task.completed ? `Mark ${task.text} as active` : `Mark ${task.text} as done`);
            checkButton.setAttribute("aria-pressed", String(task.completed));
            checkButton.addEventListener("click", () => toggleTask(task.id));
            if (task.completed) {
              const checkmark = document.createElement("span");
              checkmark.setAttribute("aria-hidden", "true");
              checkmark.textContent = "✓";
              checkButton.append(checkmark);
            }

            const text = document.createElement("span");
            text.className = "task-text";
            text.textContent = task.text;

            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-button";
            deleteButton.type = "button";
            deleteButton.setAttribute("aria-label", `Delete ${task.text}`);
            deleteButton.textContent = "×";
            deleteButton.addEventListener("click", () => deleteTask(task.id));

            item.append(checkButton, text, deleteButton);
            taskList.append(item);
          });
        }

        const activeCount = tasks.filter((task) => !task.completed).length;
        itemsLeft.textContent = `${activeCount} ${activeCount === 1 ? "task" : "tasks"} left`;
        clearButton.disabled = !tasks.some((task) => task.completed);

        filterButtons.forEach((button) => {
          button.setAttribute("aria-pressed", String(button.dataset.filter === currentFilter));
        });
      }

      function toggleTask(id) {
        tasks = tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveTasks();
        renderTasks();
      }

      function deleteTask(id) {
        tasks = tasks.filter((task) => task.id !== id);
        saveTasks();
        renderTasks();
      }

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const text = input.value.trim();
        if (!text) {
          input.focus();
          return;
        }

        tasks.unshift({
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          text,
          completed: false
        });
        saveTasks();
        renderTasks();
        form.reset();
        input.focus();
      });

      filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
          currentFilter = button.dataset.filter;
          renderTasks();
        });
      });

      clearButton.addEventListener("click", () => {
        tasks = tasks.filter((task) => !task.completed);
        saveTasks();
        renderTasks();
      });

      renderTasks();
    