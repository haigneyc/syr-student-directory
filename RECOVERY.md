# Database Recovery Procedures

> This document outlines the recovery procedures for the Syracuse Student Directory database hosted on Supabase.

## Overview

The database is hosted on Supabase with the following details:
- **Project**: `syr-student-directory`
- **Region**: `us-east-1`
- **Database**: PostgreSQL 15+

## Backup Types

### 1. Automated Backups (Supabase)

Supabase provides automatic backups:

| Plan | Backup Frequency | Retention |
|------|------------------|-----------|
| Free | Daily | 7 days |
| Pro | Point-in-Time Recovery (PITR) | 7 days |
| Team/Enterprise | PITR | 30 days |

**To enable/verify:**
1. Go to Supabase Dashboard
2. Navigate to **Settings** > **Database** > **Backups**
3. Verify backup status and schedule

### 2. Schema Snapshots (Repository)

The schema is version-controlled in this repository:
- `supabase/migrations/001_initial_schema.sql` - Base tables and RLS
- `supabase/migrations/002_enhanced_submissions.sql` - Enhanced business submissions
- `supabase/migrations/003_fulltext_search.sql` - Full-text search
- `supabase/schema_snapshot.sql` - Complete schema reference

## Recovery Scenarios

### Scenario A: Recover from Accidental Data Deletion

**If using Supabase Pro/Team (PITR):**
1. Go to **Settings** > **Database** > **Backups**
2. Select the point-in-time to recover to
3. Click "Restore"
4. Verify data integrity after restoration

**If using Free tier:**
1. Contact Supabase support (limited options)
2. If you have a recent data export, see Scenario D

### Scenario B: Recover from Schema Corruption

1. **Identify the issue** by checking the SQL Editor
2. **Create a new project** if necessary
3. **Run migrations in order**:
   ```bash
   # In Supabase SQL Editor, run each file:
   supabase/migrations/001_initial_schema.sql
   supabase/migrations/002_enhanced_submissions.sql
   supabase/migrations/003_fulltext_search.sql
   ```
4. **Import data** from your most recent export

### Scenario C: Complete Database Recreation

If starting fresh or migrating to a new project:

1. **Create a new Supabase project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project in `us-east-1` region

2. **Run the schema snapshot**
   ```sql
   -- In SQL Editor, paste the contents of:
   supabase/schema_snapshot.sql
   ```

3. **Update environment variables**
   ```bash
   # Update .env.local with new credentials
   NEXT_PUBLIC_SUPABASE_URL=https://new-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
   SUPABASE_SECRET_KEY=sb_secret_xxx
   ```

4. **Update Vercel environment variables**
   - Go to Vercel Dashboard > Project Settings > Environment Variables
   - Update all Supabase-related variables

5. **Trigger a redeployment**
   ```bash
   git commit --allow-empty -m "Trigger rebuild with new database"
   git push
   ```

### Scenario D: Restore from Data Export

If you have a data export (JSON/CSV):

1. **Use the import API**:
   ```bash
   curl -X POST https://orangediscounts.com/api/deals/import \
     -H "Content-Type: application/json" \
     -H "x-admin-key: YOUR_ADMIN_KEY" \
     -d @backup-data.json
   ```

2. **Or use Supabase Dashboard**:
   - Go to Table Editor
   - Select the table
   - Click "Import data from CSV"

## Data Export (Creating Backups)

### Export via API

```bash
# Export all deals
curl "https://orangediscounts.com/api/deals/export" \
  -H "x-admin-key: YOUR_ADMIN_KEY" \
  -o deals-backup-$(date +%Y%m%d).json
```

### Export via Supabase Dashboard

1. Go to Table Editor
2. Select the table to export
3. Click "Export to CSV"
4. Store securely (not in public repository)

### Automated Export Script

Create a cron job to run weekly:

```bash
#!/bin/bash
# backup-database.sh
DATE=$(date +%Y%m%d)
BACKUP_DIR="/path/to/backups"

# Export deals
curl -s "https://orangediscounts.com/api/deals/export" \
  -H "x-admin-key: $ADMIN_API_KEY" \
  -o "$BACKUP_DIR/deals-$DATE.json"

# Keep only last 30 days
find "$BACKUP_DIR" -name "*.json" -mtime +30 -delete

echo "Backup completed: $DATE"
```

## Key Files Location

| File | Purpose |
|------|---------|
| `supabase/migrations/*.sql` | Database migrations |
| `supabase/schema_snapshot.sql` | Complete schema reference |
| `.env.local` | Local environment variables |
| `src/lib/supabase.ts` | Supabase client configuration |

## Emergency Contacts

- **Supabase Support**: https://supabase.com/dashboard/support
- **Project Owner**: syracuse.automation@gmail.com

## Testing Recovery

Periodically test recovery procedures:

1. Create a test project on Supabase
2. Run migrations against test project
3. Import sample data
4. Verify application works with test database
5. Delete test project

## Checklist Before Recovery

- [ ] Identify the scope of data loss
- [ ] Check available backups in Supabase dashboard
- [ ] Export current state if partially intact
- [ ] Notify users if service will be interrupted
- [ ] Have new API keys ready if creating new project
- [ ] Test in staging before production changes
