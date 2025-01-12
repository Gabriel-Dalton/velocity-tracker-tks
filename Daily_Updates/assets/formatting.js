function setDayInTitle() {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const today = new Date();
    document.getElementById("checkInTitle").textContent = `Daily Check-In - ${today.toLocaleDateString("en-US", options)}`;
  }
  setDayInTitle();

  function addReflectionField(containerId, sectionType) {
    const container = document.getElementById(containerId);
    const div = document.createElement("div");
    div.className = "flex items-center mb-2";

    const input = document.createElement("textarea");
    input.placeholder = `Add ${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}...`;
    input.className = "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring";
    input.name = sectionType;
    input.oninput = saveToCookies;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "ml-2 text-red-500";
    deleteButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M6 2a2 2 0 00-2 2v1H3a1 1 0 100 2h14a1 1 0 100-2h-1V4a2 2 0 00-2-2H6zM5 9a1 1 0 011-1h8a1 1 0 011 1v7a2 2 0 01-2 2H7a2 2 0 01-2-2V9z" />
      </svg>`;
    deleteButton.onclick = () => {
      div.remove();
      saveToCookies();
    };

    div.appendChild(input);
    div.appendChild(deleteButton);
    container.appendChild(div);
    saveToCookies();
  }

  function toggleCheckbox(taskNumber, type) {
    const completedCheckbox = document.getElementById(`yesterdayTask${taskNumber}Completed`);
    const partialCheckbox = document.getElementById(`yesterdayTask${taskNumber}Partial`);
    const reasonTextarea = document.getElementById(`yesterdayTask${taskNumber}Reason`);
    const partialReasonTextarea = document.getElementById(`yesterdayTask${taskNumber}PartialReason`);

    if (type === "completed") {
      partialCheckbox.checked = false;
      reasonTextarea.classList.toggle("hidden", completedCheckbox.checked);
      partialReasonTextarea.classList.add("hidden");
    } else if (type === "partial") {
      completedCheckbox.checked = false;
      partialReasonTextarea.classList.toggle("hidden", !partialCheckbox.checked);
      reasonTextarea.classList.add("hidden");
    }
    saveToCookies();
  }

  function togglePodcastSection() {
    document.getElementById("podcastSection").classList.toggle("hidden", !document.getElementById("podcast").checked);
  }

  function updateDayScore() {
    document.getElementById("dayScoreValue").textContent = document.getElementById("dayScore").value;
  }

  function saveToCookies() {
    const fields = document.querySelectorAll("#checkinForm input, #checkinForm textarea, #checkinForm select");
    fields.forEach(field => {
      document.cookie = `${field.id}=${encodeURIComponent(field.value)}; path=/;`;
    });
  }

  function loadFromCookies() {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [name, value] = cookie.split("=");
      acc[name] = decodeURIComponent(value);
      return acc;
    }, {});

    for (let id in cookies) {
      const field = document.getElementById(id);
      if (field) {
        if (field.type === "checkbox") field.checked = cookies[id] === "true";
        else field.value = cookies[id];
      }
    }
  }

  function clearCookies() {
    const fields = document.querySelectorAll("#checkinForm input, #checkinForm textarea, #checkinForm select");
    fields.forEach(field => {
      document.cookie = `${field.id}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  }

  loadFromCookies();

  function formatList(items, formatType) {
    return items.map((item, index) => formatType === "numbered" ? `${index + 1}. ${item}` : `- ${item}`).join("\n");
  }

  function showNotification(message = "Copied to clipboard!") {
    const notification = document.getElementById("copyNotification");
    notification.textContent = message;
    notification.classList.remove("hidden");
    setTimeout(() => notification.classList.add("hidden"), 2000);
  }

  function generateSlackMarkdown() {
const dayOfWeek = document.getElementById("checkInTitle").textContent;

function formatTaskReview(taskNumber) {
  const taskTitle = document.getElementById(`yesterdayTask${taskNumber}`).value.trim();
  const isCompleted = document.getElementById(`yesterdayTask${taskNumber}Completed`).checked;
  const isPartial = document.getElementById(`yesterdayTask${taskNumber}Partial`).checked;
  const reason = document.getElementById(`yesterdayTask${taskNumber}Reason`).value.trim();
  const partialReason = document.getElementById(`yesterdayTask${taskNumber}PartialReason`).value.trim();

  if (!taskTitle) return "";

  let status = "";
  if (isCompleted) {
    status = "✅ Completed";
  } else if (isPartial) {
    status = `🔄 Partially Done${partialReason ? ` - Reason: ${partialReason}` : ""}`;
  } else {
    status = "❌ Not Completed";
  }

  return `• Task ${taskNumber}: *${taskTitle}* (${status})${!isCompleted && reason ? ` - Reason: ${reason}` : ""}`;
}

const yesterdayReview = `*Yesterday's Top 3 Review:*\n${[1, 2, 3]
  .map(taskNumber => formatTaskReview(taskNumber))
  .filter(Boolean)
  .join("\n")}`;

const tomorrowTask1 = document.getElementById("tomorrowTask1").value.trim();
const tomorrowTask1Description = document.getElementById("tomorrowTask1Description").value.trim();

const tomorrowTask2 = document.getElementById("tomorrowTask2").value.trim();
const tomorrowTask2Description = document.getElementById("tomorrowTask2Description").value.trim();

const tomorrowTask3 = document.getElementById("tomorrowTask3").value.trim();
const tomorrowTask3Description = document.getElementById("tomorrowTask3Description").value.trim();

const tomorrowTasks = `*Top 3 for Tomorrow:*\n${[
  tomorrowTask1 ? `• Task 1: *${tomorrowTask1}*${tomorrowTask1Description ? ` - ${tomorrowTask1Description}` : ""}` : "",
  tomorrowTask2 ? `• Task 2: *${tomorrowTask2}*${tomorrowTask2Description ? ` - ${tomorrowTask2Description}` : ""}` : "",
  tomorrowTask3 ? `• Task 3: *${tomorrowTask3}*${tomorrowTask3Description ? ` - ${tomorrowTask3Description}` : ""}` : ""
]
  .filter(Boolean)
  .join("\n")}`;

const wins = Array.from(document.getElementsByName("wins")).map(win => `• ${win.value.trim()}`).join("\n");
const challenges = Array.from(document.getElementsByName("challenges")).map(challenge => `• ${challenge.value.trim()}`).join("\n");
const selfReflections = Array.from(document.getElementsByName("selfReflection")).map(reflection => `• ${reflection.value.trim()}`).join("\n");

const dayScore = document.getElementById("dayScore").value;

const habits = [
  { id: "meditation", label: "Meditation" },
  { id: "workout", label: "Workout" },
  { id: "healthyEating", label: "Healthy Eating" },
  { id: "water", label: "Drink 2L+ Water" },
  { id: "read", label: "Read 10 Pages" },
  { id: "podcast", label: "Podcast" },
  { id: "duolingo", label: "Duolingo" }
];
const habitStatus = habits
  .map(habit => `• ${habit.label}: ${document.getElementById(habit.id).checked ? "✅" : "❌"}`)
  .join("\n");

const podcastChecked = document.getElementById("podcast").checked;
const podcastDetails = podcastChecked
  ? `\n• Podcast Title: ${document.getElementById("podcastTitle").value.trim()}\n• Podcast Notes: ${document.getElementById("podcastNotes").value.trim()}`
  : "";

const gratitude = document.getElementById("gratitude").value.trim().split("\n").map(item => `• ${item}`).join("\n");

const slackMarkdown = `${dayOfWeek}\n\n${yesterdayReview}\n\n${tomorrowTasks}\n\n*Wins:*\n${wins}\n\n*Challenges:*\n${challenges}\n\n*Self-Reflections:*\n${selfReflections}\n\n*Day Score:*\n• ${dayScore}/10\n\n*Habit Tracker:*\n${habitStatus}${podcastDetails}\n\n*Gratitude:*\n${gratitude}`;

navigator.clipboard.writeText(slackMarkdown).then(() => {
  showNotification("Slack Markdown copied!");
}).catch(console.error);
}