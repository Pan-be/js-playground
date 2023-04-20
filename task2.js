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
		// console.log({ categories, users })
		return { products, users, carts }
		// return { categories, max_value, max_cart_owner_name, max_user_pair }
	} catch (error) {
		console.error(error)
	}
}

async function findUserWithMaxValueCart(carts, products, users) {
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
		return "User not found"
	}
}

getData().then(({ carts, products, users }) => {
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
	console.log(categories)

	findUserWithMaxValueCart(carts, products, users)
})
