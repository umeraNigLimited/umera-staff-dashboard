// service-worker.js
self.addEventListener("push", (event) => {
  const data = event.data.json(); // Parse the data sent by the push or socket event

  self.registration.showNotification(data.title, {
    body: data.body,
    //   icon: data.icon,
    //   actions: data.actions, // Action buttons for notifications
    //   data: data.url, // Add custom data (e.g., a URL to handle clicks)
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "view") {
    event.waitUntil(clients.openWindow(event.notification.data));
  }
});
