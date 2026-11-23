/* The address is assembled at runtime so it never appears as one plain string in the HTML or the
   bundle, which is what simple email-harvesting bots scan for. */
const parts = ['andreayanez11', 'outlook', 'com'];
export const EMAIL = `${parts[0]}@${parts[1]}.${parts[2]}`;
