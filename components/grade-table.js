class GradeTable {
  constructor(tableElement) {
    this.tableElement = tableElement
  }
  updateGrades(grades) {
    var tbody = this.tableElement.querySelector("tbody");
    tbody.textContent = ""
    for (var i = 0; i < grades.length; i++) {
      var tr = document.createElement("tr")
      var tdName = document.createElement("td")
      var tdCourse = document.createElement("td")
      var tdGrade = document.createElement("td")

      tdName.textContent = grades.name;
      tdCourse.textContent = grades.course;
      tdGrade.textContent = grades.grade;

      tr.append(tdName, tdCourse, tdGrade);

      tbody.append(tr)
    }
  }
}
