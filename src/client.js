import { createClient } from "@supabase/supabase-js";

const URL = "https://qoidluxqxscyqmnbxfho.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvaWRsdXhxeHNjeXFtbmJ4ZmhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI0MjQyMjcsImV4cCI6MjAwODAwMDIyN30.NqtD-K80f9HVdZ5L-UfZ4Wc5ojfYvfSMKgZa9EEkasw";

export const supabase = createClient(URL, API_KEY);