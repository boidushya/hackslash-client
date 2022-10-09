let TODO_ITEMS = [];

const API_URL = "http://localhost:8000";

// Initialize the app
const init = () => {};

// Strike through the item
const strikeThrough = (e, id) => {
  // Reflect changes to DOM
  // Reflect changes to server
};

// Delete item from the list
const deleteItem = (id) => {
  // Start animation for removal
  // Remove item from DOM after animation ends
  // Reflect changes to server
};
// Edit item from the list

const editItem = (id) => {
  // Find the item from the list
  // Toggle the edit mode and if it is in edit mode, then update the value
  // Reflect changes to server
  // If the user clicks outside the input box, then update the value
};

// Add element to the DOM
const addElementToDOM = (item) => {
  // Create the list item and add to DOM
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
  // If the user presses enter, then add the item to the list
  // Remove empty list message
  // Scroll to the bottom of the list on adding new item
  // Start animation for entry
  // Reflect changes to server
};

// Stuff to do when the page loads
window.onload = () => {
  // Get the list from the server and start event listeners
};
