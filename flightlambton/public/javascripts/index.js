const form = document.getElementById('flightform');
const flightNo = document.getElementById('flightno');
const duration = document.getElementById('duration');
const source = document.getElementById('source');
const destination = document.getElementById('destination');
const departure = document.getElementById('departure');
const validationItems = [flightNo, duration, source, destination, departure];
const validationItemNames = ['Flight No', 'Duration', 'Source', 'Destination', 'Departure']


form.addEventListener(('submit'), e => {
	e.preventDefault();
	let result = checkValidation();
	if (result) {
		form.submit();
	}
	else {
		return result; 
	}
});


let checkValidation = () => {

	let result = false;
	// const sourceValue = source.value.trim();
	// const destinationValue = destination.value.trim();

	validationItems.forEach((item, index) => {
		let itemValue = item.value.trim();
		
		// check if given data is empty
		if (itemValue === '') {
			setErrorMessage(item, validationItemNames[index] + ' cannot be empty.');
			result = false;
		} else {


			if (index === 2 || index === 3) {
				if (itemValue.length < 3) {
					setErrorMessage(item, 'Length of ' + validationItemNames[index] + ' must be greater than 2.');
					result = false;
				}
				else {
					setSuccess(item);
					result = true;
				}
			}
			else if (index === 1) {
				if (itemValue > 24) {
					setErrorMessage(item, validationItemNames[index] + ' cannot be greater than 24 hours.');
					result = false;
					
				}
				else {
					setSuccess(item);
					result = true;
				}
			}
			else if (index === 4) {
				if (Math.ceil(Math.abs(new Date(itemValue) - new Date())/ 86400000) < 7) {
					setErrorMessage(item, 'Must select a future date starting from next week.');
					result = false;

				} else {
					setSuccess(item);
					result = true;
				}
				}
			else {
				setSuccess(item);
				result = true;
			}
		}

	});

	// if(sourceValue === '') {
	// 	setErrorMessage(source, 'Source cannot be empty.');
	// 	result = false;
	// } else {
	// 	setSuccess(source);
	// 	result = true;
	// }

	// if(destinationValue === '') {
	// 	setErrorMessage(destination, 'Destination cannot be empty.');
	// 	result = false;
	// } else {
	// 	setSuccess(destination);
	// 	result = true;
	// }

	return result;
}


function setErrorMessage(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-group error';
	small.innerText = message;
}

function setSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-group success';
}
