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
    var dataScore = parseInt(formData.get('score'));

    if (Object.keys(this.currentData).length) {

        var obj = {}
        // if(dataName!==this.currentData.name){
         obj.name = dataName;
        // } if(dataCourse!==this.currentData.course){
         obj.course = dataCourse;
        // } if(dataGrade!==this.currentData.score){
         obj.score = dataScore;
        // }

      this.editGrade(this.currentData.gradeId, obj)
      console.log(this.currentData.gradeId, obj)
      this.currentData = {}

    } else{
      this.createGrade(dataName, dataCourse, dataScore);
    }
    event.target.reset();
  }

  setFormValue(data) {
    this.currentData = data;
    console.log(data, this.currentData, typeof data.score)
    this.formElement.name.value = data.name;
    this.formElement.course.value = data.course;
    this.formElement.grade.value = data.score;
  }
}
