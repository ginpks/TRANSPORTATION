// base component file taken from TASKS-V3 from lecture as an example to use.
// BaseComponent enforces a structure, ensuring that all components derived from BaseComponent will provide their own rendering logic.


export class BaseComponent {
  constructor() {
    this.cssLoaded = false;
  }

  /**
   * This is an abstract method that must be implemented by child classes.
   * It must return an HTMLElement object.
   * @abstract
   * @returns {HTMLElement}
   */
  render() {
    throw new Error('render method not implemented');
  }

  // a method for loading CSS stylesheets (loadCSS). 
  loadCSS(fileName) {
    if (this.cssLoaded) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    // Dynamically load CSS from the same directory as the JS file
    link.href = `./components/${fileName}/${fileName}.css`;
    document.head.appendChild(link);
    this.cssLoaded = true;
  }
  
  // facilitates the creation and dispatching of custom events, allowing components to communicate with other parts of the application.
  dispatchCustomEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, { detail });
    this.parent.dispatchEvent(event);
  }
 // allows the component to listen for events from its parent, enabling interaction and responsive behavior within the component hierarchy.
  listenToEvent(eventName, callback) {
    this.parent.addEventListener(eventName, callback);
  }
}
