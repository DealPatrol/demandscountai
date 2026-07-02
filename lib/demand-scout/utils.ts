export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function hashString(value: string) {
  return value.split("").reduce((total, character, index) => {
    return total + character.charCodeAt(0) * (index + 17);
  }, 0);
}

export function createSearchId(niche: string) {
  const clean = niche.trim() || "untapped-market";
  return `${slugify(clean)}-${hashString(clean).toString(36)}`;
}
