import { addBug, bugAdded } from "../bugs";
import { apiCallBegin } from "../api";

import configureStore from "../configureStore";

describe("bugsSlice", () => {
    describe("Action creator", () => {
        it("addBug", () => {
            const bug = { description: "bug 2", test: "bbbc" };
            const result = addBug(bug);
            const exptected = {
                type: apiCallBegin.type,
                payload: {
                    url: "/bugs",
                    method: "post",
                    data: bug,
                    onSuccess: bugAdded.type,
                },
            };
            expect(result).toEqual(exptected);
        });
    });

    it("should handle addBug action", async () => {
        const bug = { description: "bug 2", test: "bbbc" };
        const store = configureStore();
        await store.dispatch(addBug(bug));
        console.log(store.getState());
        expect(store.getState().entities.bugs.list).toHaveLength(1);
    });
});
