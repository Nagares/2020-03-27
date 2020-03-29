import DataBase from './db.js';

const $studentsList = $('#students-list');
const $updateStudent = $('#update-student');
const $deleteStudent = $('#delete-student');

const db = new DataBase('https://frontend-lectures.firebaseio.com', 1);
clear()

db.getStudents().then(response => {
	const students = Object.entries(response).map(item => {
		let [key, value] = item;
		value.id = key;
		return value;
	});

	students.forEach(student => {

		$('<a>')
			.text(`${student.firstname} ${student.lastname}`)
			.addClass('list-group-item')
			.attr({
				'data-id': student.id,
				'href': ''
			})
			.appendTo($studentsList);
	});
});

$studentsList.on('click', '[data-id]', function(event) {
	event.preventDefault();
	const studentId = $(this).data('id');

 	$deleteStudent.attr('dell-id', studentId);

	db.getStudent(studentId).then(response => {
		for (let key in response) {
			$updateStudent.find(`[name="${key}"]`).val(response[key]);
		}
	});
});

$updateStudent.on('submit', function(event) {
	event.preventDefault();
    
	const elements = Array.from(this.elements);

	const data = {};
	elements.forEach(item => {
		const name = $(item).attr('name');

		if (!name) return;

		const value = $(item).val();

		data[name] = value;
	});

	console.log(data);
});


$deleteStudent.on('click', function(event) {

	let studentDellId = $(this).attr('dell-id');
		
	let findStudent = Array.from($studentsList.children())

	let theStudent = findStudent.find((item) => {
			
			return $(item).attr('data-id') === studentDellId;
		
		});
	
	$(theStudent).remove()
	

	db.deleteStudent(studentDellId).then(response => {
		clear()
	});
});


function clear(){

		for (let i=0; i < $updateStudent[0].length; i++) {

					$updateStudent.find(`input`).val(``);
		}
};