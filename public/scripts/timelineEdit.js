console.log("Howdy there");

const newEventButton = document.querySelector("#new-event button");

newEventButton.onclick = (e) => {
  e.preventDefault();
  const form = e.target.closest("form");
  const eventBody = {
    title: form.title.value,
    image: form.image.value,
    content: form.content.value,
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
    eventList.insertBefore(newForm, eventList.firstChild);
    resetValues(form);
  });
};

document.querySelectorAll("#event-list form").forEach((form) => {
  addListenersToEventForm(form);
});

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
}

function createFilledForm(data) {
  const form = document.createElement("form");
  form.classList.add("event-card");
  form.innerHTML = `
<div>
  <label for="title">Title</label>
  <input type="text" name="title" id="title" placeholder="title" value="${data.title}">
</div>
<div>
  <label for="image">Image</label>
  <input type="text" name="image" id="image" placeholder="image url" value=${data.image}>
</div>
<div>
  <label for="content">Content</label>
  <textarea name="content" id="content">${data.content}</textarea>
</div>
<h4>Time Start</h4>
<div>
  <label for="time_start_year">Year</label>
  <input type="number" name="time_start_year" id="time_start_year" value=${data.time_start.year}>
</div>
<div>
  <label for="time_start_month">Month</label>
  <input type="number" name="time_start_month" id="time_start_month" min="1" max="12" value=${data.time_start.month}>
</div>
<div>
  <label for="time_start_day">Day</label>
  <input type="number" name="time_start_day" id="time_start_day" min="1" max="31" value=${data.time_start.day}>
</div>
<div>
  <label for="time_start_hour">Hour (24)</label>
  <input type="number" name="time_start_hour" id="time_start_hour" min="0" max="23" value=${data.time_start.hour}>
</div>
<div>
  <label for="time_start_minute">Minute</label>
  <input type="number" name="time_start_minute" id="time_start_minute" min="0" max="59" value=${data.time_start.minute}>
</div>
<h4>Time End</h4>
<div>
  <label for="time_end_year">Year</label>
  <input type="number" name="time_end_year" id="time_end_year" value=${data.time_end.year}>
</div>
<div>
  <label for="time_end_month">Month</label>
  <input type="number" name="time_end_month" id="time_end_month" min="1" max="12" value=${data.time_end.month}>
</div>
<div>
  <label for="time_end_day">Day</label>
  <input type="number" name="time_end_day" id="time_end_day" min="1" max="31" value=${data.time_end.day}>
</div>
<div>
  <label for="time_end_hour">Hour (24)</label>
  <input type="number" name="time_end_hour" id="time_end_hour" min="0" max="23" value=${data.time_end.hour}>
</div>
<div>
  <label for="time_end_minute">Minute</label>
  <input type="number" name="time_end_minute" id="time_end_minute" min="0" max="59" value=${data.time_end.minute}>
</div>
<input type="hidden" name="timeline" value="{{timeline._id}}">
<button class="edit" data-id="${data._id}">Save</button>
<button class="delete" data-id="${data._id}">Delete</delete>
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
      editButton.style.background = "green";
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
      setTimeout(function () {
        form.remove();
      }, 200);
    });
  };
}
