const Student = require('../models/student');
const { Parser } = require("json2csv");


// Rendering Home page (students-page)
module.exports.studentsPage = async function (req, res) {
   try {
      let students = await Student.find({});
   
      return res.render("students", {
         title: "All Students",
         allStudents: students,
      });
   } catch (err) {
      console.log("Error in rendering home page", err);
   }
};


// Adding new student
module.exports.addStudent = async function(req, res){
   try{
      req.body.allInterview = [];
      await Student.create(req.body);
      return res.redirect('back');
   }catch(err){
      console.log('Error in adding new student', err);
      return res.redirect('back');
   }
}


// Download all students data as csv
module.exports.downloadStudentsLog = async function(req, res){	
   try{
      let students = await Student.find({});

      // Removing ',' from date to include in csv
      students = students.map((student) => {
         student.batch = student.batch.replace(',', '_');
         student.batch = student.batch.replace(' ', '');
         return student;
      });
      
      const fields = ['name', 'batch', 'college', 'dsaScore', 'webdScore', 'reactScore', 'placementStatus'];      
      
      const csvParser = new Parser({fields});
      const csv = csvParser.parse(students);
   
      res.attachment('student_details.csv');
      res.send(csv);

   }catch(err){
		console.log("error in downloading file", err);
      return res.redirect("back");
   }
}