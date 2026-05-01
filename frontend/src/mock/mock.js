// Mock store for the contact form before EmailJS / backend wiring.
// All submissions are saved in localStorage so the UX feels real during demo.

const STORAGE_KEY = "portfolio_contact_messages";

export const mockContactSubmit = async ({ name, email, subject, message }) => {
  // simulate network delay
  await new Promise((r) => setTimeout(r, 900));

  const entry = {
    id: `msg_${Date.now()}`,
    name,
    email,
    subject,
    message,
    createdAt: new Date().toISOString(),
    status: "queued (mock)",
  };

  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    existing.unshift(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 25)));
  } catch (e) {
    // non-fatal
  }

  return { ok: true, id: entry.id };
};

export const getMockMessages = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (e) {
    return [];
  }
};
