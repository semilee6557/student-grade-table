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
    this.pagerHeader.updateAverage(parseInt(average));
  }
  constructor(gradeTable, pagerHeader, gradeForm) {
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
    this.createGrade = this.createGrade.bind(this);
    this.handleCreateGradeError = this.handleCreateGradeError.bind(this);
    this.handleCreateGradeSuccess = this.handleCreateGradeSuccess.bind(this);
    this.gradeForm = gradeForm;
    this.gradeTable = gradeTable;
    this.pagerHeader = pagerHeader;
    this.deleteGrade = this.deleteGrade.bind(this);
    this.handleDeleteGradeError = this.handleDeleteGradeError.bind(this);
    this.handleDeleteGradeSuccess = this.handleDeleteGradeSuccess.bind(this);
    this.handleEditGradeError = this.handleEditGradeError.bind(this);
    this.handleEditGradeSuccess = this.handleEditGradeSuccess.bind(this);
    this.editGrade = this.editGrade.bind(this);
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
    this.gradeForm.onEditGrade(this.editGrade);
    this.gradeTable.onDeleteClick(this.deleteGrade);
    this.gradeTable.onEditClick(this.gradeForm.setFormValue);

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
  deleteGrade(id) {
    var appConfig = {
      type: "DELETE",
      headers: {
        "X-Access-Token": "jpVhjpBr"
      },
      success: this.handleDeleteGradeSuccess,
      error: this.handleDeleteGradeError
    };
    $.ajax("https://sgt.lfzprototypes.com/api/grades/" + id, appConfig)
  }

  handleDeleteGradeError(error) {
    console.error();
  }
  handleDeleteGradeSuccess() {
    this.getGrades();
  }

  handleEditGradeError(error) {
    console.error();
  }
  handleEditGradeSuccess() {
    this.getGrades();
  }

  editGrade(id, data) {
    var appConfig = {
      type: "PATCH",
      headers: {
        "X-Access-Token": "jpVhjpBr"
      },
      success: this.handleEditGradeSuccess,
      error: this.handleEditGradeError,
      data: data,
    };
    $.ajax("https://sgt.lfzprototypes.com/api/grades/" + id, appConfig)
  }
}
