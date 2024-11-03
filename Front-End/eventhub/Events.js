/**
 * An object containing various message types for task management.
 */

/*
Events object serves as a unique identifier for specific events. 
For example, NewTask, LoadTasks, and StoreTask can be used as keys when subscribing or publishing events through the EventHub.
Event names are managed in one place, and components can reference these constants instead of hardcoding event names.

When components need to publish or listen for events (a new task is created or tasks are loaded), they can use these event names with the EventHub methods.

For ecample:
A component might call EventHub.getInstance().publish(Events.NewTask, taskData) when a new task is created.
Another component might subscribe to this event with EventHub.getInstance().subscribe(Events.NewTask, handleNewTask).
*/
export const Events = {
  NewTask: 'NewTask',

  LoadTasks: 'LoadTasks',
  LoadTasksSuccess: 'LoadTasksSuccess',
  LoadTasksFailure: 'LoadTasksFailure',

  StoreTask: 'StoreTask',
  StoreTaskSuccess: 'StoreTaskSuccess',
  StoreTaskFailure: 'StoreTaskFailure',

  UnStoreTasks: 'UnStoreTasks',
  UnStoreTasksSuccess: 'UnStoreTasksSuccess',
  UnStoreTasksFailure: 'UnStoreTasksFailure',

  // View Switching Events:
  SwitchToMainView: 'SwitchToMainView',
  SwitchToSimpleView: 'SwitchToSimpleView',
};
