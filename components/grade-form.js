class GradeForm {
  constructor(formElement) {
    this.formElement = formElement;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formElement.addEventListener('submit', this.handleSubmit)
    this.currentId = 0;
    this.setFormValue = this.setFormValue.bind(this);
  }

  onSubmit(createGrade) {
    this.createGrade = createGrade;
  }
  onUpdate(updateGrade) {
    this.updateGrade = updateGrade;
    this.currentId = 0
  }
  handleSubmit(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    var dataName = formData.get('name');
    var dataCourse = formData.get('course');
    var dataGrade = formData.get('grade');

    if (this.currentId) {
      this.updateGrade(this.currentId, dataName, dataCourse, dataGrade)
    } else{
      this.createGrade(dataName, dataCourse, dataGrade);
    }
    event.target.reset();
  }

  setFormValue(data) {
    this.currentId = data.id;
    this.formElement.name.value = data.name;
    this.formElement.course.value = data.course;
    this.formElement.grade.value = data.grade;
  }
}
