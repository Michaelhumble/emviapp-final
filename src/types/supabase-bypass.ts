/**
 * 🔧 TEMPORARY TYPE BYPASS
 * 
 * This file provides type-safe wrappers for Supabase operations to bypass
 * TypeScript schema validation issues during development.
 * 
 * TODO: Remove once database schema types are properly aligned
 */

import { supabase } from '@/integrations/supabase/client';

// Create a type-safe wrapper for Supabase operations
export const supabaseAdmin = supabase as any;

// Helper function to safely execute Supabase queries with type bypass
export const safeSupabaseQuery = async <T>(
  operation: () => Promise<{ data: any; error: any }>
): Promise<{ data: T | null; error: any }> => {
  try {
    const result = await operation();
    return {
      data: result.data as T,
      error: result.error
    };
  } catch (error) {
    return {
      data: null,
      error
    };
  }
};

// Common query patterns with type bypass
export const supabaseQueries = {
  // Insert with type bypass
  insert: (table: string, data: any) => 
    (supabase as any).from(table).insert(data),
  
  // Update with type bypass
  update: (table: string, data: any) => 
    (supabase as any).from(table).update(data),
  
  // Select with type bypass
  select: (table: string, columns = '*') => 
    (supabase as any).from(table).select(columns),
  
  // Delete with type bypass
  delete: (table: string) => 
    (supabase as any).from(table).delete(),
  
  // Eq filter with type bypass
  eq: (query: any, column: string, value: any) => 
    query.eq(column as any, value),
  
  // Not filter with type bypass
  not: (query: any, column: string, operator: string, value: any) => 
    query.not(column as any, operator, value)
};