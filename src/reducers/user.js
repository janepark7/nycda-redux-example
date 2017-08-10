const INITIAL_STATE = {
	user: null,
};

export default function userReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case "USER_LOGIN":
			return {
				...state,
				user: action.user,
			};

		case "USER_LOGOUT":
			return {
				...state,
				user: null,
			};

		case "USER_CHANGE_COLOR":
			return {
				...state,
				user: {
					...state.user,
					color: action.color,
				},
			};

		case "MESSAGE_SEND":
			return {
				...state,
				user: {
					...state.user,
					messagesSent: state.user.messagesSent + 1,
				},
			};

		default:
			return state;
	}
}
