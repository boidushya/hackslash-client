let TODO_ITEMS = [];

const API_URL = "http://localhost:8000";

// Initialize the app
const init = () => {
  document.querySelector("#list-form").addEventListener("submit", (e) => {
    e.preventDefault();
    addNewItem(e.target);
  });
};

// Strike through the item
const strikeThrough = (e, id) => {
  e.parentElement.querySelector("span").classList.toggle("strike");
  TODO_ITEMS = TODO_ITEMS.map((item) =>
    item.id === id
      ? { id: item.id, value: item.value, checked: !item.checked }
      : item
  );
  fetch(`${API_URL}/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
};

// Delete item from the list
const deleteItem = (id) => {
  document.querySelector(`#todo-item-${id}`).classList.add("animate-exit");
  setTimeout(() => {
    document.querySelector("#todo-item-" + id).remove();
    TODO_ITEMS = TODO_ITEMS.filter((item) => item.id !== id);
    console.log(TODO_ITEMS.length);
    if (TODO_ITEMS.length === 0) {
      document.querySelector(".empty-message").style.display = "flex";
    }
  }, 200);
  fetch(`${API_URL}/delete`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
};
// Edit item from the list

const editItem = (id) => {
  const item = TODO_ITEMS.find((item) => item.id === id);
  const input = document.querySelector(`#todo-item-${id} .edit-input`);
  const span = document.querySelector(`#todo-item-${id} .todo-content`);
  if (span.style.display === "none") {
    span.style.display = "inline-block";
    input.style.display = "none";
  } else {
    input.style.display = "inline-block";
    span.style.display = "none";
    input.focus();
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (e.target.value.trim() !== "") {
          item.value = e.target.value;
          span.innerText = e.target.value;
          input.style.display = "none";
          span.style.display = "inline-block";
          TODO_ITEMS = TODO_ITEMS.map((item) =>
            item.id === id
              ? { id: item.id, value: e.target.value, checked: item.checked }
              : item
          );
          fetch(`${API_URL}/edit`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
              value: e.target.value,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            });
        } else {
          input.style.display = "none";
          span.style.display = "inline-block";
        }
      }
    });
    input.addEventListener("blur", (e) => {
      input.style.display = "none";
      span.style.display = "inline-block";
    });
    console.log(TODO_ITEMS);
  }
};

// Add element to the DOM
const addElementToDOM = (item) => {
  let listHTMl = `<li class="todo-list" id="todo-item-${item.id}">
			<label class="todo-label">
				<input type="checkbox" onchange="strikeThrough(this,${item.id});" ${
    item.checked ? `checked` : ``
  } />
				<span class="todo-content ${item.checked ? `strike` : ``}">${item.value}</span>
				<input style="display:none;" type="text" class="edit-input" placeholder="${
          item.value
        }"/>
			</label>
				<div class="todo-utility">
					<button class="btn icon-edit" onclick="editItem(${item.id});">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
						</svg>
					</button>
					<button class="btn icon-delete" onclick="deleteItem(${item.id});">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
						</svg>

					</button>
				</div>
		</li>`;
  document.querySelector("#list").innerHTML += listHTMl;
};

// Add new item to the list
const addNewItem = (e) => {
  let val = e.querySelector("input").value;
  if (val.length) {
    addElementToDOM({ value: val, id: TODO_ITEMS.length + 1 });
    TODO_ITEMS.push({
      id: TODO_ITEMS.length + 1,
      value: val,
      checked: false,
    });
    e.querySelector("input").value = "";
  }
  if (document.querySelector(".empty-message")) {
    document.querySelector(".empty-message").style.display = "none";
  }

  var elem = document.querySelector(".todo-container");
  elem.scrollTop = elem.scrollHeight;

  document.querySelector("#list").lastChild.classList.add("animate-entry");
  setTimeout(() => {
    document.querySelector("#list").lastChild.classList.remove("animate-entry");
  }, 500);

  fetch(`${API_URL}/create`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      value: val,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });

  return false;
};

// Stuff to do when the page loads
window.onload = () => {
  init();
  fetch(`${API_URL}/notes`)
    .then((res) => res.json())
    .then((data) => {
      TODO_ITEMS = data;
      if (TODO_ITEMS.length) {
        document.querySelector(".empty-message").style.display = "none";
        TODO_ITEMS.forEach((item) => {
          addElementToDOM(item);
        });
      }
      document.querySelector("#list").style.display = "block";
      document.querySelector("#loader").style.display = "none";
    });
};
