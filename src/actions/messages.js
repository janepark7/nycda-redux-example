export function sendMessage(message, user) {
	return {
		type: "MESSAGE_SEND",
		time: Date.now(),
		message,
		user,
	};
}
