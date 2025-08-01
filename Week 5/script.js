const apiKey = "b67d5261014b44079da184624253107";

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return;

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();

    document.getElementById("temperature").innerText = `${data.current.temp_c}°C`;
    document.getElementById("location").innerText = data.location.name;
    document.getElementById("humidity").innerText = `${data.current.humidity}%`;
    document.getElementById("wind").innerText = `${data.current.wind_kph} km/h`;
    document.getElementById("weatherIcon").innerHTML = `
      <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}" />
    `;
  } catch (err) {
    alert("Could not fetch weather. Please enter a valid city.");
  }
}

const commentForm = document.getElementById("commentForm");
const commentsList = document.getElementById("commentsList");

commentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const comment = { name, email, message };
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.push(comment);
  localStorage.setItem("comments", JSON.stringify(comments));

  displayComments();
  commentForm.reset();
});

function displayComments() {
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  commentsList.innerHTML = comments.map(
    c => `<div><strong>${c.name}</strong> (${c.email}):<br>${c.message}</div>`
  ).join("");
}
window.onload = displayComments;