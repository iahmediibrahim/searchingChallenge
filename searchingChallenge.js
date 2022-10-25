function SearchingChallenge(strArr) {
	// create the sane design as an array
	const matrix = [
		[0, 0],
		[0, 1],
		[0, 2],
		[0, 3],
		[1, 0],
		[1, 1],
		[1, 2],
		[1, 3],
		[2, 0],
		[2, 1],
		[2, 2],
		[2, 3],
		[3, 0],
		[3, 1],
		[3, 2],
		[3, 3],
	]
	const flatten = (arr) => {
		return arr.reduce((arr, row) => [...arr, ...row], [])
	}
	const permutate = (arr) => {
		if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr
		return arr.reduce((res, ele, index) => {
			res = [...res, ...permutate([...arr.slice(0, index), ...arr.slice(index + 1)]).map((val) => [ele, ...val])]
			return res
		}, [])
	}

	// flatten the strArr to get the 16 charachers
	const flattenArr = flatten(strArr)
	console.log(flattenArr)
	// segregate and map flattenArr with matrix to get coordinates for food, home and charlie
	const coordinates = flattenArr.reduce(
		(obj, char, index) => {
			if (char === 'F') obj['food'].push(matrix[index])
			else if (char === 'H') obj['home'] = matrix[index]
			else if (char === 'C') obj['dog'] = matrix[index]
			return obj
		},
		{ food: [], home: null, dog: null },
	)
	console.log(permutate(coordinates['food']))
	console.log(permutate(coordinates['dog']))
	console.log(permutate(coordinates['home']))
	// construct possible routes by permutating food coordinates
	let possibleRoutes = permutate(coordinates['food'])
	// push dog and home in possibleRoutes at start and end positions
	possibleRoutes = possibleRoutes.map((route) => {
		return [coordinates['dog'], ...route, coordinates['home']]
	})
	// Calculate distances from every possible route
	const distances = possibleRoutes.reduce((distances, route) => {
		let moveLength = 0
		for (let i = 0; i < route.length - 1; i++) {
			let current = route[i],
				next = route[i + 1]
			let xCoordinatePath = current[0] > next[0] ? current[0] - next[0] : next[0] - current[0]
			let yCoordinatePath = current[1] > next[1] ? current[1] - next[1] : next[1] - current[1]
			moveLength += xCoordinatePath + yCoordinatePath
		}
		distances.push(moveLength)
		return distances
	}, [])
	console.log(distances)
	return Math.min(...distances)
}

SearchingChallenge(['FOOF', 'OCOO', 'OOOH', 'FOOO'])
