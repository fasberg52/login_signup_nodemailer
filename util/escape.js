const escape = (str) => str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

// Module Export
module.exports = escape;