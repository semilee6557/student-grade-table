/* global App */
/* global GradeTable*/
/* global PageHeader*/
var table = document.querySelector("table");
var gradeTable = new GradeTable(table);

var header = document.querySelector("header");
var pagerHeader = new PageHeader(header);


var grade1 = new App(gradeTable, pagerHeader);
grade1.start();
