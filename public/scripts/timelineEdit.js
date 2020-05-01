console.log("Howdy there");

setTimelineSaveButton();
setNewEventButton();
setDeleteButton();
updateTimelinePreview(document.querySelector("#timeline-edit form").id.value);

function setNewEventButton() {
  const newEventButton = document.querySelector("#new-event button");
  console.log(newEventButton);
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
      const parentDiv = document.createElement("div");
      const newForm = createFilledForm(eventData);
      parentDiv.appendChild(newForm);
      const eventList = document.querySelector("#event-list .tab");
      const firstChild = document.querySelector("#event-list .tab label");
      parentDiv.classList.add(`delete-${apiRes.data.id}`);
      parentDiv.id = `edit-event-${apiRes.data.id}`;
      eventList.insertBefore(parentDiv, firstChild);
      const label = document.createElement("label");
      label.classList.add(`delete-${apiRes.data.id}`);
      label.setAttribute("for", `event-list-toggle-${apiRes.data.id}`);
      label.innerHTML = `<h4 id="title-${apiRes.data.id}">${form.title.value}</h4>`;
      const input = document.createElement("input");
      input.setAttribute("type", "radio");
      input.setAttribute("name", "event-list-toggle");
      input.setAttribute("id", `event-list-toggle-${apiRes.data.id}`);
      input.classList.add(`delete-${apiRes.data.id}`);
      input.classList.add(`event-list-toggle`);
      eventList.insertBefore(input, parentDiv);
      eventList.insertBefore(label, input);
      resetValues(form);
      updateTimelinePreview(
        document.querySelector("#timeline-edit form").id.value
      );
    });
  };
}

function setDeleteButton() {
  const deleteButton = document.querySelector("#timeline-edit button.delete");
  console.log(deleteButton);
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
					<div class="head" 
					
					style="background-image: url('${
            bar.image
          }'); background-size: cover; background-position: center center;"
					
					>
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
  console.log(saveButton);
  saveButton.onclick = function (e) {
    e.preventDefault();
    const form = saveButton.closest("form");
    const formData = new FormData();
    formData.append("title", form.title.value);
    formData.append("scope", form.scope.value);
    formData.append("image", form.image.files[0]);
    formData.append("description", form.description.value);
    axios
      .post(`/timeline/${form.id.value}`, formData)
      .then((apiRes) => {
        console.log(apiRes);
        const h2 = document.querySelector("h2");
        h2.innerText = apiRes.data.title;
        console.log("Saved!");
      })
      .catch((err) => console.log(err));
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

// function createFilledForm(data) {
//   const form = document.createElement("form");
//   form.classList.add("event-card");
//   form.innerHTML = `
//   <h4>${data.title}</h4>
//   <input class="event-toggle-checkbox" type="checkbox" id="title-toggle-${
//     data.id
//   }">
//   <label for="title-toggle-${data.id}">
//       <p class="edit">Edit</p>
//       <p class="close">Close</p>
//   </label>
//   <label for="title">Title</label>
//   <input type="text" name="title" id="title" value="${data.title}">
//   <label for="image">Image</label>
//   <input type="text" name="image" id="image" value="${data.image}">
//   <label for="content">Content</label>
//   <textarea name="content" id="content">${data.content}</textarea>
//   <div class="margin-top color-picker">
//     <label>Color</label>
//     <input type="radio" ${data.color === "red" ? `checked` : ``} id="red-${
//     data.id
//   }" name="color" value="red">
//     <label class="color-choice red" for="red-${data.id}"></label>
//     <input type="radio" ${data.color === "blue" ? `checked` : ``} id="blue-${
//     data.id
//   }" name="color" value="blue">
//     <label class="color-choice blue" for="blue-${data.id}"></label>
//     <input type="radio" ${
//       data.color === "yellow" ? `checked` : ``
//     } id="yellow-${data.id}" name="color" value="yellow">
//     <label class="color-choice yellow" for="yellow-${data.id}"></label>
//     <input type="radio" ${data.color === "green" ? `checked` : ``} id="green-${
//     data.id
//   }" name="color" value="green">
//     <label class="color-choice green" for="green-${data.id}"></label>
//   </div>
//   ${data.time_end.year ? `<h4>Time Start</h4>` : `<h4>Time End</h4>`}
//   <div class="time">
//       <div>
//           <label for="time_start_year">Year</label>
//           <input type="number" name="time_start_year" id="time_start_year" value="${
//             data.time_start.year
//           }">
//       </div>
//       <div>
//           <label for="time_start_month">Month</label>
//           <input type="number" name="time_start_month" id="time_start_month" min="1" max="12"
//               value="${data.time_start.month}">
//       </div>
//       <div>
//           <label for="time_start_day">Day</label>
//           <input type="number" name="time_start_day" id="time_start_day" min="1" max="31"
//               value="${data.time_start.day}">
//       </div>
//       <div>
//           <label for="time_start_hour">Hour</label>
//           <input type="number" name="time_start_hour" id="time_start_hour" min="0" max="23"
//               value="${data.time_start.hour}">
//       </div>
//       <div>
//           <label for="time_start_minute">Minute</label>
//           <input type="number" name="time_start_minute" id="time_start_minute" min="0" max="59"
//               value="${data.time_start.minute}">
//       </div>
//   </div>
//   ${
//     !data.time_end.year
//       ? ``
//       : `
//   <h4>Time End</h4>
//   <div class="time">
//       <div>
//           <label for="time_end_year">Year</label>
//           <input type="number" name="time_end_year" id="time_end_year" value="${data.time_end.year}">
//       </div>
//       <div>
//           <label for="time_end_month">Month</label>
//           <input type="number" name="time_end_month" id="time_end_month" min="1" max="12"
//               value="${data.time_end.month}">
//       </div>
//       <div>
//           <label for="time_end_day">Day</label>
//           <input type="number" name="time_end_day" id="time_end_day" min="1" max="31"
//               value="${data.time_end.day}">
//       </div>
//       <div>
//           <label for="time_end_hour">Hour</label>
//           <input type="number" name="time_end_hour" id="time_end_hour" min="0" max="23"
//               value="${data.time_end.hour}">
//       </div>
//       <div>
//           <label for="time_end_minute">Minute</label>
//           <input type="number" name="time_end_minute" id="time_end_minute" min="0" max="59"
//               value="${data.time_end.minute}">
//       </div>
//   </div>
//   `
//   }
//   <div class="buttons">
//       <button class="edit" data-id=${data._id}>Save</button>
//       <button class="delete" data-id=${data._id}>Delete</button>
//   </div>
//   `;
//   addListenersToEventForm(form);
//   return form;
// }

function createFilledForm(data) {
  const form = document.createElement("form");
  form.classList.add("event-card");
  form.innerHTML = `
	<div class="element">
		<label class="inline" for="title_${data.id}">Title</label>
		<input type="text" name="title" value="${data.title}" id="title_${
    data.id
  }" placeholder="Title">
	</div>
	<div class="element">
		<label class="inline" for="image_event_${data.id}">Image</label>
		<input id="image_event_${data.id}" name="image" type="file">
	</div>
	<div class="element text">
		<label class="inline" for="content_${data.id}">Content</label>
		<textarea name="content" id="content_${data.id}">${data.content}</textarea>
	</div>
	<div class="element picker">
		<div class="color-picker">
				<label class="inline">Color</label>
				<input type="radio" ${data.color === "red" ? `checked` : ``} id="red-${
    data.id
  }" name="color" value="red">
					<label class="color-choice red" for="red-${data.id}"></label>
					<input type="radio" ${data.color === "blue" ? `checked` : ``} id="blue-${
    data.id
  }" name="color" value="blue">
					<label class="color-choice blue" for="blue-${data.id}"></label>
					<input type="radio" ${data.color === "yellow" ? `checked` : ``} id="yellow-${
    data.id
  }" name="color" value="yellow">
					<label class="color-choice yellow" for="yellow-${data.id}"></label>
					<input type="radio" ${data.color === "green" ? `checked` : ``} id="green-${
    data.id
  }" name="color" value="green">
					<label class="color-choice green" for="green-${data.id}"></label>
		</div>
	</div>
	<div class="time-lord">
	<h4 class="isnt-span">Time</h4>
</div>
<div class="human">
	<div class="time" data-time="start">
			<h5>Time Start</h5>
			<div>
					<input type="number" value="${
            data.time_start.year
          }" class="datedata last-show" name="time_start_year" id="time_start_year_${
    data.id
  }" placeholder="YYYY">
					<input type="number" value="${
            data.time_start.month
          }" class="datedata" name="time_start_month" id="time_start_month_${
    data.id
  }" min="1" max="12" placeholder="MM">
					<input type="number" value="${
            data.time_start.day
          }" class="datedata" name="time_start_day" id="time_start_day_${
    data.id
  }" min="1" max="31" placeholder="DD">
					<input type="number" value="${
            data.time_start.hour
          }" class="datedata" name="time_start_hour" id="time_start_hour_${
    data.id
  }" min="0" max="23" placeholder="HH">
					<input type="number" value="${
            data.time_start.minute
          }" class="datedata" name="time_start_minute" id="time_start_minute_${
    data.id
  }" min="0" max="59" placeholder="mm">
			</div>
	</div>
	<div class="time" data-time="end">
			<h5>Time End</h5>
			<div>
					<input type="number" value="${
            data.time_end.year
          }" class="datedata last-show" name="time_end_year" id="time_end_year_${
    data.id
  }" placeholder="YYYY">
					<input type="number" value="${
            data.time_end.month
          }" class="datedata" name="time_end_month" id="time_end_month_${
    data.id
  }" min="1" max="12" placeholder="MM">
					<input type="number" value="${
            data.time_end.day
          }" class="datedata" name="time_end_day" id="time_end_day_${
    data.id
  }" min="1" max="31" placeholder="DD">
					<input type="number" value="${
            data.time_end.hour
          }" class="datedata" name="time_end_hour" id="time_end_hour_${
    data.id
  }" min="0" max="23" placeholder="HH">
					<input type="number" value="${
            data.time_end.minute
          }" class="datedata" name="time_end_minute" id="time_end_minute_${
    data.id
  }" min="0" max="59" placeholder="mm">
			</div>
	</div>
</div>
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
  editButton.onclick = async (e) => {
    e.preventDefault();
    // Send image
    try {
      if (form.image.files[0]) {
        const formData = new FormData();
        formData.append("image", form.image.files[0]);
        await axios
          .post(`/event/${id}/image`, formData)
          .then((apiRes) => console.log(apiRes))
          .catch((err) => console.log(err));
      }
      // Set formbody
      const eventBody = {
        title: form.title.value,
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
      // Send rest of data
      const apiRes = await axios.post(`/event/${id}`, eventBody);
      document.getElementById(`title-${id}`).innerText = form.title.value;
      editButton.style.background = "blue";
      updateTimelinePreview(
        document.querySelector("#timeline-edit form").id.value
      );
      setTimeout(function () {
        editButton.style.background = null;
      }, 200);
    } catch (err) {
      console.log(err);
    }
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
        document.querySelectorAll(`.delete-${id}`).forEach((x) => x.remove());
        // form.parentElement.previousSibling.remove();
        // form.parentElement.previousSibling.remove();
        // form.parentElement.remove();
      }, 200);
    });
  };
}

// Guillaume stuff ~~

const spanOrPoint = document.getElementById("span-or-point");
const divStart = document.querySelector(`.human .time[data-time="start"]`);
const divStartTitle = divStart.querySelector("h5");
const divEnd = document.querySelector(`.human .time[data-time="end"]`);

spanOrPoint.addEventListener("change", (e) => {
  if (spanOrPoint.checked) {
    divStartTitle.textContent = "Time";
    divEnd.style.display = "none";
  } else {
    divStartTitle.textContent = "Time Start";
    divEnd.style.display = "flex";
  }
});

const listDatesStart = divStart.querySelectorAll("input");
listDatesStart.forEach((date) => {
  date.addEventListener("input", showNextInput);
});

const listDatesEnd = divEnd.querySelectorAll("input");
listDatesEnd.forEach((date) => {
  date.addEventListener("input", showNextInput);
});

function showNextInput(e) {
  if (e.target.value !== "") {
    if (e.target.nextSibling.nextSibling) {
      e.target.nextSibling.nextSibling.style.display = "block";
    }
  } else if (e.target.value === 0) {
    const all = e.target.closest(".time").querySelectorAll("input");
    // ok need to think of it clearly. Need to search sibligns with value = 0
    // and hide them
  } else {
    if (e.target.nextSibling.nextSibling)
      e.target.nextSibling.nextSibling.style.display = "none";
  }
}
