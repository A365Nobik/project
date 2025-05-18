import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nzwavuvnzzbnmzvfdriq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56d2F2dXZuenpibm16dmZkcmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1Nzk5OTUsImV4cCI6MjA2MzE1NTk5NX0.CwLo9LermdiL9wEwY1DRI99uYb5gWFeceULl-ADWwOI";
export const supabase = createClient(supabaseUrl, supabaseKey);
