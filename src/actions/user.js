const colors = [
	"rebeccapurple",
	"goldenrod",
	"firebrick",
	"hotpink",
	"lawngreen",
];

export function login(username) {
	// Generate some random information about them
	return {
		type: "USER_LOGIN",
		user: {
			id: parseInt(Math.random() * 1000000000, 10),
			username,
			age: parseInt(Math.random() * 40, 10) + 18,
			color: colors[parseInt(Math.random() * colors.length, 10)],
			messagesSent: 0,
		},
	};
}

export function logout() {
	return { type: "USER_LOGOUT" };
}

export function changeColor() {
	return {
		type: "USER_CHANGE_COLOR",
		color: colors[parseInt(Math.random() * colors.length, 10)],
	};
}
