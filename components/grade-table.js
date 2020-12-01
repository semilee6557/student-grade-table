class GradeTable {
  constructor(tableElement, noGradesElement) {
    this.tableElement = tableElement;
    this.noGradesElement = noGradesElement;
    }
  updateGrades(grades) {
    var tbody = this.tableElement.querySelector("tbody");
    tbody.innerHTML = ""
    for (var i = 0; i < grades.length; i++) {
      var tr = this.renderGradeRow(grades[i], this.deleteGrade, this.editGrade);
      tbody.append(tr)
    }
    var p = document.querySelector('p');
    if (grades.length) {
      p.className = "d-none";
    } else {
      p.className = "";
    }
  }
  onDeleteClick(deleteGrade) {
    this.deleteGrade = deleteGrade;
  }
  onEditClick(setFormValue) {
    this.setFormValue = setFormValue;
  }
  renderGradeRow(data, deleteGrade, editGrade) {
    var tr = document.createElement("tr")
    var tdName = document.createElement("td")
    var tdCourse = document.createElement("td")
    var tdGrade = document.createElement("td")
    var buttonContainer = document.createElement("td")
    var deleteBtn = document.createElement("button")
    var edit = document.createElement("button")

    tdName.textContent = data.name;
    tdCourse.textContent = data.course;
    tdGrade.textContent = data.grade;
    deleteBtn.className = "btn btn-link text-danger";
    deleteBtn.innerHTML = "<i class=\"fas fa-trash-alt\"></i>"
    edit.className = "btn btn-link text-info";
    edit.innerHTML = "<i class=\"fas fa-edit\"></i>"
    deleteBtn.addEventListener("click", function () {
      deleteGrade(data.id)
    });
    edit.addEventListener("click", function(){
      setFormValue(data)
    })
    buttonContainer.append(edit, deleteBtn);

    tr.append(tdName, tdCourse, tdGrade, buttonContainer);


    return tr
  }
}
