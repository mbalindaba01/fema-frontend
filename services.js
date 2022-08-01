export function Services(){
    return {
		serviceList: [],
		serviceId: 0,
		facilities: [],
		isbooking: false,
		showAllElems: true,

        loadServices() {
			fetch(`https://fema--app.herokuapp.com/fema/services`, 
			{
				method: "get",
				headers: {
					"Content-Type": "application/json",
				},
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
			console.log(this.serviceId)

			fetch(`http://localhost:5000/fema/facilities/${this.serviceId}`, {
				method: 'get',
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then(res => res.json())
			.then(data => {
				this.facilities= data
				console.log(this.facilities)
			})
		},

		makeBooking(){
			this.isbooking = true
			this.showAllElems = false
		}
    }
}