-- Add payment_status column to jobs table for tracking payment state
-- This is needed to track the payment flow for paid job postings

ALTER TABLE public.jobs 
ADD COLUMN payment_status TEXT DEFAULT 'pending';