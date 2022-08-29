import store from "./store";
import { bugAdded, bugRemoved, bugResolved } from "./actions";

const unsubscribe = store.subscribe(() => {
    console.log("Store changed", store.getState());
});

store.dispatch(bugAdded("bug 1"));
store.dispatch(bugAdded("bug 2"));
store.dispatch(bugAdded("bug 3"));

// unsubscribe();

store.dispatch(bugResolved(1));

// store.dispatch(bugRemoved(1));

// console.log(store);
