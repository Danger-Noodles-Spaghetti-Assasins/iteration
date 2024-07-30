import request from "supertest";
import bcrypt from "bcryptjs";
import supabase from "../backend/supabase/supabaseClient.js";
import app from "../backend/index.js"

//mock the supabase client - fake version of module for testing purposes
jest.mock('../backend/supabase/supabaseClient.js');

// TEST SUITE
describe("User Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      supabase.from.mockReturnValue({
        // mocks the supabase.from method, when called, will return an obj that has an insert method -> this insert method is a mock function that when called, resolves to an obj '{error:null}' simulating a successful database insertion
        insert: jest.fn().mockResolvedValue({ error: null }),
      });

      const response = await request(app).post("/signup").send({
        // sends an HTTP POST request to the /signup endpoint, with user data in the req body.
        username: "testuser",
        password: "password123test",
        email: "testuser@example.com",
      });

      expect(response.status).toBe(200);
      expect(supabase.from().insert).toHaveBeenCalledWith({
        // verifies that the mocked insert method was called with the expected args
        username: "testuser",
        password: expect.any(String), // passw can be any string value, allowing flexibility in testing
        email: "testuser@example.com",
      });
    });

    it("should handle errors during user creation", async () => {
      supabase.from.mockReturnValue({
        insert: jest.fn().mockResolvedValue({ error: "Insert error" }),
      });

      const response = await request(app).post("/signup").send({
        username: "testuser",
        password: "password123test",
        email: "testuser@example.com",
      });

      expect(response.status).toBe(500);
    });
  });

  describe("logIn", () => {
    it("should log in a user with valid credentials", async () => {
      const hashedPassword = await bcrypt.hash("password123", 10);
      supabase.from.mockReturnValue({
        select: jest.fn().mockResolvedValue({
          data: [{ username: "testuser", password: hashedPassword }],
          error: null,
        }),
      });

      const response = await request(app).post("/logIn").send({
        username: "testuser",
        password: "password123",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: expect.any(Number),
        username: "testuser",
      });
    });

    it("should handle invalid credentials", async () => {
      supabase.from.mockReturnValue({
        select: jest.fn().mockResolvedValue({
          data: [{ username: "testuser", password: "wrongpassword" }],
          error: null,
        }),
      });

      const response = await request(app).post("/logIn").send({
        username: "testuser",
        password: "invalidpassword",
      });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Invalid credentials" });
    });

    it("should handle user not found", async () => {
      supabase.from.mockReturnValue({
        select: jest.fn().mockResolvedValue({
          data: [],
          error: null,
        }),
      });

      const response = await request(app).post("/logIn").send({
        username: "nonexistentuser",
        password: "password123",
      });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "User not found" });
    });
  });
});
