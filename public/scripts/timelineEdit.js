console.log("Howdy there");

setTimelineSaveButton();
setNewEventButton();
setDeleteButton();
updateTimelinePreview(document.querySelector("#timeline-edit form").id.value);

function setNewEventButton() {
  const newEventButton = document.querySelector("#new-event button");
  newEventButton.onclick = (e) => {
    e.preventDefault();
    const form = e.target.closest("form");
    const eventBody = {
      title: form.title.value,
      image: form.image.value,
      content: form.content.value,
      color: form.color.value,
      time_start: {
        year: form.time_start_year.value,
        month: form.time_start_month.value,
        day: form.time_start_day.value,
        hour: form.time_start_hour.value,
        minute: form.time_start_minute.value,
      },
      time_end: {
        year: form.time_end_year.value,
        month: form.time_end_month.value,
        day: form.time_end_day.value,
        hour: form.time_end_hour.value,
        minute: form.time_end_minute.value,
      },
      timeline: form.timeline.value,
    };
    axios.post("/event", eventBody).then((apiRes) => {
      const eventData = { ...apiRes.data };
      const newForm = createFilledForm(eventData);
      const eventList = document.getElementById("event-list");
      eventList.insertBefore(newForm, eventList.querySelector("form"));
      resetValues(form);
      updateTimelinePreview(
        document.querySelector("#timeline-edit form").id.value
      );
    });
  };
}

function setDeleteButton() {
  const deleteButton = document.querySelector("#timeline-edit button.delete");
  const div = document.createElement("div");
  div.classList.add("deletePrompt");
  const prompt = document.createElement("div");
  div.appendChild(prompt);
  const promptText = document.createElement("p");
  promptText.innerText = "Are you sure you want to delete?";
  prompt.appendChild(promptText);
  // Delete is a post request sent by a form
  const deleteForm = document.createElement("form");
  deleteForm.method = "POST";
  prompt.appendChild(deleteForm);
  const confirmDelete = document.createElement("button");
  confirmDelete.innerText = "Delete";
  deleteForm.appendChild(confirmDelete);
  const cancelDelete = document.createElement("button");
  cancelDelete.innerText = "Cancel";
  prompt.appendChild(cancelDelete);
  cancelDelete.onclick = function () {
    div.remove();
  };
  deleteButton.onclick = function (e) {
    const id = e.target.closest("form").id.value;
    deleteForm.action = `/timeline/${id}/delete/`;
    confirmDelete.onclick = function () {
      console.log(id);
      axios.post(`/timeline/${id}/delete`);
    };
    e.preventDefault();
    document.querySelector("html").appendChild(div);
  };
}

document.querySelectorAll("#event-list form").forEach((form) => {
  addListenersToEventForm(form);
});

async function updateTimelinePreview(id) {
  const timelineData = await axios.get(`/timeline/${id}?format=json`);
  renderTimeline(timelineData.data);
}

function renderTimeline(timelineData) {
  const bars = document.querySelector(".bars");
  const containt = document.querySelector(".containt");
  containt.innerHTML = "";
  bars.innerHTML = "";
  timelineData.forEach((bar) => {
    bars.innerHTML += `
    <div class="bar ${bar.color} " style="grid-row-start: ${bar.startRow}${
      bar.endRow ? `; grid-row-end: ${bar.endRow}` : ``
    }">
      <div class="content">
          <div class="head">
              <h3>${bar.title}</h3>
          </div>
          <div class="icon text-${bar.color}">T</div>
          <h4>Category</h4>
          <p>${bar.content}.</p>
      </div>
    </div>
    `;
    containt.appendChild(bars);
  });
}

function setTimelineSaveButton() {
  const saveButton = document.querySelector("#timeline-edit button.save");
  saveButton.onclick = function (e) {
    e.preventDefault();
    const form = saveButton.closest("form");
    const formData = new FormData();
    formData.append("title", form.title.value);
    formData.append("scope", form.scope.value);
    formData.append("image", form.image.files[0]);
    formData.append("description", form.description.value);
    axios.post(`/timeline/${form.id.value}`, formData).then((apiRes) => {
      console.log(apiRes);
      const h2 = document.querySelector("h2");
      h2.innerText = apiRes.data.title;
      h2.style.backgroundImage = `url("${apiRes.data.image}")`;
      console.log("Saved!");
    });
  };
}

function resetValues(form) {
  form.title.value = "";
  form.image.value = "";
  form.content.value = "";
  form.time_start_year.value = "";
  form.time_start_month.value = "";
  form.time_start_day.value = "";
  form.time_start_hour.value = "";
  form.time_start_minute.value = "";
  form.time_end_year.value = "";
  form.time_end_month.value = "";
  form.time_end_day.value = "";
  form.time_end_hour.value = "";
  form.time_end_minute.value = "";
  const radios = form.querySelectorAll("[type='radio']");
  radios.forEach((item) => {
    item.checked = false;
  });
}

function createFilledForm(data) {
  const form = document.createElement("form");
  form.classList.add("event-card");
  form.innerHTML = `
  <h4>${data.title}</h4>
  <input class="event-toggle-checkbox" type="checkbox" id="title-toggle-${
    data.id
  }">
  <label for="title-toggle-${data.id}">
      <p class="edit">Edit</p>
      <p class="close">Close</p>
  </label>
  <label for="title">Title</label>
  <input type="text" name="title" id="title" value="${data.title}">
  <label for="image">Image</label>
  <input type="text" name="image" id="image" value="${data.image}">
  <label for="content">Content</label>
  <textarea name="content" id="content">${data.content}</textarea>
  <div class="margin-top color-picker">
    <label>Color</label>
    <input type="radio" ${data.color === "red" ? `checked` : ``} id="red-${
    data.id
  }" name="color" value="red">
    <label class="color-choice red" for="red-${data.id}"></label>
    <input type="radio" ${data.color === "blue" ? `checked` : ``} id="blue-${
    data.id
  }" name="color" value="blue">
    <label class="color-choice blue" for="blue-${data.id}"></label>
    <input type="radio" ${
      data.color === "yellow" ? `checked` : ``
    } id="yellow-${data.id}" name="color" value="yellow">
    <label class="color-choice yellow" for="yellow-${data.id}"></label>
    <input type="radio" ${data.color === "green" ? `checked` : ``} id="green-${
    data.id
  }" name="color" value="green">
    <label class="color-choice green" for="green-${data.id}"></label>
  </div>
  ${data.time_end.year ? `<h4>Time Start</h4>` : `<h4>Time End</h4>`}
  <div class="time">
      <div>
          <label for="time_start_year">Year</label>
          <input type="number" name="time_start_year" id="time_start_year" value="${
            data.time_start.year
          }">
      </div>
      <div>
          <label for="time_start_month">Month</label>
          <input type="number" name="time_start_month" id="time_start_month" min="1" max="12"
              value="${data.time_start.month}">
      </div>
      <div>
          <label for="time_start_day">Day</label>
          <input type="number" name="time_start_day" id="time_start_day" min="1" max="31"
              value="${data.time_start.day}">
      </div>
      <div>
          <label for="time_start_hour">Hour</label>
          <input type="number" name="time_start_hour" id="time_start_hour" min="0" max="23"
              value="${data.time_start.hour}">
      </div>
      <div>
          <label for="time_start_minute">Minute</label>
          <input type="number" name="time_start_minute" id="time_start_minute" min="0" max="59"
              value="${data.time_start.minute}">
      </div>
  </div>
  ${
    !data.time_end.year
      ? ``
      : `
  <h4>Time End</h4>
  <div class="time">
      <div>
          <label for="time_end_year">Year</label>
          <input type="number" name="time_end_year" id="time_end_year" value="${data.time_end.year}">
      </div>
      <div>
          <label for="time_end_month">Month</label>
          <input type="number" name="time_end_month" id="time_end_month" min="1" max="12"
              value="${data.time_end.month}">
      </div>
      <div>
          <label for="time_end_day">Day</label>
          <input type="number" name="time_end_day" id="time_end_day" min="1" max="31"
              value="${data.time_end.day}">
      </div>
      <div>
          <label for="time_end_hour">Hour</label>
          <input type="number" name="time_end_hour" id="time_end_hour" min="0" max="23"
              value="${data.time_end.hour}">
      </div>
      <div>
          <label for="time_end_minute">Minute</label>
          <input type="number" name="time_end_minute" id="time_end_minute" min="0" max="59"
              value="${data.time_end.minute}">
      </div>
  </div>
  `
  }
  <div class="buttons">
      <button class="edit" data-id=${data._id}>Save</button>
      <button class="delete" data-id=${data._id}>Delete</button>
  </div>
  `;
  addListenersToEventForm(form);
  return form;
}

function addListenersToEventForm(form) {
  const editButton = form.querySelector("button.edit");
  const deleteButton = form.querySelector("button.delete");
  const id = editButton.getAttribute("data-id");
  editButton.onclick = (e) => {
    e.preventDefault();
    const eventBody = {
      title: form.title.value,
      image: form.image.value,
      content: form.content.value,
      color: form.color.value,
      time_start: {
        year: form.time_start_year.value,
        month: form.time_start_month.value,
        day: form.time_start_day.value,
        hour: form.time_start_hour.value,
        minute: form.time_start_minute.value,
      },
      time_end: {
        year: form.time_end_year.value,
        month: form.time_end_month.value,
        day: form.time_end_day.value,
        hour: form.time_end_hour.value,
        minute: form.time_end_minute.value,
      },
    };
    axios.post(`/event/${id}`, eventBody).then((apiRes) => {
      form.querySelector("h4").innerText = form.title.value;
      editButton.style.background = "green";
      updateTimelinePreview(
        document.querySelector("#timeline-edit form").id.value
      );
      setTimeout(function () {
        editButton.style.background = null;
      }, 200);
    });
  };
  deleteButton.onclick = (e) => {
    console.log("Delete delete");
    e.preventDefault();
    axios.delete(`/event/${id}`).then((apiRes) => {
      form.style.border = "5px solid red";
      updateTimelinePreview(
        document.querySelector("#timeline-edit form").id.value
      );
      setTimeout(function () {
        form.remove();
      }, 200);
    });
  };
}
