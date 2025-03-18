import moock from "../../moock/resources.json";
import { describe, it, expect } from "vitest";
import { IntResource, IntUser } from "../../types";
import { getPersonalResources } from "../userApi";

const moockResources = moock.resources.map(
  (resource) =>
    ({
      ...resource,
      create_at: "2025-02-25 00:00:00",
      update_at: "2025-02-25 00:00:00",
    }) as IntResource,
);
const moockUser = {
  id: 123463,
  displayName: "John Doe",
  photoURL: "https://via.placeholder.com/150",
  role: "user",
} as IntUser;

describe("getPersonalResources", () => {
  it("should return only the resources belonging to the logged-in user", () => {
    const userResources = moockResources.map((resource) => ({
      ...resource,
      github_id: moockUser.id,
    }));

    const personalResources = getPersonalResources(moockUser, userResources);

    expect(personalResources).toEqual(userResources);
    personalResources.forEach((resource) => {
      expect(resource).toEqual(
        expect.objectContaining({
          github_id: expect.any(Number),
          title: expect.any(String),
          description: expect.any(String),
          url: expect.any(String),
          category: expect.any(String),
          theme: expect.any(String),
          type: expect.any(String),
        }),
      );
    });
  });
});
