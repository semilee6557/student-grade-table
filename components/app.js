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
    this.gradeForm = gradeForm;
    this.gradeTable = gradeTable;
    this.pagerHeader = pagerHeader;
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
    this.getGrades()
  }
}
