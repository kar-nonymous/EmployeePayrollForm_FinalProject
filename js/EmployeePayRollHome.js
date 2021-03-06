let employeeList = [];
window.addEventListener('DOMContentLoaded', ()=>{
  if (site_properties.use_local_storage.match("true")) {
    getEmployeePayrollDataFromStorage();
  } else getEmployeePayrollDataFromServer();
});

const createEmployeeTable = ()=>{
   let innerHtml = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
    for (const empPayrollData of employeeList) {
        innerHtml = `${innerHtml}
        <tr>
            <td><img class="profile" alt="profilePic" src="${empPayrollData._profilePic}"></td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>${getDeptHtml(empPayrollData._department)}</td>
            <td>${empPayrollData._salary}</td>
            <td>${empPayrollData._startDate}</td>
            <td>
            <img id="${empPayrollData.id}" onclick="remove(this)" 
                src="../assets/icons/delete-black-18dp.svg" alt="delete">
            <img id="${empPayrollData.id}" onclick="update(this)" 
                src="../assets/icons/create-black-18dp.svg" alt="edit"></td>
        </tr>
    `;
    }
    document.querySelector(".employeeTable").innerHTML = innerHtml;
}
const getEmployeePayrollDataFromStorage = () => {
  /// Populating the global employee payroll list by using the local storage
  employeeList = localStorage.getItem("NewEmployeePayrollList")
    ? JSON.parse(localStorage.getItem("NewEmployeePayrollList"))
    : [];
  processEmployeePayrollDataResponse();
};
const getEmployeePayrollDataFromServer = () => {
  makeServiceCall("GET", site_properties.server_url, true)
    .then((responseText) => {
      employeeList= JSON.parse(responseText);
      /// Calling the process Employee Payroll Data response to dynamically set the value of employee count onto the home webpage
      processEmployeePayrollDataResponse();
    })
    .catch((error) => {
      console.log("GET Error Status: " + JSON.stringify(error));
      employeeList = [];
      processEmployeePayrollDataResponse();
    });
}
const processEmployeePayrollDataResponse = () => {
  document.querySelector(".emp-count").textContent = employeeList.length;
  createEmployeeTable();
};
const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
  }
  //Function to Remove an employee
const remove = (node) =>{
  // Remove from local storage
  if(site_properties.use_local_storage.match("true"))
  {
      let empPayrollData = employeeList.findIndex(emp => emp.id == node.id);
      if(askDelete())
      employeeList.splice(empPayrollData,1);
      else
      return;
      localStorage.setItem("NewEmployeePayrollList", JSON.stringify(employeeList));
      window.location.replace(site_properties.home_page);
  }
  //or
  // remove from json server
  else
  {
      if(askDelete())
      {
        makeServiceCall("DELETE",site_properties.server_url+node.id.toString(),true)
          .then(window.location.replace(site_properties.home_page))
          .catch(err => {alert(err.statusText);window.location.reload();})
      }
      else
      return;
  }
}

let askDelete = (name) =>{
    return confirm("Do you want to continue with the deletion of employee!!");
}
const update = (node) =>{
  let employeePayrollData = employeeList.find(emp => emp.id == node.id);
  if(employeePayrollData != undefined)
  {
      localStorage.setItem("editEmp",JSON.stringify(employeePayrollData));
      window.location.replace(site_properties.add_user);
  }
}

function createJsonFile()
{
    
      let EmployeePayrollDB = 
      [
        {
          "id": 1,
          "_name": "Mark Taylor",
          "_gender": "male",
          "_department": [
            "HR",
            "Sales",
            "Finance",
            "Engineer"
          ],
          "_salary": "500000",
          "_startDate": "29 Oct 2019",
          "_note": "All In One",
          "_profilePic": "../assets/profile -3.png"
        },
        {
          "_name": "Bharathi",
          "_profilePic": "../assets/profile -1.png",
          "_gender": "female",
          "_department": [
            "Finance"
          ],
          "_salary": "372000",
          "_note": "jkhkjk testtttt",
          "_startDate": "1 Nov 2020",
          "id": 2
        },
        {
          "id": 3,
          "_name": "Aravidh",
          "_profilePic": "../assets/profile -2.png",
          "_gender": "male",
          "_department": [
            "Finance",
            "Engineer"
          ],
          "_salary": "362000",
          "_note": " ,mnndfnsAhdsfhdskhfdsjk",
          "_startDate": "1 Nov 2020"
        },
        {
          "id": 4,
          "_name": "Harika",
          "_profilePic": "../assets/profile -4.png",
          "_gender": "female",
          "_department": [
            "Finance"
          ],
          "_salary": "337400",
          "_note": "dsflds",
          "_startDate": "1 Nov 2020"
        },
        {
          "id": 5,
          "_name": "Ayush",
          "_profilePic": "../assets/profile -3.png",
          "_gender": "male",
          "_department": [
            "Finance"
          ],
          "_salary": "363300",
          "_note": "Afdsfsd",
          "_startDate": "1 Nov 2020"
        }
      ]
       return EmployeePayrollDB;
}