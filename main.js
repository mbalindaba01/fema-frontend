import "./style.css";
import axios from "axios";
import Alpine from "alpinejs";
import { Users } from "./users";
import { Services } from "./services";

window.Alpine = Alpine;

Alpine.data("users", Users);
Alpine.data("services", Services);

Alpine.data("users", () => {
	return {
		init() {
			localStorage.getItem("token");
		},
		signUpAuthError: "",
		loginAuthError: "",
		facAuthError: "",
		logFacAuthError: "",
		loggedIn: true,
		signedUp: true,
		facilityLoggedIn: true,
		facilitySignedUp: true,
		showUserScreen: false,
		showFacilityScreen: false,
		userAccess: true,
		showFacSec: true,
		showUserSec: true,
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
			pregnancyTermination: "",
			contraception: "",
			anteNatalCare: "",
			logFacPassword: "",
			logFacEmail: "",
			service: []
		},

		login() {
			axios
				.post(`https://fema--app.herokuapp.com/fema/login`, {
					email: this.user.loginEmail,
					password: this.user.loginPassword,
				})
				.then((token) => {
					localStorage.setItem("token", token);
				})
				.then(() => {
					this.loginAuthError = "Login successful, redirecting!";
					setTimeout(() => {
						this.loginAuthError = "";
						this.userAccess = false;
						this.showUserScreen = true;
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
			axios
				.post(`https://fema--app.herokuapp.com/fema/register`, {

					password: this.user.password,
					email: this.user.email,
					full_name: this.user.name,

				})
				.then(() => {
					this.signUpAuthError = "New user created! Please login";

					setTimeout(() => {
						this.signUpAuthError = "";
						this.signedUp = true;
					}, 3000);
				})
				.catch((error) => {
					alert(error);
				});
		},
		registerFacility() {
			axios
				.post(`https://fema--app.herokuapp.com/fema/registerFacility`, {
					facName: this.facility.facName,
					facLocation: this.facility.location,
					facReg: this.facility.reg,
					capacity: this.facility.capacity,
					contactno: this.facility.contactno,
					email: this.facility.facEmail,
					password: this.facility.facPassword,
					services: this.facility.service
				})
				.then(() => {
					this.facAuthError = "Facility Registered!";

					setTimeout(() => {
						this.facAuthError = "";
					}, 3000);
					console.log(this.facility.service)
				})
				.catch((error) => {
					alert(error);
				});
		},
		loginFacility() {
			axios
				.post(`https://fema--app.herokuapp.com/fema/loginFacility`, {
					facilityEmail: this.facility.logFacEmail,
					facilityPass: this.facility.logFacPassword,
				})
				.then((token) => {
					localStorage.setItem("token", token);
				})
				.then(() => {
					this.logFacAuthError = "Facility Login successful, redirecting!";
					setTimeout(() => {
						this.logFacAuthError = "";
						this.userAccess = false;
						this.showFacSec=true;
						this.showFacilityScreen = true;
					}, 2000);
					this.facility.logFacEmail = "";
					this.facility.logFacPassword = "";
				})
				.catch((error) => {
					console.log(error);
					this.logFacAuthError = "Invalid email or password";
				});
		},
	};
});

Alpine.start();
