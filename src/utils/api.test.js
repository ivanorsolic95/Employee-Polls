import { getInitialData } from "./api";

describe("getInitialData", () => {
  it("returns users and questions objects", async () => {
    const data = await getInitialData();

    expect(data).toHaveProperty("users");
    expect(typeof data.users).toBe("object");
    expect(Object.keys(data.users).length).toBeGreaterThan(0);

    expect(data).toHaveProperty("questions");
    expect(typeof data.questions).toBe("object");
    expect(Object.keys(data.questions).length).toBeGreaterThan(0);
  });
});
