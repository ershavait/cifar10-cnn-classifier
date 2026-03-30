const API_URL = "http://localhost:8000";

export async function classifyImage(file) {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch(`${API_URL}/classify`, {
    method: "POST",
    body: fd,
  });

  if (!res.ok) throw new Error("Classification failed");
  return await res.json();
}

export async function healthCheck() {
  const res = await fetch(`${API_URL}/`);
  return await res.json();
}
