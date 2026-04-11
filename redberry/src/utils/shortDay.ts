const shortDay = (label: string) => {
  const days: Record<string, string> = {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun",
  };

  return label
    .split(" ")
    .map((word) => days[word] || word)
    .join(" ");
};

export default shortDay;
