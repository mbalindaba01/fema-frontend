export function Services(){
    return {
		serviceList: [],
		serviceId: 0,
		bookings: [],

        loadServices() {
			fetch(`https://fema--app.herokuapp.com/fema/services`, {
				method: "get",
				headers: {
					"Content-Type": "application/json",
				},
				params: {id: 2}
			})
				.then((response) => response.json())
				.then((res) => {
					this.serviceList = res.services
				})
				.catch((err) => {
					alert(err);
				});
		},

		getFacilities(e) {
			this.serviceId = e.target.getAttribute('value')

			fetch(`http://localhost:5000/fema/facilities/${this.serviceId}`, {
				method: 'get',
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then(res => res.json())
			.then(data => {
				this.bookings = data
				console.log(this.bookings)
			})
		}
    }
}