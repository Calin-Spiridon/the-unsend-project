"use client";

export function LocalDate({ dateString, locale }: { dateString: string; locale: string }) {
  const date = new Date(dateString);
  
  const formattedDate = date.toLocaleDateString(locale, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  
  const formattedTime = date.toLocaleTimeString(locale, {
    hour: '2-digit', minute: '2-digit'
  });

  return (
    <span>{formattedDate} at {formattedTime}</span>
  );
}