// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZPn-5K1z9fv5zRoK9JknfSB8Ahi3-DUI",
  authDomain: "project-362aa.firebaseapp.com",
  projectId: "project-362aa",
  storageBucket: "project-362aa.appspot.com",
  messagingSenderId: "1074162603640",
  appId: "1:1074162603640:web:c55b7fab0c7afac7177f8d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  getFirestore,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

const db = getFirestore();

let isHw = false;
let isExam = false;

function selectHW() {
  if (isExam) {
    deactivateExam();
    activateHW();
  } else if (isHw) {
    deactivateHW();
  } else {
    activateHW();
  }
}

function selectExam() {
  if (isHw) {
    deactivateHW();
    activateExam();
  } else if (isExam) {
    deactivateExam();
  } else {
    activateExam();
  }
}

function activateHW() {
  isHw = true;
  let hwButton = document.getElementById("homework-button");
  hwButton.classList.add("active-homework-button");
}

function activateExam() {
  isExam = true;
  let examButton = document.getElementById("exam-button");
  examButton.classList.add("active-exam-button");
}

function deactivateHW() {
  isHw = false;
  let hwButton = document.getElementById("homework-button");
  hwButton.classList.remove("active-homework-button");
}

function deactivateExam() {
  isExam = false;
  let examButton = document.getElementById("exam-button");
  examButton.classList.remove("active-exam-button");
}

const hwRef = collection(db, "Homework");
const exRef = collection(db, "Exam");

redrawDOM();

async function addTask() {
  // console.log("add task");

  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const subject = document.getElementById("subject").value;
  const title = document.getElementById("title").value;
  const description = document.getElementById("description-text").value;

  if (isHw) {
    addDoc(hwRef, {
      date,
      time,
      subject,
      title,
      description,
    });
  } else {
    addDoc(exRef, {
      date,
      time,
      subject,
      title,
      description,
    });
  }
}

async function editHwButton(docId) {
  document.getElementById("editIcon" + docId).classList.remove("show-display");
  document.getElementById("updateIcon" + docId).classList.remove("not-display");
  document.getElementById("cancelIcon" + docId).classList.remove("not-display");
  document.getElementById("editIcon" + docId).classList.add("not-display");
  document.getElementById("updateIcon" + docId).classList.add("show-display");
  document.getElementById("cancelIcon" + docId).classList.add("show-display");
  // console.log(docId);

  const item_ref = doc(db, `Homework/${docId}`);
  const get_item = await getDoc(item_ref);
  const item = get_item.data();
  // console.log(item);

  let row = document.getElementById(docId);
  row.innerHTML = `
            <td>
              <input type="date" id="edit-date${docId}" name = "date" class="form-control" value = "${item.date}"/>
            </td>
            <td>
              <input type="time" id="edit-time${docId}" class="form-control" value = "${item.time}"/>
            </td>
            <td>
              <textarea type="text" id="edit-subject${docId}" class="form-control" value = "">${item.subject}</textarea>
            </td>
            <td>
              <textarea type="text" id="edit-title${docId}" class="form-control" value = "">${item.title}</textarea>
            </td>
            <td>
              <textarea type="text" id="edit-description-text${docId}" class="form-control" value = "">${item.description}</textarea>
            </td>
            <td id="column-icon">
              <span class="icon">
                <span id="editIcon${docId}" class="circle not-display">
                  <span id="edit-icon" class="material-symbols-outlined" onclick="editHwButton('${docId}')">
                    edit
                  </span>
                </span>
                <span id="updateIcon${docId}" class="circle">
                  <span id="update-icon" class="material-symbols-outlined" onclick="updateHwItem('${docId}')">
                    check_circle
                  </span>
                </span>
                <span id="cancelIcon${docId}" class="circle">
                  <span id="cancel-icon" class="material-symbols-outlined" onclick="cancelButton('${docId}')">
                    cancel
                  </span>
                </span>
                <span class="circle">
                  <span id="bin" class="material-symbols-outlined" onclick="deleteHwItem('${docId}')">
                    delete
                  </span>
                </span>
              </span>
          </td>
        `;
}

async function editExButton(docId) {
  document.getElementById("editIcon" + docId).classList.remove("show-display");
  document.getElementById("updateIcon" + docId).classList.remove("not-display");
  document.getElementById("cancelIcon" + docId).classList.remove("not-display");
  document.getElementById("editIcon" + docId).classList.add("not-display");
  document.getElementById("updateIcon" + docId).classList.add("show-display");
  document.getElementById("cancelIcon" + docId).classList.add("show-display");

  const item_ref = doc(db, `Exam/${docId}`);
  const get_item = await getDoc(item_ref);
  const item = get_item.data();
  // console.log(item);

  let row = document.getElementById(docId);
  row.innerHTML = `
            <td>
              <input type="date" id="edit-date${docId}" name = "date" class="form-control" value = "${item.date}"/>
            </td>
            <td>
              <input type="time" id="edit-time${docId}" class="form-control" value = "${item.time}"/>
            </td>
            <td>
              <textarea type="text" id="edit-subject${docId}" class="form-control" value = "">${item.subject}</textarea>
            </td>
            <td>
              <textarea type="text" id="edit-title${docId}" class="form-control" value = "">${item.title}</textarea>
            </td>
            <td>
              <textarea type="text" id="edit-description-text${docId}" class="form-control" value = "">${item.description}</textarea>
            </td>
            <td id="column-icon">
              <span class="icon">
                <span id="editIcon${docId}" class="circle not-display">
                  <span id="edit-icon" class="material-symbols-outlined" onclick="editExButton('${docId}')">
                    edit
                  </span>
                </span>
                <span id="updateIcon${docId}" class="circle">
                  <span id="update-icon" class="material-symbols-outlined" onclick="updateExItem('${docId}')">
                    check_circle
                  </span>
                </span>
                <span id="cancelIcon${docId}" class="circle">
                  <span id="cancel-icon" class="material-symbols-outlined" onclick="cancelButton('${docId}')">
                    cancel
                  </span>
                </span>
                <span class="circle">
                  <span id="bin" class="material-symbols-outlined" onclick="deleteExItem('${docId}')">
                    delete
                  </span>
                </span>
              </span>
          </td>
        `;
}

function cancelButton(docId) {
  document.getElementById("editIcon" + docId).classList.remove("not-display");
  document
    .getElementById("updateIcon" + docId)
    .classList.remove("show-display");
  document
    .getElementById("cancelIcon" + docId)
    .classList.remove("show-display");
  document.getElementById("editIcon" + docId).classList.add("show-display");
  document.getElementById("updateIcon" + docId).classList.add("not-display");
  document.getElementById("cancelIcon" + docId).classList.add("not-display");
  redrawDOM();
}

async function redrawDOM() {
  // console.log("redraw");

  const hw_table_body = document.getElementById("homework-list");
  hw_table_body.innerHTML = "";

  // const hwItems = await getDocs(hwRef);

  const q = query(hwRef, orderBy("date"), orderBy("time"));
  const hwItems = await getDocs(q);

  if (hwItems) {
    const datas = hwItems.docs.map((item) => ({
      docId: item.id,
      ...item.data(),
    }));

    // console.log(datas);
    datas.map((item) => {
      // console.log(item);
      // onclick="editHwButton('${item.docId}')"
      hw_table_body.innerHTML += `
        <tr id="${item.docId}">
            <td>${item.date}</td>
            <td>${item.time}</td>
            <td>${item.subject}</td>
            <td>${item.title}</td>
            <td>${item.description}</td>
            <td id="column-icon">
              <span class="icon">
                <span id="editIcon${item.docId}" class="circle">
                  <span id="edit-icon" class="material-symbols-outlined" onclick="editHwButton('${item.docId}')">
                    edit
                  </span>
                </span>
                <span id="updateIcon${item.docId}" class="circle not-display">
                  <span id="update-icon" class="material-symbols-outlined" onclick="updateHwItem('${item.docId}')">
                    check_circle
                  </span>
                </span>
                <span id="cancelIcon${item.docId}" class="circle not-display">
                  <span id="cancel-icon" class="material-symbols-outlined" onclick="cancelButton('${item.docId}')">
                    cancel
                  </span>
                </span>
                <span class="circle">
                  <span id="bin" class="material-symbols-outlined" onclick="deleteHwItem('${item.docId}')">
                    delete
                  </span>
                </span>
              </span>
            </td>
        </tr>
        `;
    });
  }

  const ex_table_body = document.getElementById("exam-list");
  ex_table_body.innerHTML = "";

  // const exItems = await getDocs(exRef);

  const q1 = query(exRef, orderBy("date"), orderBy("time"));
  const exItems = await getDocs(q1);

  if (exItems) {
    const datas = exItems.docs.map((item) => ({
      docId: item.id,
      ...item.data(),
    }));

    // console.log(datas);
    datas.map((item) => {
      // console.log(item);
      ex_table_body.innerHTML += `
        <tr id="${item.docId}">
            <td>${item.date}</td>
            <td>${item.time}</td>
            <td>${item.subject}</td>
            <td>${item.title}</td>
            <td>${item.description}</td>
            <td id="column-icon">
              <span class="icon">
                <span id="editIcon${item.docId}" class="circle">
                  <span id="edit-icon" class="material-symbols-outlined" onclick="editExButton('${item.docId}')">
                    edit
                  </span>
                </span>
                <span id="updateIcon${item.docId}" class="circle not-display">
                  <span id="update-icon" class="material-symbols-outlined" onclick="updateExItem('${item.docId}')">
                    check_circle
                  </span>
                </span>
                <span id="cancelIcon${item.docId}" class="circle not-display">
                  <span id="cancel-icon" class="material-symbols-outlined" onclick="cancelButton('${item.docId}')">
                    cancel
                  </span>
                </span>
                <span class="circle">
                  <span id="bin" class="material-symbols-outlined" onclick="deleteExItem('${item.docId}')">delete</span>
                </span>
              </span>
            </td>
        </tr>
        `;
    });
  }
}

async function updateExItem(docId) {
  const ex_ref = doc(db, `Exam/${docId}`);

  await updateDoc(ex_ref, {
    date: document.getElementById("edit-date" + docId).value,
    time: document.getElementById("edit-time" + docId).value,
    subject: document.getElementById("edit-subject" + docId).value,
    title: document.getElementById("edit-title" + docId).value,
    description: document.getElementById("edit-description-text" + docId).value,
  })
    .then(() => {
      let row = document.getElementById(docId);
      row.innerHTML = `     
        <td>${document.getElementById("edit-date" + docId).value}</td>
        <td>${document.getElementById("edit-time" + docId).value}</td>
        <td>${document.getElementById("edit-subject" + docId).value}</td>
        <td>${document.getElementById("edit-title" + docId).value}</td>
        <td>${
          document.getElementById("edit-description-text" + docId).value
        }</td>
        <td id="column-icon">
          <span class="icon">
            <span id="editIcon${docId}" class="circle">
              <span id="edit-icon" class="material-symbols-outlined" onclick="editExButton('${docId}')">
                edit
              </span>
            </span>
            <span id="updateIcon${docId}" class="circle not-display">
              <span id="update-icon" class="material-symbols-outlined" onclick="updateExItem('${docId}')">
                check_circle
              </span>
            </span>
            <span id="cancelIcon${docId}" class="circle not-display">
              <span id="cancel-icon" class="material-symbols-outlined" onclick="cancelButton('${docId}')">
                cancel
              </span>
            </span>
            <span class="circle">
              <span id="bin" class="material-symbols-outlined" onclick="deleteExItem('${docId}')">delete</span>
            </span>
          </span>
        </td>
    `;
    })
    .then(() => {
      redrawDOM().then(() => {
        alert("update successfully");
      });
    });
}

async function updateHwItem(docId) {
  const hw_ref = doc(db, `Homework/${docId}`);

  await updateDoc(hw_ref, {
    date: document.getElementById("edit-date" + docId).value,
    time: document.getElementById("edit-time" + docId).value,
    subject: document.getElementById("edit-subject" + docId).value,
    title: document.getElementById("edit-title" + docId).value,
    description: document.getElementById("edit-description-text" + docId).value,
  })
    .then(() => {
      let row = document.getElementById(docId);
      row.innerHTML = `
        <td>${document.getElementById("edit-date" + docId).value}</td>
        <td>${document.getElementById("edit-time" + docId).value}</td>
        <td>${document.getElementById("edit-subject" + docId).value}</td>
        <td>${document.getElementById("edit-title" + docId).value}</td>
        <td>${
          document.getElementById("edit-description-text" + docId).value
        }</td>
        <td id="column-icon">
          <span class="icon">
            <span id="editIcon${docId}" class="circle">
              <span id="edit-icon" class="material-symbols-outlined" onclick="editHwButton('${docId}')">
                edit
              </span>
            </span>
            <span id="updateIcon${docId}" class="circle not-display">
              <span id="update-icon" class="material-symbols-outlined" onclick="updateHwItem('${docId}')">
                check_circle
              </span>
            </span>
            <span id="cancelIcon${docId}" class="circle not-display">
              <span id="cancel-icon" class="material-symbols-outlined" onclick="cancelButton('${docId}')">
                cancel
              </span>
            </span>
            <span class="circle">
              <span id="bin" class="material-symbols-outlined" onclick="deleteHwItem('${docId}')">delete</span>
            </span>
          </span>
        </td>
    `;
    })
    .then(() => {
      redrawDOM().then(() => {
        alert("update successfully");
      });
    });
}

async function deleteHwItem(docId) {
  // console.log("deleteHwItem");

  const docRef = doc(db, `Homework/${docId}`);

  await deleteDoc(docRef);
  redrawDOM().then(() => {
    alert("delete sucessfully");
  });
}

async function deleteExItem(docId) {
  // console.log("deleteExItem");

  const docRef = doc(db, `Exam/${docId}`);

  await deleteDoc(docRef);
  redrawDOM().then(() => {
    alert("delete sucessfully");
  });
}

let form = document.querySelector("#myForm");

document.getElementById("homework-button").addEventListener("click", selectHW);
document.getElementById("exam-button").addEventListener("click", selectExam);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (isHw || isExam) {
    addTask().then(() => {
      redrawDOM();
      deactivateExam();
      deactivateHW();
      form.reset();
      return false;
    });
  } else {
    alert("Please choose Homework or Exam.");
  }
});

window.deleteHwItem = deleteHwItem;
window.deleteExItem = deleteExItem;
window.updateHwItem = updateHwItem;
window.updateExItem = updateExItem;
window.editHwButton = editHwButton;
window.editExButton = editExButton;
window.cancelButton = cancelButton;
