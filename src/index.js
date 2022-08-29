import configureStore from "./store/configureStore";
import * as actions from "./store/bugs";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
    console.log("Store changed", store.getState());
});

store.dispatch(actions.bugAdded("bug 1"));
store.dispatch(actions.bugAdded("bug 2"));
store.dispatch(actions.bugAdded("bug 3"));

// unsubscribe();

store.dispatch(actions.bugResolved(1));

// store.dispatch(bugRemoved(1));

// console.log(store);
