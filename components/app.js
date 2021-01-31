/* global App */
class App {
  handleGetGradesError(error) {
    console.error(error);
  }
  handleGetGradesSuccess(grades) {
    this.cachedGrades = grades;
    this.success()
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
    this.cachedGrades = [];
    this.success = this.success.bind(this);
  }
  getGrades() {
    var ajaxConfig = {
      method: "GET",
      success: this.handleGetGradesSuccess,
      error: this.handleGetGradesError,
    }
    $.ajax("http://localhost:3000/api/grades", ajaxConfig)
  }
  start() {
    this.getGrades();
    this.gradeForm.onSubmit(this.createGrade);
    this.gradeForm.onEditGrade(this.editGrade);
    this.gradeTable.onDeleteClick(this.deleteGrade);
    this.gradeTable.onEditClick(this.gradeForm.setFormValue);

  }
  findIndexwithId(id) {
    for (var i = 0; i < this.cachedGrades.length; i++) {
      if (id === this.cachedGrades[i].id) {
        return i
      }
    }
  }
  success() {
    this.gradeTable.updateGrades(this.cachedGrades);
    var total = 0;
    for (var i = 0; i < this.cachedGrades.length; i++) {
      total += this.cachedGrades[i].score
    }
    var average = total / this.cachedGrades.length;

    this.pagerHeader.updateAverage(parseInt(average));
  }
  handleCreateGradeError(error) {
    console.error(error)
  }
  handleCreateGradeSuccess(grade) {
    grade.score = parseInt(grade.score)
    this.cachedGrades.push(grade);
    this.success()
  }
  createGrade(name, course, grade) {
    var ajaxConfig = {
      method: "POST",
      success: this.handleCreateGradeSuccess,
      error: this.handleCreateGradeError,
      data: {
        name: name,
        course: course,
        score: grade
      }
    }
    $.ajax("http://localhost:3000/api/grades", ajaxConfig)
  }
  deleteGrade(id) {
    var appConfig = {
      type: "DELETE",
      success: this.handleDeleteGradeSuccess.bind(null, id),
      error: this.handleDeleteGradeError
    };
    $.ajax("http://localhost:3000/api/grades" + id, appConfig)
  }

  handleDeleteGradeError(error) {
    console.error(error);
  }
  handleDeleteGradeSuccess(id) {
    var index = this.findIndexwithId(id);
    this.cachedGrades.splice(index, 1);
    this.success()

  }

  handleEditGradeError(error) {
    console.error(error);
  }
  handleEditGradeSuccess(grade) {
    var index = this.findIndexwithId(grade.id);
    this.cachedGrades[index] = grade;
    this.success()

  }

  editGrade(id, data) {
    var appConfig = {
      type: "PATCH",
      success: this.handleEditGradeSuccess,
      error: this.handleEditGradeError,
      score: data,
    };
    $.ajax("http://localhost:3000/api/grades" + id, appConfig)
  }
}
