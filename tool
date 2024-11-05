<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daily Check-In</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen relative">
  <div class="container mx-auto max-w-lg bg-white rounded-lg shadow-lg p-8">
    <h2 id="checkInTitle" class="text-2xl font-bold mb-4 text-center">Daily Check-In</h2>

    <!-- Form Inputs -->
    <form id="checkinForm" class="space-y-4">
      
      <!-- Yesterday's Top 3 Review -->
      <div>
        <label class="block font-semibold mb-2">Yesterday’s Top 3 Review</label>
        
        <!-- Task 1 -->
        <div class="mb-4">
          <label class="block font-semibold">Task 1</label>
          <input type="text" id="yesterdayTask1" placeholder="Task 1 title..." class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring mb-2">
          <label><input type="checkbox" id="yesterdayTask1Completed" checked onchange="toggleReason(1)"> Completed</label>
          <textarea id="yesterdayTask1Reason" placeholder="Reason for not completing..." class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring mt-2 hidden"></textarea>
        </div>

        <!-- Task 2 -->
        <div class="mb-4">
          <label class="block font-semibold">Task 2</label>
          <input type="text" id="yesterdayTask2" placeholder="Task 2 title..." class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring mb-2">
          <label><input type="checkbox" id="yesterdayTask2Completed" checked onchange="toggleReason(2)"> Completed</label>
          <textarea id="yesterdayTask2Reason" placeholder="Reason for not completing..." class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring mt-2 hidden"></textarea>
        </div>

        <!-- Task 3 -->
        <div class="mb-4">
          <label class="block font-semibold">Task 3</label>
          <input type="text" id="yesterdayTask3" placeholder="Task 3 title..." class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring mb-2">
          <label><input type="checkbox" id="yesterdayTask3Completed" checked onchange="toggleReason(3)"> Completed</label>
          <textarea id="yesterdayTask3Reason" placeholder="Reason for not completing..." class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring mt-2 hidden"></textarea>
        </div>
      </div>

      <!-- Top 3 for Tomorrow -->
      <div>
        <label class="block font-semibold mb-2">Top 3 for Tomorrow</label>
        
        <!-- Task 1 -->
        <div class="mb-4">
          <input type="text" id="tomorrowTask1" placeholder="Task 1 title..." class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring mb-2">
          <textarea id="tomorrowTask1Description" placeholder="Optional description..." class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"></textarea>
        </div>
        
        <!-- Task 2 -->
        <div class="mb-4">
          <input type="text" id="tomorrowTask2" placeholder="Task 2 title..." class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring mb-2">
          <textarea id="tomorrowTask2Description" placeholder="Optional description..." class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"></textarea>
        </div>
        
        <!-- Task 3 -->
        <div class="mb-4">
          <input type="text" id="tomorrowTask3" placeholder="Task 3 title..." class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring mb-2">
          <textarea id="tomorrowTask3Description" placeholder="Optional description..." class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"></textarea>
        </div>
      </div>

      <!-- Reflections from Today -->
      <div id="dynamicSections">
        <div class="flex justify-between items-center mb-2">
          <label class="block font-semibold">Wins</label>
          <button type="button" onclick="addReflectionField('winsContainer', 'wins')" class="text-blue-500">+ Add</button>
          <select id="winsFormat" class="ml-2 px-2 py-1 border rounded-md focus:outline-none">
            <option value="bullet">Bulleted</option>
            <option value="numbered">Numbered</option>
          </select>
        </div>
        <div id="winsContainer" class="mb-4 space-y-2"></div>

        <div class="flex justify-between items-center mb-2">
          <label class="block font-semibold">Challenges</label>
          <button type="button" onclick="addReflectionField('challengesContainer', 'challenges')" class="text-blue-500">+ Add</button>
          <select id="challengesFormat" class="ml-2 px-2 py-1 border rounded-md focus:outline-none">
            <option value="bullet">Bulleted</option>
            <option value="numbered">Numbered</option>
          </select>
        </div>
        <div id="challengesContainer" class="mb-4 space-y-2"></div>

        <div class="flex justify-between items-center mb-2">
          <label class="block font-semibold">Self-Reflections</label>
          <button type="button" onclick="addReflectionField('selfReflectionsContainer', 'selfReflection')" class="text-blue-500">+ Add</button>
          <select id="selfReflectionsFormat" class="ml-2 px-2 py-1 border rounded-md focus:outline-none">
            <option value="bullet">Bulleted</option>
            <option value="numbered">Numbered</option>
          </select>
        </div>
        <div id="selfReflectionsContainer" class="mb-4 space-y-2"></div>
      </div>

      <!-- Day Score Slider -->
      <div>
        <label class="block font-semibold mb-2">Rate Your Day</label>
        <input type="range" id="dayScore" min="1" max="10" step="0.5" value="5" class="w-full" oninput="updateDayScore()">
        <p class="text-center mt-2" id="dayScoreValue">5</p>
      </div>

      <!-- Habit Tracker -->
      <div>
        <label class="block font-semibold mb-2">Habit Tracker</label>
        <div class="grid grid-cols-2 gap-4">
          <label><input type="checkbox" id="meditation"> Meditation</label>
          <label><input type="checkbox" id="workout"> Workout</label>
          <label><input type="checkbox" id="healthyEating"> Healthy Eating</label>
          <label><input type="checkbox" id="water"> Drink 2L+ Water</label>
          <label><input type="checkbox" id="read"> Read 10 Pages</label>
          <label><input type="checkbox" id="podcast" onchange="togglePodcastSection()"> Podcast</label>
        </div>
      </div>

      <!-- Podcast Section (Shown only if Podcast is selected) -->
      <div id="podcastSection" class="hidden">
        <label class="block font-semibold mt-4">Podcast Details</label>
        <input type="text" id="podcastTitle" placeholder="Podcast Title" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring mb-2">
        <textarea id="podcastNotes" placeholder="What did you learn or find interesting?" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"></textarea>
      </div>

      <!-- Gratitude -->
      <div>
        <label class="block font-semibold mb-2">Gratitude</label>
        <textarea id="gratitude" placeholder="List things you're grateful for..." class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"></textarea>
      </div>

      <!-- Generate Markdown Button -->
      <button type="button" onclick="generateMarkdown()" class="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring">Copy Markdown</button>
    </form>

    <!-- Notification Popup -->
    <div id="copyNotification" class="fixed top-4 right-4 bg-green-500 text-white font-semibold py-2 px-4 rounded shadow-lg hidden">Copied to clipboard!</div>
  </div>

  <script>
    // Set the title with the full date
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

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.innerHTML = "&#10006;";
      deleteButton.className = "ml-2 text-red-500 font-bold";
      deleteButton.onclick = () => div.remove();

      div.appendChild(input);
      div.appendChild(deleteButton);
      container.appendChild(div);
    }

    function toggleReason(taskNumber) {
      const checkbox = document.getElementById(`yesterdayTask${taskNumber}Completed`);
      const reasonTextarea = document.getElementById(`yesterdayTask${taskNumber}Reason`);
      reasonTextarea.classList.toggle("hidden", checkbox.checked);
    }

    function togglePodcastSection() {
      document.getElementById("podcastSection").classList.toggle("hidden", !document.getElementById("podcast").checked);
    }

    function updateDayScore() {
      document.getElementById("dayScoreValue").textContent = document.getElementById("dayScore").value;
    }

    function showNotification() {
      const notification = document.getElementById("copyNotification");
      notification.classList.remove("hidden");
      setTimeout(() => notification.classList.add("hidden"), 2000);
    }

    function generateMarkdown() {
      const dayOfWeek = document.getElementById("checkInTitle").textContent;
      const formattedMarkdown = `${dayOfWeek} - Your Markdown Code Here (Complete the form elements before generating!)`;
      navigator.clipboard.writeText(formattedMarkdown).then(() => {
        showNotification();
      }).catch(console.error);
    }
  </script>
</body>
</html>
