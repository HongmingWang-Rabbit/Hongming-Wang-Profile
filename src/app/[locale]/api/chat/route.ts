// This file exists due to filesystem constraints.
// The actual API route is at /api/chat (root level).
// This re-exports it so /[locale]/api/chat also works.
export { POST } from "../../../api/chat/route";
