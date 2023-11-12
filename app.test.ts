import request from "supertest";
import app from "./index"; // replace './index' with the path to your index.ts file

describe("POST /reverse", () => {
  it("should reverse the input string", async () => {
    const response = await request(app)
      .post("/reverse")
      .send({ input: "hello" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ reversed: "olleh" });
  });
});

// Assuming /generate endpoint generates a random string of specified length
describe("GET /generate", () => {
  it("should generate a string of the specified length", async () => {
    const length = 5;
    const response = await request(app).get(`/generate?length=${length}`);

    expect(response.status).toBe(200);
    expect(response.body.string).toHaveLength(length);
  });
});
describe("GET /generateAndReverse", () => {
  it("responds with a reversed string of the specified length", async () => {
    const length = 10;
    const response = await request(app).get(
      `/generateAndReverse?length=${length}`
    );

    expect(response.status).toBe(200);
    expect(response.body.original).toHaveLength(length);
    expect(response.body.reversed).toBe(
      response.body.original.split("").reverse().join("")
    );
  });
});
