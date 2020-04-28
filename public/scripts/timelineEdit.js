console.log("Howdy there");

const newEventButton = document.querySelector("#new-event button");

newEventButton.onclick = (e) => {
  e.preventDefault();
  const form = e.target.closest("form");
  const eventBody = {
    title: form.title.value,
    image: form.image.value,
    content: form.content.value,
    time_start: form.time_start.value,
    time_end: form.time_end.value,
    timeline: form.timeline.value,
  };
  axios.post("/event", eventBody).then((apiRes) => {
    const div = document.createElement("div");
    div.classList.add("event-card");
    const eventData = { ...apiRes.data };
    console.log(eventData);
    div.innerHTML = `
    <p>${eventData.title}</p>
    <p>${eventData.image}</p>
    <p>${eventData.content}</p>
    <p>${eventData.time_start}</p>
    <p>${eventData.time_end}</p>
    <span class="edit">Edit</span>
    <span class="delete">Delete</span>`;
    const eventList = document.getElementById("event-list");
    eventList.insertBefore(div, eventList.firstChild);
    form.title.value = "";
    form.image.value = "";
    form.content.value = "";
    form.time_start.value = "";
    form.time_end.value = "";
    form.timeline.value = "";
  });
};
