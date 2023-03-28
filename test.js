function test(params) {
    try {
        if (!params) throw new Error
        console.log(params);
    } catch (error) {
        console.log("Hi");
    }
}

test();
test("with params")
