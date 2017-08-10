// Imports
import $ from "jquery";
import moment from "moment";
import reducers from "./reducers";
import { createStore } from "redux";
import { sendMessage } from "./actions/messages";
import { login, logout, changeColor } from "./actions/user";

// Create store
const store = createStore(reducers);

// Cache jQuery elements
const $userForm = $("#user-form");
const $userFormInput = $("#user-form-input");
const $userName = $("#user-name");
const $userAge = $("#user-age");
const $userColor = $("#user-color");
const $userMsgCount = $("#user-msgcount");
const $userLogout = $("#user-logout");

const $messageList = $("#message-list");
const $messageInfoUsers = $("#message-info-users");
const $messageInfoLastSent = $("#message-info-lastsent");
const $messageForm = $("#message-form");
const $messageFormInput = $("#message-form-input");

const $reduxStore = $("#redux-store");

// Event listeners to fire actions
$userForm.on("submit", (ev) => {
	ev.preventDefault();
	store.dispatch(login($userFormInput.val()));
	$userFormInput.val("");
});

$userColor.on("click", (ev) => {
	store.dispatch(changeColor());
});

$userLogout.on("click", (ev) => {
	store.dispatch(logout());
});

$messageForm.on("submit", (ev) => {
	const state = store.getState();
	ev.preventDefault();
	store.dispatch(
		sendMessage($messageFormInput.val(), state.user.user)
	);
	$messageFormInput.val("");
});

// Define render, which happens every time the store changes, and once
// to handle initial values
let oldState = store.getState();
function render() {
	// Grab the new state
	const state = store.getState();
	const { user } = state.user;
	const { messages, userCount, lastMessageTime } = state.messages;

	// Show login form if they don't have a user
	// Hide message form if they don't have a user
	$userForm.toggle(!user);
	$messageForm.toggle(!!user);

	// Update user info if the user changes at all
	if (user !== oldState.user.user && user) {
		$userName.html(`Hello ${user.username}`);
		$userAge.html(`You are ${user.age} years old`);
		$userColor.html(`
			Your color is <span style="color: ${user.color};">${user.color}</span>
			(Click to change)
		`);
		$userMsgCount.html(`You've sent ${user.messagesSent} messages`);
	}

	// Update messages if they've changed
	if (messages !== oldState.messages.messages) {
		const messageHtml = messages.map((msg) => {
			return `
				<div class="Message">
					<span style="color: ${msg.user.color};">
						${msg.user.username}:
					</span>
					<span>${msg.message}</span>
					<span>(sent ${moment(msg.time).format("h:mm a")})</span>
				</div>
			`;
		});

		$messageList.html(messageHtml);
	}

	// Update user count
	if (userCount !== oldState.messages.userCount) {
		$messageInfoUsers.html(`${userCount} users`);
	}

	// Update last message sent
	if (lastMessageTime) {
		$messageInfoLastSent.html(
			`last message sent ${moment(lastMessageTime).format("h:mm a")}`
		);
	}

	// Put redux json in dom
	$reduxStore.html(JSON.stringify(state, null, 2));

	// Cache for comparison
	oldState = state;
}

// Subscribe to changes
store.subscribe(render);

// Do one initial render
render();
