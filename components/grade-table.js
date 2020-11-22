class GradeTable {
  constructor(tableElement, noGradesElement) {
    this.tableElement = tableElement;
    this.noGradesElement = noGradesElement;
  }
  updateGrades(grades) {
    this.renderGradeRow(grades, this.deleteGrade);

    if (grades) {
      var p = document.querySelector('p');
      p.className = "d-none";
    } else {
      p.className = "";
    }

  }
  onDeleteClick(deleteGrade) {
    this.deleteGrade = deleteGrade;
  }
  renderGradeRow(data, deleteGrade) {
    var tbody = this.tableElement.querySelector("tbody");
    for (var i = 0; i < data.length; i++) {
      var tr = document.createElement("tr")
      var tdName = document.createElement("td")
      var tdCourse = document.createElement("td")
      var tdGrade = document.createElement("td")
      var tdButton = document.createElement("td")


      tdName.textContent = data[i].name;
      tdCourse.textContent = data[i].course;
      tdGrade.textContent = data[i].grade;
      tdButton.innerHTML = '<button type="button" class="btn btn-danger">DELETE</button>'

      tr.append(tdName, tdCourse, tdGrade, tdButton);

      tbody.append(tr)
    }
    var deleteBtn = this.tableElement.querySelector("button");
    deleteBtn.addEventListener("click", function () {
      deleteGrade(data.id)
    });
  }
}
