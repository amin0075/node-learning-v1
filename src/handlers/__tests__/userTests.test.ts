import request from "supertest";
import app from "../../server";

describe("user handler", () => {
  it("should create a new user", async () => {
    const res = await request(app)
      .post("/user")
      .send({ username: "negar", password: "admin" })
      .set("Accept", "application/json");
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.status).toEqual(200);
  });
});
