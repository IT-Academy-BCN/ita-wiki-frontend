import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";
import { useArrayToggle } from "./useArrayToggle";

describe("useArrayToggle", () => {
  it("should add item to array when not present", () => {
    const { result } = renderHook(() => {
      const [items, setItems] = React.useState<string[]>([]);
      const toggleItem = useArrayToggle(items, setItems);
      return { items, toggleItem };
    });

    act(() => {
      result.current.toggleItem("test");
    });

    expect(result.current.items).toEqual(["test"]);
  });

  it("should remove item from array when present", () => {
    const { result } = renderHook(() => {
      const [items, setItems] = React.useState<string[]>(["test", "other"]);
      const toggleItem = useArrayToggle(items, setItems);
      return { items, toggleItem };
    });

    act(() => {
      result.current.toggleItem("test");
    });

    expect(result.current.items).toEqual(["other"]);
  });

  it("should work with numbers", () => {
    const { result } = renderHook(() => {
      const [items, setItems] = React.useState<number[]>([1, 2]);
      const toggleItem = useArrayToggle(items, setItems);
      return { items, toggleItem };
    });

    act(() => {
      result.current.toggleItem(3);
    });

    expect(result.current.items).toEqual([1, 2, 3]);

    act(() => {
      result.current.toggleItem(2);
    });

    expect(result.current.items).toEqual([1, 3]);
  });

  it("should work with objects", () => {
    const obj1 = { id: 1, name: "test1" };
    const obj2 = { id: 2, name: "test2" };
    const obj3 = { id: 3, name: "test3" };

    const { result } = renderHook(() => {
      const [items, setItems] = React.useState<(typeof obj1)[]>([obj1, obj2]);
      const toggleItem = useArrayToggle(items, setItems);
      return { items, toggleItem };
    });

    act(() => {
      result.current.toggleItem(obj3);
    });

    expect(result.current.items).toEqual([obj1, obj2, obj3]);

    act(() => {
      result.current.toggleItem(obj1);
    });

    expect(result.current.items).toEqual([obj2, obj3]);
  });

  it("should maintain reference equality for toggle function", () => {
    const { result, rerender } = renderHook(() => {
      const [items, setItems] = React.useState<string[]>([]);
      const toggleItem = useArrayToggle(items, setItems);
      return { items, toggleItem };
    });

    const firstToggle = result.current.toggleItem;

    rerender();

    expect(result.current.toggleItem).toBe(firstToggle);
  });
});
