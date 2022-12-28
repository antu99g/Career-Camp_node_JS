// List of all students to select for interview
const studentList = document.querySelector('#studentList');
// Container of all selected students for interview
const addedStudents = document.querySelector('#addedStudents');
// Interview status at students section
const intStatus = document.getElementsByClassName('intStatus');



// Coloring different interview-status in interview-page
(function(){
	for(let status of intStatus){
		switch (status.innerText) {
			case 'On hold':
				status.style.color = 'orange';
				break;
			case 'Pass':
				status.style.color = 'green';
				break;
			case 'Fail':
				status.style.color = 'red';
				break;
			case 'Not Attended':
				status.style.color = 'orangered';
				break;
		}
	}
})();


// Function for showing list of all students (to select for interview)
function showStudentList(){
	if(studentList.classList.contains('hidden')){
		studentList.classList.remove('hidden');
	}else{
		studentList.classList.add("hidden");
	}
}


// Function to add student to an interview

function addStudent(self){
	// Removing students list after selecting a student
	studentList.classList.add('hidden');
	self.classList.remove('addStudent'); // Need to remove the class to avoid event listener

	// Adding cross mark
	let i = document.createElement('i');
	i.classList.add('fa-solid', 'fa-xmark');
	
	// Hidden input tag with id of clicked student as value
	let input = document.createElement('input');
	input.setAttribute('type', 'hidden');
	input.setAttribute('name', 'students');
	input.setAttribute('value', self.id);

	// Adding cross mark and input to current element
	self.append(i, input);

	// Appending clicked element to form with hidden input
	addedStudents.append(self);
}


// Function form removing student from interview-form and sending it back to list
function removeStudent(self){
   // Coying current element
   let target = self.parentNode;
   let clone = target.cloneNode(true);

   // Changing it's innerText with clicked student-name
   clone.innerText = target.innerText;

	// Adding class to clone node
   clone.classList.add("addStudent");

	// Removing selected student
	target.remove();

	// Appending clone node to students list
   studentList.append(clone);
}


// Function for show and hide students in an interview
function showInterviewStudents(target) {
	let hiddenDiv = target.parentNode.lastElementChild;
	if (hiddenDiv.classList.contains('hidden')){
		target.style.transform = 'rotate(180deg)';
		hiddenDiv.classList.remove("hidden");
	}else{
		target.style.transform = 'rotate(0deg)';
		hiddenDiv.classList.add("hidden");
	}
}



// ***All event listeners***

document.onclick = function ({target}) {

	// Click event on add student button
	if (target.id == "addStudentBtn") {
      showStudentList();
   }
   // Click event while selecting a student
   else if (target.classList.contains("addStudent")) {
      addStudent(target);
   }
   // Click event while removing a student
   else if (target.classList.contains("fa-xmark")) {
      removeStudent(target);
   }
   // Click event while removing a student
   else if (target.classList.contains("fa-caret-down")) {
      showInterviewStudents(target);
   }
};