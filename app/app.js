/**
* @description fetch dino.json data
* @param dino.json file
* @returns response
*/
fetch('dino.json')
    .then((response) => {
        //return resoponse as valid json
        return response.json();
    })
    .then((data) => {
        //get the values of initial object
        let dinoObject = Object.values(data);
        //get array at index zero
        let dinoArray = dinoObject[0];
        //return array of dinosaur objects
        return dinoArray;
    })
    .then((dinoArray) => {
        //when submit button is clicked create infographic
        document.getElementById('btn').addEventListener('click', () => {
            infographic(event, dinoArray);
        });
    });

/**
* @description create infographic
* @param data from click event
* @param array of dinosaur objects returned from fetch
* @returns object of form values
*/
function infographic(event, array) {
    //prevents default form submit behavior
    event.preventDefault(); 
    //set variables for user submitted data
    let userName = document.getElementById('name').value;
    let feet = Number(document.getElementById('feet').value);
    let inches = Number(document.getElementById('inches').value);
    let height = (feet * 12) + inches;
    let weight = Number(document.getElementById('weight').value);
    let dietRaw = document.getElementById('diet').value;
    let diet = dietRaw.toLowerCase();
    let user = new Human(userName, height, weight, diet);
    let gridArray = formatDinos(array, user);

    if (validate(userName, feet, inches, weight)) {
        createGrid(gridArray);
        document.forms[0].reset();
        return user
    }
    else {
        return;
    }
}
/**
* @description validate form responses
* @param name value from form data
* @param feet value from form data
* @param inches value from form data
* @param weight value from form data
* @returns boolean
*/
function validate(name, feet, inches, weight) {
	if (name == '') {
		//if name is blank throw error
		document.getElementById('error-message').innerHTML = `Please enter a name`;
		return false;
	}
	if (isNaN(feet) !== true) {
		//if feet is a number validate it
		if (feet < 0 ) {
			//if feet or inches is negative throw error
			document.getElementById('error-message').innerHTML = `Please enter a valid height`;
			return false;
		}
		if (feet == 0 && inches < 1) {
			//if total height is less than one inch throw error
			document.getElementById('error-message').innerHTML = `Please enter a valid height`;
			return false;
		}
	}
	if (isNaN(inches) !== true) {
		//if feet is a number validate it
		if (inches < 0 ) {
			//if feet or inches is negative throw error
			document.getElementById('error-message').innerHTML = `Please enter a valid height`;
			return false;
		}
		if (inches == 0 && feet < 1) {
			//if total height is less than one inch throw error
			document.getElementById('error-message').innerHTML = `Please enter a valid height`;
			return false;
		}
	}
	if (isNaN(weight)) {
		//if weight is not a number throw an error
		document.getElementById('error-message').innerHTML = `Please enter a valid weight`;
		return false;
	}
	if (weight < 1) {
		//if weight is a number less than one throw an error
		document.getElementById('error-message').innerHTML = `Please enter a valid weight`;
		return false;
	}
	else {
		//if entries pass all test validation returns true
		return true;
	}	
}

/**
* @description formats dino data
* @param array of dinos from fetch event
* @param object of form values
* @returns new array with formatted dino data and data from form submission
*/
function formatDinos(array, user) {
    //create new variable with array from callback
    let dinoArray = array;
    //create a new array from original dino data with modified objects using Bird and Dinosaur constructor functions
    let dinosaurs = dinoArray.map(function(dino) {
        let origName = dino.species;
        //format the image url appropriately
        let imgName = origName.toLowerCase();
        let imageLoc = `/images/${imgName}.png`;
        //sort Dinosaurs from Birds and return appropriate objects
        if (dino.weight > 1) {
            return new Dinosaur(dino.species, dino.height, dino.weight, dino.diet, imageLoc);
        }
        else {
            return new Bird(dino.species, dino.fact, imageLoc)
        }     
    });
    let gridArray = combineArrays(dinosaurs, user);
    return gridArray;
}
/**
* @description combines Dinosaur objects, Bird object and Human object into new array
* @param Dinosaur objects
* @param Human object
* @returns new array with Dinosaur objects, Bird object and Human object
*/
function combineArrays(dinos, human) {
    //combine dinosaur array and human object to create an array in proper format for infographic grid
    let i = 0;
    let combinedArray = [];
    for (i = 0; i < dinos.length; i++) {
        //order the array so the human object is in positioned in the middle
        if (i <= 3) { 
            combinedArray.push(dinos[i])
        }
        if (i === 4) {
            combinedArray.push(human)
            combinedArray.push(dinos[i])  
        }
        if (i > 4) {
            combinedArray.push(dinos[i])
        }
    }
    return combinedArray;
}
/**
* @description displays grid with names, facts, and images
* @param array with Dinosaur object, Bird object, and Human object
*/
function createGrid(array) {
    document.getElementById('dino-compare').style.display = "none";
    document.getElementById('grid').style.display = "flex";
    let human = array[4];
    let createGridItem = function (i) {
    	//display grid item differently based on object type
    	if(i.type === 'dinosaur') {
    		let randomFact = createFactArray(i, human);
        	document.getElementById("grid").innerHTML += `<div class="grid-item"><h2>${i.name}</h2><img alt="${i.name}" src="${i.image}"><p>${randomFact}</p></div>`;
        }
        else if (i.type === 'bird') {
        	document.getElementById("grid").innerHTML += `<div class="grid-item"><h2>${i.name}</h2><img alt="${i.name}" src="${i.image}"><p>${i.fact}</p></div>`;
        }
        else {
        	document.getElementById("grid").innerHTML += `<div class="grid-item"><h2>${i.name}</h2><img alt="${i.name}" src="${i.image}"><div class="spacer"></div>`;
        }
    }
    array.forEach(createGridItem);
    document.getElementById('refresh').addEventListener('click', () => {
            location.reload(true);
        });

}
/**
* @description create new Human object
* @constructor
* @param form submission data
*/
function Human(name, height, weight, diet) {
    this.type = 'human',
    this.name = name,
    this.height = height,
    this.weight = weight,
    this.diet = diet
    this.image = '/images/human.png'
}
/**
* @description create new Dinosaur object
* @constructor
* @param dino objects from fetch
*/
function Dinosaur(species, height, weight, diet, image) {
    this.type = 'dinosaur',
    this.name = species,
    this.height = Number(height),
    this.weight = Number(weight),
    this.diet = diet,
    this.image = image
}
/**
* @description create new Bird object
* @constructor
* @param pigeon from fetch
*/
function Bird(species, fact, image) {
    this.type = 'bird',
    this.name = species,
    this.fact = fact,
    this.image = image
}

/**
* @description add comparison method to Dinosaur prototype
* @param Human object
* @returns fact about height
*/
Dinosaur.prototype.compareHeight = function(human) {
  if(human.height < this.height) {
  	return `You are shorter than the ${this.name}`;
  }
  if (human.height === this.height) {
  	return `You are the same height as the ${this.name}`;
  }
  else {
  	return `You are taller than the ${this.name}`;
  }
};

/**
* @description add comparison method to Dinosaur prototype
* @param Human object
* @returns fact about weight
*/
Dinosaur.prototype.compareWeight = function(human) {
  if(human.weight < this.weight) {
  	return `You weigh less than ${this.name}`;
  }
  if (human.height === this.weight) {
  	return `You weigh the same as ${this.name}`;
  }
  else {
  	return `You weigh more than ${this.name}`;
  }
};

/**
* @description add comparison method to Dinosaur prototype
* @param Human object
* @returns fact about diet
*/
Dinosaur.prototype.compareDiet = function(human) {
	if (human.diet === this.diet) {
		return `Your diet is similar to the ${this.name} diet`;
	}
	else {
		return `Your diet is different than the ${this.name} diet`;
	}
};


/**
* @description create an array of facts
* @param Dinosaur Object and Human Object
* @returns random fact
*/
function createFactArray(dinosaur, human) {
	let factArray = [];
	let heightFact = dinosaur.compareHeight(human);
	let weightFact = dinosaur.compareWeight(human);
	let dietFact = dinosaur.compareDiet(human);
	factArray.push(heightFact);
	factArray.push(weightFact);
	factArray.push(dietFact);
	let dinoIndex = randomNumber(0, 2);
	return `${factArray[dinoIndex]}`;
}

/**
* @description create a random integer
* @param Human min and max values
* @returns random number
*/
function randomNumber(min, max) {  
    min = Math.ceil(min); 
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}