const toast = (store) => (next) => (action) => {
    if (action.type === "error") console.log("toastify ero...");

    return next(action);
};

export default toast;
