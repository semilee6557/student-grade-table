/* global App */
class App {
  handleGetGradesError(error) {
    console.error(error);
  }
  handleGetGradesSuccess(grades) {
    this.gradeTable.updateGrades(grades);
    var total = 0;
    for (var i = 0; i < grades.length; i++) {
      total += grades[i].grade
    }
    var average = total / grades.length;
    this.pagerHeader.updateAverage(average);
  }
  constructor(gradeTable, pagerHeader, gradeForm) {
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
    this.createGrade = this.createGrade.bind(this);
    this.gradeForm = gradeForm;
    this.gradeTable = gradeTable;
    this.pagerHeader = pagerHeader;
    this.deleteGrade = this.deleteGrade.bind(this);
    this.handleDeleteGradeError = this.handleDeleteGradeError.bind(this);
    this.handleDeleteGradeSuccess = this.handleDeleteGradeSuccess.bind(this);
  }
  getGrades() {
    var ajaxConfig = {
      method: "GET",
      success: this.handleGetGradesSuccess,
      error: this.handleGetGradesError,
      headers: {
        "X-Access-Token": "jpVhjpBr"
      }
    }
    $.ajax("https://sgt.lfzprototypes.com/api/grades", ajaxConfig)
  }
  start() {
    this.getGrades();
    this.gradeForm.onSubmit(this.createGrade);
  }
  handleCreateGradeError(error) {
    console.error()
  }
  handleCreateGradeSuccess() {
    this.getGrades()
  }
  createGrade(name, course, grade) {
    var ajaxConfig = {
      method: "POST",
      success: this.handleCreateGradeSuccess,
      error: this.handleCreateGradeError,
      headers: {
        "X-Access-Token": "jpVhjpBr"
      },
      data: {
        name: name,
        course: course,
        grade: grade
      }
    }
    $.ajax("https://sgt.lfzprototypes.com/api/grades", ajaxConfig)
  }
  deleteGrade(id){
    console.log(id);
  }
  handleDeleteGradeError(error){
    console.error();
  }
  handleDeleteGradeSuccess(){
    this.getGrades()
  }
}
