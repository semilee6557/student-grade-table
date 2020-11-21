class GradeForm {
  constructor(formElement) {
    this.formElement = formElement;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formElement.addEventListener('submit', this.handleSubmit)
  }

  onSubmit(createGrade) {
    this.createGrade = createGrade;
  }
  handleSubmit(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    var dataName = formData.get('name');
    var dataCourse = formData.get('course');
    var dataGrade = formData.get('grade');
    this.createGrade(dataName, dataCourse, dataGrade);
    event.target.reset();
  }
}
