var fs = require('fs');
var pets = JSON.parse(fs.readFileSync('pets.json', 'utf8'));

var action = process.argv[2];

switch(action) {
	case 'read':
		read();
	break;
	case 'create':
		create();
	break;

	case 'update':
		update();
	break;

	case 'destroy':
		destroy();
	break;
	default:
		logError('Usage: node pets.js [read | create | update | destroy]');
}

function logError(error) {
	console.error(error);
}

function read() {
	var index = process.argv[3];

	if(index == undefined) {
		console.log(pets);
	} else if(pets[index]){
		console.log(pets[index]);
	} else {
		logError('No such INDEX. Usage: node pets.js read INDEX');
	}
}

function create() {
	var age = process.argv[3];
	var kind = process.argv[4];
	var name = process.argv[5];

	if(age && kind && name) {
		var pet = {
			age: age,
			kind: kind,
			name: name
		};

		pets.push(pet);
		fs.writeFile("pets.json", JSON.stringify(pets));
		console.log(pet);

	} else {
		logError('Usage: node pets.js create AGE KIND NAME');
	}
}

function update() {
	var index = process.argv[3];
	var age = process.argv[4];
	var kind = process.argv[5];
	var name = process.argv[6];

	if(index && age && kind && name) {
		if(pets[index]) {
			pets[index].age = age;
			pets[index].kind = kind;
			pets[index].name = name;

			fs.writeFile("pets.json", JSON.stringify(pets));

			console.log(pets[index]);
		} else {
			logError('Index '+index+' doesn\'t exist');
		}
	} else {
		logError('Usage: node pets.js update INDEX AGE KIND NAME');
	}
}

function destroy() {
	var index = process.argv[3];

	if(index) {
		var pet = pets[index];
		pets.splice(index, 1);
		fs.writeFile("pets.json", JSON.stringify(pets));
		console.log(pet);
	} else {
		logError('Usage: node pets.js destroy INDEX');
	}
}
