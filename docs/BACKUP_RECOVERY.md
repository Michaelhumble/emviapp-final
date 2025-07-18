# EmviApp Backup & Recovery Plan

## Database Backup Strategy

### Automated Backups
Supabase provides automated daily backups for our production database. These are retained for 7 days on the current plan.

### Manual Backup Process
For critical deployments or before major migrations:

1. **Create Manual Backup:**
   ```bash
   # Using Supabase CLI
   supabase db dump --local > backup_$(date +%Y%m%d_%H%M%S).sql
   ```

2. **Download Production Backup:**
   - Access Supabase Dashboard > Settings > Database
   - Download latest backup file
   - Store securely in encrypted cloud storage

### Recovery Procedures

#### Full Database Restore
```bash
# Restore from backup file
psql -h [host] -U [user] -d [database] < backup_file.sql
```

#### Point-in-Time Recovery
- Contact Supabase support for point-in-time recovery
- Available up to 7 days for our current plan

### Critical Data Protection

#### Tables with Critical Data:
- `profiles` - User account data
- `bookings` - Revenue and appointment data  
- `jobs` - Job postings and applications
- `payments` - Financial transactions
- `salon_staff` - Business relationships

#### RLS Policy Backup:
```sql
-- Export all RLS policies
SELECT schemaname, tablename, policyname, cmd, qual, with_check 
FROM pg_policies 
WHERE schemaname = 'public';
```

#### Function Backup:
```sql
-- Export all custom functions
SELECT routine_name, routine_definition 
FROM information_schema.routines 
WHERE routine_schema = 'public';
```

### Emergency Contacts
- Supabase Support: support@supabase.io
- Database Admin: [Your admin email]
- Technical Lead: [Technical lead email]

### Recovery Testing
- Monthly recovery tests using staging environment
- Document all recovery procedures
- Verify data integrity after restoration

### Security Measures
- All backups encrypted at rest
- Access logs maintained for backup downloads
- Multi-factor authentication required for backup access
- Regular security audits of backup procedures

## Monitoring & Alerts

### Database Health Monitoring
- Real-time performance metrics
- Storage usage alerts at 80% capacity
- Connection pool monitoring
- Query performance tracking

### Backup Status Monitoring
- Daily backup completion verification
- Backup file integrity checks
- Storage availability monitoring
- Automated alert system for backup failures

## Change Management

### Pre-Migration Checklist
1. Create manual backup
2. Test migration on staging environment
3. Document rollback procedures
4. Verify all critical functions work post-migration
5. Schedule maintenance window
6. Notify stakeholders

### Post-Migration Verification
1. Verify all RLS policies active
2. Test authentication flows
3. Verify critical business functions
4. Monitor error rates for 24 hours
5. Confirm backup systems operational

## Business Continuity

### Maximum Tolerable Downtime
- Database: 1 hour
- Application: 30 minutes
- Payment processing: 15 minutes

### Recovery Time Objectives (RTO)
- Database restore: 2 hours
- Application recovery: 1 hour
- Full system recovery: 4 hours

### Recovery Point Objectives (RPO)
- Maximum data loss acceptable: 1 hour
- Critical transactions: Real-time replication

This document should be reviewed monthly and updated after any major system changes.