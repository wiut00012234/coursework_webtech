const Student = require('../models/student');

exports.getStudents = (req, res) => {
  Student.find()
  .then(students=>{
    res.render('index/students', {
      title_name: 'Students List',
      students: students
    });
  }).catch(err => {
    console.log(err)
    return  res.redirect("/")
  })
};

exports.getAddStudent = (req, res) => {
    res.render('index/add_student', {
      title_name: 'Add Student'
    });
};


exports.getSingleStudent = (req, res) => {
    Student.findById(req.params.studentId)
    .then(student=>{
      if(!student){
          return res.redirect('/404')
      }  
      res.render('index/student_detail', {
        title_name:student.firstName,
        student: student
      });
    }).catch(err => {
      console.log(err)
      return  res.redirect("/")
    })
  };


  exports.deleteSingleStudent = (req, res) => {
    Student.findByIdAndRemove(req.body.studentId)
    .then(()=>{
        return res.redirect("/");
      }).catch(err=>{
        console.log(err)
        return res.redirect("/404")
      })
  };


  exports.postNewStudent = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const level = +req.body.level;
    const major = req.body.major;
    const hobby = req.body.hobby;
    const viewAboutUniversity = req.body.viewAboutUniversity;
    const contractStatus = req.body.contractStatus === "true"? true:false;
    
    const student = new Student({
        firstName,
        lastName,
        level,
        major,
        hobby,
        viewAboutUniversity,
        contractStatus})

    student.save().then(()=>{
       return res.redirect("/");
    }).catch(err=>{
        console.log(err)
        return res.redirect("/404")
    })
  }  


  exports.getEditStudent = (req, res) => {
    const studentId = req.params.studentId;
    Student.findById(studentId)
      .then(student => {
        if (!student) {
          return res.redirect('/404');
        }
        res.render('index/edit_student', {
          title_name: 'Editing Student record',
          student: student
        });
      })
      .catch(err => {
         console.log(err)
         return res.redirect('/404');
      });
  };
  


  exports.postEditStudent = (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const level = req.body.level;
    const major = req.body.major;
    const hobby = req.body.hobby;
    const viewAboutUniversity = req.body.viewAboutUniversity;
    const contractStatus = req.body.contractStatus;
  
    Student.findById(req.params.studentId)
      .then(student => {
        if (!student) {
          return res.redirect('/404');
        }
        student.firstName = firstName;
        student.lastName = lastName;
        student.level = level;
        student.major = major;
        student.hobby = hobby;
        student.viewAboutUniversity = viewAboutUniversity;
        student.contractStatus = contractStatus;
  
        return student.save().then(result => {
          res.redirect('/');
        });
      })
      .catch(err =>{
          console.log(err);
        return res.redirect('/404');
      });
  };