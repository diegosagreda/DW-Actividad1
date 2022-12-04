import {
  onGetEstudiantes,
  saveEstudiante,
  deleteEstudiante,
  getEstudiante,
  updateEstudiante,
 
} from "./firebase.js";

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async (e) => {
 

  onGetEstudiantes((querySnapshot) => {
    tasksContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const estudiante = doc.data();

      tasksContainer.innerHTML += `
        <div class="card card-body mt-2 border-primary">
          <h3 class="h5">Codigo: ${estudiante.codigo}</h3>
          <p>Nombre: ${estudiante.nombre}</p>
          <p>Correo: ${estudiante.correo}</p>
          
          <div>
            <button class="btn btn-primary btn-delete" data-id="${doc.id}">
              🗑 Delete
            </button>
            <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
              🖉 Edit
            </button>
          </div>
        </div>`;
    });

    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          await deleteEstudiante(dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getEstudiante(e.target.dataset.id);
          const estudiante = doc.data();
          taskForm["codigo"].value = estudiante.codigo;
          taskForm["nombre"].value = estudiante.nombre;
          taskForm["correo"].value = estudiante.correo;

          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Update";
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const codigo = taskForm["codigo"];
  const nombre = taskForm["nombre"];
  const correo = taskForm["correo"];

  try {
    if (!editStatus) {
      await saveEstudiante(codigo.value, nombre.value,correo.value);
    } else {
      await updateEstudiante(id, {
        codigo:codigo.value,
        nombre: nombre.value,
        correo: correo.value
      });

      editStatus = false;
      id = "";
      taskForm["btn-task-form"].innerText = "Save";
    }

    taskForm.reset();
    title.focus();
  } catch (error) {
    console.log(error);
  }
});
