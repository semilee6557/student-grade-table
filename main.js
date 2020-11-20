/* global App */
/* global GradeTable*/
var table = document.querySelector("table");
var gradeTable = new GradeTable(table);

var grade1 = new App(gradeTable);
grade1.start();
