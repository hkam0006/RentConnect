
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://bpnlxdcsmicxotakbydb.supabase.co", 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwbmx4ZGNzbWljeG90YWtieWRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ3MDU4NDEsImV4cCI6MjAzMDI4MTg0MX0.D9vf3LJse9QklqwNjp-5fRyU72vtJiSnGvs3kbcn1TM"
)