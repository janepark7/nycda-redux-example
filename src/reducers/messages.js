const INITIAL_STATE = {
	messages: [],
	userCount: 0,
	lastMessageTime: null,
};

export default function messagesReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		// Add message to array, also mark last sent time
		case "MESSAGE_SEND":
			return {
				...state,
				messages: [
					...state.messages,
					{
						message: action.message,
						user: action.user,
						time: action.time,
					},
				],
				lastMessageTime: action.time,
			};

		// Bump user count whenever someone logs in
		case "USER_LOGIN":
			return {
				...state,
				userCount: state.userCount + 1,
			};

		default:
			return state;
	}
}
