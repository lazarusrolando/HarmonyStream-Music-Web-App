const notificationService = {
  async getNotifications(userEmail) {
    // Simulate fetching notifications from an API or database
    return [
      { id: 1, read: false, message: 'Welcome to HarmonyStream!' },
      { id: 2, read: true, message: 'Your playlist has been updated.' },
    ];
  },
};

export default notificationService;
