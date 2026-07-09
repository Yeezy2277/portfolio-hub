import { test } from "node:test";
import assert from "node:assert/strict";
import { mergeById, sortProjects, resolveProjects } from "./merge.ts";
import type { Project } from "./types.ts";

function make(id: string, over: Partial<Project> = {}): Project {
  return {
    id,
    title: id,
    summary: "",
    tags: [],
    embeddable: false,
    featured: false,
    hidden: false,
    order: 100,
    stars: 0,
    ...over,
  };
}

test("mergeById: discovered enriches a matching local seed", () => {
  const local = [make("a", { title: "Seed A", summary: "seed summary", tags: ["x"] })];
  const discovered = [make("a", { title: "", summary: "", tags: [], stars: 42, updatedAt: "2026-01-01" })];

  const a = mergeById(local, discovered)[0]!;
  assert.equal(a.title, "Seed A", "keeps seed title when discovery is empty");
  assert.equal(a.summary, "seed summary", "keeps seed summary when discovery is empty");
  assert.deepEqual(a.tags, ["x"], "keeps seed tags when discovery has none");
  assert.equal(a.stars, 42, "takes live star count from discovery");
  assert.equal(a.updatedAt, "2026-01-01", "takes live pushed date from discovery");
});

test("mergeById: discovered overrides non-empty fields", () => {
  const local = [make("a", { title: "Seed A", tags: ["x"] })];
  const discovered = [make("a", { title: "Live A", tags: ["y", "z"] })];

  const a = mergeById(local, discovered)[0]!;
  assert.equal(a.title, "Live A");
  assert.deepEqual(a.tags, ["y", "z"]);
});

test("mergeById: featured is sticky (true from either side wins)", () => {
  const local = [make("a", { featured: true })];
  const discovered = [make("a", { featured: false })];
  assert.equal(mergeById(local, discovered)[0]!.featured, true);
});

test("mergeById: unseen discovered project is appended", () => {
  const merged = mergeById([make("a")], [make("b")]);
  assert.deepEqual(
    merged.map((p) => p.id),
    ["a", "b"],
  );
});

test("sortProjects: featured first, then order, then recency", () => {
  const projects = [
    make("old", { order: 1, updatedAt: "2025-01-01" }),
    make("featured", { featured: true, order: 9 }),
    make("new", { order: 1, updatedAt: "2026-06-01" }),
  ];
  assert.deepEqual(
    sortProjects(projects).map((p) => p.id),
    ["featured", "new", "old"],
  );
});

test("sortProjects: does not mutate input", () => {
  const input = [make("b", { order: 2 }), make("a", { order: 1 })];
  const snapshot = input.map((p) => p.id);
  sortProjects(input);
  assert.deepEqual(input.map((p) => p.id), snapshot);
});

test("resolveProjects: hidden projects are dropped", () => {
  const local = [make("a"), make("secret", { hidden: true })];
  const ids = resolveProjects(local, []).map((p) => p.id);
  assert.deepEqual(ids, ["a"]);
});

test("resolveProjects: a discovered override can hide a seeded project", () => {
  const local = [make("a", { hidden: false })];
  const discovered = [make("a", { hidden: true })];
  assert.deepEqual(resolveProjects(local, discovered), []);
});

test("resolveProjects: bare repo name never clobbers a seed title", () => {
  // Discovery yields title "" unless .portfolio.json sets one (see repoToProject).
  const local = [make("cms-blog", { title: "Lumen" })];
  const discovered = [make("cms-blog", { title: "", stars: 3 })];
  const [merged] = resolveProjects(local, discovered);
  assert.equal(merged!.title, "Lumen");
  assert.equal(merged!.stars, 3);
});

test("resolveProjects: unseeded repo without override falls back to its id", () => {
  const [only] = resolveProjects([], [make("new-tool", { title: "" })]);
  assert.equal(only!.title, "new-tool");
});
