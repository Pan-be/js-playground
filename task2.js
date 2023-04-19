// Retrieve user, product, and shopping cart data
async function getData() {
	try {
		const usersResponse = await fetch("https://fakestoreapi.com/users")
		const users = await usersResponse.json()

		const productsResponse = await fetch("https://fakestoreapi.com/products")
		const products = await productsResponse.json()

		const cartsResponse = await fetch(
			"https://fakestoreapi.com/carts/?startdate=2000-01-01&enddate=2023-04-07"
		)
		const carts = await cartsResponse.json()

		// Create a data structure that contains all available product categories and the total value of products of a given category
		const categories = {}
		products.forEach((product) => {
			const category = product.category
			const price = product.price
			if (category in categories) {
				categories[category] += price
			} else {
				categories[category] = price
			}
		})

		// Find the cart with the highest value
		let max_value = 0
		let max_cart_owner = ""
		carts.forEach((cart) => {
			const value = cart.products.reduce(
				(total, product) => total + product.price,
				0
			)
			if (value > max_value) {
				max_value = value
				max_cart_owner = cart.userId
			}
		})

		// Determine the full name of the cart owner
		let max_cart_owner_name = ""
		users.forEach((user) => {
			if (user.id === max_cart_owner) {
				max_cart_owner_name = user.name
			}
		})

		// Find the two users living furthest away from each other
		function getDistanceInMeters(pointA, pointB) {
			const lat1 = pointA.latitude
			const lon1 = pointA.longitude
			const lat2 = pointB.latitude
			const lon2 = pointB.longitude

			const R = 6371e3 // metres
			const φ1 = (lat1 * Math.PI) / 180 // φ, λ in radians
			const φ2 = (lat2 * Math.PI) / 180
			const Δφ = ((lat2 - lat1) * Math.PI) / 180
			const Δλ = ((lon2 - lon1) * Math.PI) / 180

			const a =
				Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
				Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

			return R * c
		}

		let max_distance = 0
		let max_user_pair = []
		for (let i = 0; i < users.length; i++) {
			for (let j = i + 1; j < users.length; j++) {
				const distanceInMeters = getDistanceInMeters(
					{
						latitude: users[i].address.geo.lat,
						longitude: users[i].address.geo.lng,
					},
					{
						latitude: users[j].address.geo.lat,
						longitude: users[j].address.geo.lng,
					}
				)
				if (distanceInMeters > max_distance) {
					max_distance = distanceInMeters
					max_user_pair = [users[i], users[j]]
				}
			}
		}

		return { categories, max_value, max_cart_owner_name, max_user_pair }
	} catch (error) {
		console.error(error)
	}
}

getData()
