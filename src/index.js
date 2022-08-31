import configureStore from "./store/configureStore";

// import * as bugs from "./store/bugs";
import {
    bugAdded,
    bugResolved,
    bugAssignToUser,
    bugReceived,
    getUnresolvedBugs,
    getBugsByUser,
    loadBugs,
    addBug,
    resolveBug,
} from "./store/bugs";
import { prjAdded } from "./store/projects";
import { userAdded } from "./store/users";

import * as apiActions from "./store/api";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
    console.log("Store changed", store.getState());
});

// store.dispatch({
//     type: apiActions.apiCallBegin.type,
//     payload: {
//         url: "/bugs",
//         onSuccess: "bugs list received",
//         onError: "apiReqFailure",
//     },
// });
// store.dispatch(
//     apiActions.apiCallBegin({
//         url: "/bugs",
//         onSuccess: bugReceived.type,
//         onError: "",
//     })
// );
store.dispatch(loadBugs());

// store.dispatch(prjAdded({ name: "project 1" }));

// setTimeout(() => {
//     store.dispatch(loadBugs());
// }, 2000);

// store.dispatch(addBug({ description: "bug 1", test: "bbbc" }));
// store.dispatch(addBug({ description: "bug 2", test: "bbbc" }));

store.dispatch(resolveBug({ id: "1661936619196", resolved: true, userId: 1 }));

// store.dispatch(userAdded({ name: "user 1" }));
// store.dispatch(userAdded({ name: "user 2" }));

// store.dispatch(bugAdded({ description: "bug 1" }));
// store.dispatch(bugAdded({ description: "bug 2" }));
// store.dispatch(bugAdded({ description: "bug 3" }));

// store.dispatch(bugAssignToUser({ bugId: 3, userId: 2 }));

// // unsubscribe();

// store.dispatch(bugResolved({ id: 1 }));

// store.dispatch(bugRemoved(1));

// const x1 = getUnresolvedBugs(store.getState());
// const x2 = getUnresolvedBugs(store.getState());
// console.log(x1 === x2);

// console.log(getBugsByUser(1)(store.getState()));
// console.log(getBugsByUser(2)(store.getState()));

// console.log(store);
