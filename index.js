const { create } = require("lodash");

// Your code here
function createEmployeeRecord (array){
   const [firstName, familyName, title, payPerHour]= array;
    
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents:[]
    };
}
  /**const array = ["Mike", "Njuguna", "Accountant", 40];
  const employeeRecord = createEmployeeRecord(array);
  console.log(employeeRecord)*/
  function createEmployeeRecords(employeesDetailsArray){
   return employeesDetailsArray.map(array =>createEmployeeRecord(array));
  }
 /**employeesData= [
    ["Mike", "Njuguna", "Accountant", 40],
    ["Juliet", "Mutambi","Manager",45],
    ["Rose","Apondi","Developer",30]
];
const employeeRecords = createEmployeeRecords(employeesData)
console.log(employeeRecords)*/

function createTimeInEvent (array, timeStamp) {
    const [date, time] = timeStamp.split(' ');
    array.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: date
    });
    return array;
}
/**const employeeRecord= {
    firstName: 'Rose',
    familyName: 'Apondi',
    title: 'Developer',
    payPerHour: 30,
    timeInEvents: [],
    timeOutEvents: []
  };
  const timeStamp ="2022-06-01 0600";
  const updatedEmployeeRecord = createTimeInEvent(employeeRecord, timeStamp);
  console.log(updatedEmployeeRecord);*/

  function createTimeOutEvent (array, timeStamp) {
    const [date,time] = timeStamp.split(' ');
    array.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date: date
    });
    return array;
  }
 /**const employeeRecord= {
    firstName: 'Rose',
    familyName: 'Apondi',
    title: 'Developer',
    payPerHour: 30,
    timeInEvents: [],
    timeOutEvents: []
  };
  const timeStamp ="2022-06-01 1300";
  const updatedEmployeeRecord = createTimeOutEvent(employeeRecord, date);
  console.log(updatedEmployeeRecord);*/

  function hoursWorkedOnDate (employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
  const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

  if (!timeInEvent || !timeOutEvent) {
    throw new Error(`No matching timeInEvent or timeOutEvent found for date: ${date}`);
  }
  const hoursWorked= (timeOutEvent.hour -timeInEvent.hour)/100;
  return hoursWorked;
    
  }
  const employeeRecord = {
    firstName: 'Rose',
    familyName: 'Apondi',
    title: 'Developer',
    payPerHour: 30,
    timeInEvents: [{ type: 'TimeIn', hour: 1100, date: '2022-06-01' }],
    timeOutEvents: [ { type: 'TimeOut', hour: 1300, date: '2022-06-01' } ]
  };
  const date = '2022-06-01';
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  console.log(hoursWorked);

  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    const allDatesWorked = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = allDatesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
    return totalWages;
}

function calculatePayroll(employeesArray) {
    return employeesArray.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}

