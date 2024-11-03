// file is copied from tasks-v3 from lecture to reference as an example for our use.

export class EventHub {
  constructor() {
    this.events = {}; // maintains an events object, where each key represents an event name, and its value is an array of listeners (callback functions) that are subscribed to that event.
  }

  // Subscribe to an event.
  // Allows components to register a listener for a specific event. 
  // If the event does not exist, it creates a new entry. 
  // This method returns an unsubscribe function that allows the caller to remove the listener later
  subscribe(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);

    // Return an unsubscribe function for convenience
    return () => this.unsubscribe(event, listener);
  }

  // Publish an event
  // Triggers all the listeners associated with a specific event, passing along any data provided. 
  // If there are no listeners for the event, it does nothing
  publish(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(listener => listener(data));
  }

  // Unsubscribe from an event
  // removes a specific listener from the array of listeners for a given event
  unsubscribe(event, listenerToRemove) {
    if (!this.events[event]) return;

    // Filter out the listener that should be removed
    this.events[event] = this.events[event].filter(
      listener => listener !== listenerToRemove
    );
  }

  // Define a static reference to the EventHub
  static instance = null;

  // Get an instance of the EventHub
  // The class uses the singleton pattern, ensuring that there is only one instance of EventHub throughout the application. 
  // The getInstance static method provides access to this single instance, making it easy to manage events globally
  static getInstance() {
    if (!EventHub.instance) {
      EventHub.instance = new EventHub();
    }
    return EventHub.instance;
  }
}
