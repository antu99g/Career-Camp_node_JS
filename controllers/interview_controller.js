const Interview = require('../models/interview');
const Student = require('../models/student');
const {Parser, transforms: { unwind }} = require('json2csv');



// Rendering Interview page
module.exports.interviewPage = async function(req, res){
	let interviews = await Interview.find({}).populate({
	path: "students",
	populate: {
			path: "candidate"
		},
	});
	let students = await Student.find({});

	return res.render('interviews', {
		title: 'Interviews',
		allInterviews: interviews,
		allStudents: students
	})
}


// Creating new interview
module.exports.createInterview = async function(req, res){
	let students = [];

	if(req.body.students.length > 0){
		students = req.body.students.map((id) => {
			return {candidate: id, interviewStatus: 'On hold'}
		});
	}
	
	req.body.students = students;	// required for not mentioning each field in schema while creating

	let newInterview = await Interview.create(req.body);

	if (req.body.students.length > 0) {
      for (let i of req.body.students) {
         let student = await Student.findById(i.candidate);
         student.allInterview.push({
            company: newInterview._id,
            interviewStatus: "On hold",
         });
         student.save();
      }
   }
	
	return res.redirect('back');
}


// Setting interview-status
module.exports.setInterviewStatus = async function(req, res){

	await Interview.updateOne(
		{ '_id': req.body.interviewId, "students.candidate": req.body.studentId },
		{
			$set: {
			"students.$.interviewStatus": req.body.interviewStatus,
			},
		}
  	);


	if (req.body.interviewStatus == 'pass'){
		await Student.updateOne({ _id: req.body.studentId }, {placementStatus: 'Placed'});
	}

	await Student.updateOne(
		{ _id: req.body.studentId, "allInterview.company": req.body.interviewId },
		{
			$set: {
				"allInterview.$.interviewStatus": req.body.interviewStatus,
			},
		}
	);
	

	return res.redirect('back');
}


// Adding new student to an interview
module.exports.addNewStudent = async function(req, res){

	if (req.body.studentId != "--Add a student--"){

		let interview = await Interview.findById(req.body.interviewId);
		
		let newStudent = interview.students.filter(s => s.candidate == req.body.studentId);
	
		if(newStudent.length == 0){
	
			interview.students.push({
				candidate: req.body.studentId,
				interviewStatus: 'On hold'
			});
	
			interview.save();
	
			let student = await Student.findById(req.body.studentId);

			student.allInterview.push({
				company: interview._id,
				interviewStatus: 'On hold'
			});
	
			student.save();
		}
	}	

   return res.redirect("back");
}


// Download all interview data as csv
module.exports.downloadInterviewLog = async function(req, res){
	try{
		let interviews = await Interview.find({}).populate({
			path: "students",
			populate: {
				path: "candidate",
			},
		});

		let newInterviewList = [];

		for(let i of interviews){
			let interview = {
            companyName: i.companyName,
            interviewDate: i.interviewDate,
            students: i.students.map((student) => {
               return {
                  candidate: student.candidate.name,
                  interviewStatus: student.interviewStatus,
               };
            }),
         };
			newInterviewList.push(interview);
		}


		const fields = [
			// 'companyName',
			// 'interviewDate',
			// 'students.candidate',
			// 'students.interviewStatus',
         { label: "Company Name", value: "companyName" },
         { label: "Interview Date", value: "interviewDate" },
         { label: "Candidate", value: "students.candidate" },
         { label: "Status", value: "students.interviewStatus" }
      ];	
      const transforms = [unwind({ paths: ["students"], blankOut: true })];
	
		const json2csvParser = new Parser({ fields, transforms });
		const csv = json2csvParser.parse(newInterviewList);
	
		res.attachment("interview_details.csv");
		res.send(csv);
		
	}catch(err){
		console.log('error in downloading file', err);
		return res.redirect("back");
	}
}