fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to load events: ${response.status}`);
    }
    return response.json();
  })
  .then((events) => {
    const list = document.querySelector("#starred");
    
    // Validate DOM element exists
    if (!list) {
      console.error("Error: #starred element not found in DOM");
      return;
    }
    
    // Validate data is an array
    if (!Array.isArray(events)) {
      console.error("Error: events.json must contain an array");
      return;
    }
    
    // Validate and render each event
    events.forEach((event) => {
      if (!event.name || !event.starred) {
        console.warn("Skipping malformed event:", event);
        return;
      }
      const item = document.createElement("li");
      item.textContent = `${event.name} — starred ${event.starred}`;
      list.appendChild(item);
    });
  })
  .catch((error) => {
    console.error("Failed to load starred repositories:", error);
    // Show error message to user
    const list = document.querySelector("#starred");
    if (list) {
      const errorMsg = document.createElement("li");
      errorMsg.textContent = "Failed to load starred repositories. Check console for details.";
      errorMsg.style.color = "red";
      list.appendChild(errorMsg);
    }
  });