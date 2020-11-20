/* global App */
class App {
  handleGetGradesError(error) {
    console.error(error);
  }
  handleGetGradesSuccess(grades) {
    console.log(grades)
  }
  constructor() {
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this)
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
