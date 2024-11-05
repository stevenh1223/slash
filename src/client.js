import { createClient } from "@supabase/supabase-js";

const URL = "https://qqzrequoyfnyuhgaqyrj.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxenJlcXVveWZueXVoZ2FxeXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3ODk2MTYsImV4cCI6MjA0NjM2NTYxNn0.wGvZAFRJZmG4z6vWw0Qvz1cXH7p0Fnbs26bBSX7yr_8";

export const supabase = createClient(URL, API_KEY);
