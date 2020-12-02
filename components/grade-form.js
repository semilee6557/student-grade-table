class GradeForm {
  constructor(formElement) {
    this.formElement = formElement;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setFormValue = this.setFormValue.bind(this);
    this.currentData = {};
    this.formElement.addEventListener('submit', this.handleSubmit)
  }

  onSubmit(createGrade) {
    this.createGrade = createGrade;
  }
  onEditGrade(editGrade) {
    this.editGrade = editGrade;
  }
  handleSubmit(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    var dataName = formData.get('name');
    var dataCourse = formData.get('course');
    var dataGrade = formData.get('grade');

    if (Object.keys(this.currentData).length) {

        var obj = {}
        if(dataName!==this.currentData.name){
         obj.name = dataName;
        } if(dataCourse!==this.currentData.course){
         obj.course = dataCourse;
        } if(dataGrade!==this.currentData.grade){
         obj.grade = dataGrade;
        }

      this.editGrade(this.currentData.id, obj)
      this.currentData = {}

    } else{
      this.createGrade(dataName, dataCourse, dataGrade);
    }
    event.target.reset();
  }

  setFormValue(data) {
    this.currentData = data;
    this.formElement.name.value = data.name;
    this.formElement.course.value = data.course;
    this.formElement.grade.value = data.grade;
  }
}
