import "./style.css";
import Alpine from "alpinejs";
window.Alpine = Alpine;

// const URL_BASE = import.meta.env.VITE_SERVER_URL;

Alpine.data("users", () => {
	return {
		init() {
			localStorage.getItem("token");
			fetch(``)
				.then((r) => r.json())
				.then((data) => (this.services = data));
		},
		services: [],
		signUpAuthError: "",
		loginAuthError: "",
		loggedIn: true,
		signedUp: true,
		facilityLoggedIn: true,
		facilitySignedUp: true,
		home: false,
		showFacSec: true,
		user: {
			loginPassword: "",
			loginEmail: "",
			password: "",
			email: "",
			name: "",
		},
		facility: {
			facEmail: "",
			facPassword: "",
			facName: "",
			regFacEmail: "",
			contactno: "",
			location: "",
			reg: "",
			capacity: "",
			regFacPassword: "",
		},

		loadServices() {
			fetch(``, {
				method: "get",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					alert(err);
				});
		},
		login() {
			if (this.user.loginEmail && this.user.loginPassword) {
				fetch(`https://fema--app.herokuapp.com/fema/login`, {
					method: "post",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: this.user.email,
						password: this.user.password,
					}),
				})
					.then((response) => response.text())
					.then((token) => {
						localStorage.setItem("token", token);
						if (localStorage.getItem("token")) {
							this.loadServices();
							console.log(this.movies);
						}
					})
					.then(() => {
						this.loginAuthError = "Success, redirecting!";
						setTimeout(() => {
							this.loginAuthError = "";
							this.loggedIn = true;
							this.home = true;
						}, 2000);
						this.user.loginEemail = "";
						this.user.loginPassword = "";
					})
					.catch((error) => {
						// console.log(error);
						this.loginAuthError = "Invalid username or password";
					});
			}
		},

		register() {
			fetch(`https://fema--app.herokuapp.com/fema/register`, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					password: this.user.password,
					email: this.user.email,
					name: this.user.name,
				}),
			})
				.then((response) => response.json())
				.then(() => {
					this.signUpAuthError = "New user created!";

					setTimeout(() => {
						this.signUpAuthError = "";
						this.signedUp = false;
					}, 3000);
					this.username2 = "";
					this.password2 = "";
				})
				.catch((error) => {
					alert(error);
				});
		},
		registerFacility() {},
		loginFacility() {},
	};
});
Alpine.start();
