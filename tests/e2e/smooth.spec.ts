import { goto, wait } from "./utils"

describe("Smooth test", function() {
    test("Sidebar", async () => {
        await goto("/")
        await wait("sidebar")
        await wait("appbar")
    })
})