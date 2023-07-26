import minorVersion from "./minorVersion";

it("cuts off minor and patch", () => {
	expect(minorVersion("v0.1.2")).toStrictEqual("v0.1");
});
