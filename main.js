import './style.css'
import Alpine from 'alpinejs';
import { Users } from './users';
import { Services } from './services'

window.Alpine = Alpine;


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
		facAuthError: "",
		logFacAuthError: "",
		loggedIn: true,
		signedUp: true,
		facilityLoggedIn: true,
		facilitySignedUp: true,
		home: false,
		showFacSec: true,
		showUserSec: true,
		chooseService: "",
		user: {
			loginPassword: "",
			loginEmail: "",
			password: "",
			email: "",
			name: "",
		},
		facility: {
			facName: "",
			facEmail: "",
			contactno: "",
			location: "",
			reg: "",
			capacity: "",
			facPassword: "",
			pregnancyTermination : "",
			contraception : "",
			anteNatalCare : "",
			logFacPassword: "",
			logFacEmail: "",
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
			fetch(`https://fema--app.herokuapp.com/fema/login`, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: this.user.loginEmail,
					password: this.user.loginPassword,
				}),
			})
				.then((response) => response.json())
				.then((token) => {
					localStorage.setItem("token", token);
					if (localStorage.getItem("token")) {
						// this.loadServices();
						console.log(this.token);
					}
				})
				.then(() => {
					this.loginAuthError = "Login sucessful, redirecting!";
					setTimeout(() => {
						this.loginAuthError = "";
						this.loggedIn = false;
						// this.home = true;
					}, 2000);
					this.user.loginEmail = "";
					this.user.loginPassword = "";
				})
				.catch((error) => {
					console.log(error);
					this.loginAuthError = "Invalid email or password";
				});
		},

		register() {
			if (this.user.email && this.user.password && this.user.name) {
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
							this.signedUp = true;
						}, 3000);
					})
					.catch((error) => {
						alert(error);
					});
			}
		},
		registerFacility() {
			fetch(`https://fema--app.herokuapp.com/fema/registerFacility`, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					facilityName: this.facility.facName,
					location: this.facility.location,
					reg: this.facility.reg,
					capacity: this.facility.capacity,
					contact: this.facility.contactno,
					facilityEmail: this.facility.facEmail,
					facilityPass: this.facility.facPassword,
				}),
			})
				.then((response) => response.json())
				.then(() => {
					this.facAuthError = "Facility Registered!";

					setTimeout(() => {
						this.facAuthError = "";
						// this.facilitySignedUp = false;
					}, 3000);
				})
				.catch((error) => {
					alert(error);
				});
		},
		loginFacility() {
			fetch(`https://fema--app.herokuapp.com/fema/loginFacility`, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					facilityEmail: this.user.logFacEmail,
					facilityPass: this.user.logFacPassword,
				}),
			})
				.then((response) => response.json())
				.then((token) => {
					localStorage.setItem("token", token);
					if (localStorage.getItem("token")) {
						// this.loadServices();
						console.log(this.token);
					}
				})
				.then(() => {
					this.logFacAuthError = "Login successful, redirecting!";
					setTimeout(() => {
						this.logFacAuthError = "";
						// this.facilityLoggedIn = false;
						// this.home = true;
					}, 2000);
					// this.user.logFacEmail = "";
					// this.user.logFacPassword = "";
				})
				.catch((error) => {
					console.log(error);
					this.logFacAuthError = "Invalid email or password";
				});
		},
	};
});
Alpine.start();
