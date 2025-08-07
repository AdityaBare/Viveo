// tools.js
export const tools = {
  calculator: (input) => {
    try {
      return `🧮 Result: ${eval(input)}`;
    } catch {
      return "❌ Invalid math expression.";
    }
  },
  get_time: () => {
    return `🕒 Current Time: ${new Date().toLocaleTimeString()}`;
  },
};
