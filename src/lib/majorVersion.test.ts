import majorVersion from "./majorVersion";

it("cuts off patch", () => {
	expect(majorVersion("v0.1.2")).toStrictEqual("v0");
});
