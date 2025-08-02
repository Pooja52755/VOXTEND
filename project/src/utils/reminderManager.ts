// Utility for managing scheme reminders in localStorage and browser notifications
export interface SchemeReminder {
  schemeId: string;
  schemeName: string;
  deadline: string; // ISO string
}

const REMINDER_KEY = 'voxtend_scheme_reminders';

export function addReminder(reminder: SchemeReminder) {
  const reminders = getReminders();
  // Avoid duplicates
  if (!reminders.find(r => r.schemeId === reminder.schemeId)) {
    reminders.push(reminder);
    localStorage.setItem(REMINDER_KEY, JSON.stringify(reminders));
  }
}

export function removeReminder(schemeId: string) {
  const reminders = getReminders().filter(r => r.schemeId !== schemeId);
  localStorage.setItem(REMINDER_KEY, JSON.stringify(reminders));
}

export function getReminders(): SchemeReminder[] {
  try {
    return JSON.parse(localStorage.getItem(REMINDER_KEY) || '[]');
  } catch {
    return [];
  }
}

export function checkAndNotifyReminders() {
  if (!('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;
  const reminders = getReminders();
  const today = new Date();
  reminders.forEach(reminder => {
    const deadline = new Date(reminder.deadline);
    const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (daysLeft <= 7 && daysLeft >= 0) {
      // Notify if deadline is within 7 days
      new Notification('Scheme Deadline Reminder', {
        body: `${reminder.schemeName} deadline in ${daysLeft} day${daysLeft === 1 ? '' : 's'}. Apply soon!`,
        icon: '/favicon.ico'
      });
    }
  });
}

export function requestNotificationPermission() {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'default') {
    Notification.requestPermission();
  }
}
