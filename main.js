/* global App */
/* global GradeTable*/
/* global PageHeader*/
/* global GradeForm*/
var table = document.querySelector("table");
var gradeTable = new GradeTable(table);

var header = document.querySelector("header");
var pagerHeader = new PageHeader(header);

var form = document.querySelector("form");
var gradeForm = new GradeForm(form);

var grade1 = new App(gradeTable, pagerHeader, gradeForm);
grade1.start();
