export async function getAllCourses() {
  const res = await fetch("https://b13-a8.vercel.app/data.json", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  return res.json();
}
