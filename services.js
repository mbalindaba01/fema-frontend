export function Services(){
    return {
		serviceId: 0,
		facilities: [],
		

		getFacilities() {
			fetch(`https://fema--app.herokuapp.com/fema/facilities`, {
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

		
    }
}