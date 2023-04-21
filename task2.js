const getData = async () => {
	try {
		const usersResponse = await fetch("https://fakestoreapi.com/users")
		const users = await usersResponse.json()

		const productsResponse = await fetch("https://fakestoreapi.com/products")
		const products = await productsResponse.json()

		const cartsResponse = await fetch(
			"https://fakestoreapi.com/carts/?startdate=2000-01-01&enddate=2023-04-07"
		)
		const carts = await cartsResponse.json()
		return { products, users, carts }
	} catch (error) {
		console.error(error)
	}
}

const dataRetriever = (users, products, carts) => {
	// return {
	// 	users,
	// 	products,
	// 	carts,
	// }
	console.log(users, products, carts)
}

const getCategoriesTotalValue = (products) => {
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

	// return categories
	console.log(categories)
}

const findUserWithMaxValueCart = (carts, products, users) => {
	let maxIndex = -1
	let maxValue = -1

	for (let i = 0; i < carts.length; i++) {
		const cart = carts[i]
		let totalValue = 0
		for (let j = 0; j < cart.products.length; j++) {
			const cartProduct = cart.products[j]
			const product = products.find((p) => p.id === cartProduct.productId)
			if (product) {
				totalValue += product.price * cartProduct.quantity
			}
		}
		if (totalValue > maxValue) {
			maxIndex = i
			maxValue = totalValue
		}
	}

	const user = users.find((u) => u.id === carts[maxIndex].userId)
	if (user) {
		//   return `${user.name.firstname} ${user.name.lastname}`;
		console.log(`${user.name.firstname} ${user.name.lastname} ${maxIndex}`)
	} else {
		// return "User not found"
		console.log("User not found")
	}
}

const findMostDistantUsers = (users) => {
	let maxDistance = -1
	let user1 = null
	let user2 = null

	for (let i = 0; i < users.length; i++) {
		const userA = users[i]
		const latA = parseFloat(userA.address.geolocation.lat)
		const longA = parseFloat(userA.address.geolocation.long)

		for (let j = i + 1; j < users.length; j++) {
			const userB = users[j]
			const latB = parseFloat(userB.address.geolocation.lat)
			const longB = parseFloat(userB.address.geolocation.long)

			const distance = Math.sqrt(
				Math.pow(latB - latA, 2) + Math.pow(longB - longA, 2)
			)

			if (distance > maxDistance) {
				maxDistance = distance
				user1 = userA
				user2 = userB
			}
		}
	}

	// return [user1, user2]
	console.log([user1, user2])
}

getData().then(({ carts, products, users }) => {
	dataRetriever(users, products, carts)
	getCategoriesTotalValue(products)
	findUserWithMaxValueCart(carts, products, users)
	findMostDistantUsers(users)
})
