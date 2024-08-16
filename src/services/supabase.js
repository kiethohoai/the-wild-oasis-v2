import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://oecvlvqnqqtrxzwcnmif.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lY3ZsdnFucXF0cnh6d2NubWlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzNzU3OTksImV4cCI6MjAzNjk1MTc5OX0.gluyn5Ncme5cZbTK3q65oi2qVMQcBfuV8VClEE1yz44';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
