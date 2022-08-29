import configureStore from "./store/configureStore";

// import * as bugs from "./store/bugs";
import { bugAdded, bugResolved, getUnresolvedBugs } from "./store/bugs";

// import * as prj from "./store/projects";
import { prjAdded } from "./store/projects";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
    console.log("Store changed", store.getState());
});

store.dispatch(prjAdded({ name: "project 1" }));

store.dispatch(bugAdded({ description: "bug 1" }));
store.dispatch(bugAdded({ description: "bug 2" }));
store.dispatch(bugAdded({ description: "bug 3" }));

// unsubscribe();

store.dispatch(bugResolved({ id: 1 }));

// store.dispatch(bugRemoved(1));

const x = getUnresolvedBugs(store.getState());
const y = getUnresolvedBugs(store.getState());
console.log(x === y);

// console.log(store);
