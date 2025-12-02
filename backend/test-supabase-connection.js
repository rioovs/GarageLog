// Test Supabase connection
// Run: node test-supabase-connection.js

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 Testing Supabase Connection...\n');
console.log('SUPABASE_URL:', supabaseUrl);
console.log('SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓ Set' : '✗ Missing');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✓ Set' : '✗ Missing');
console.log('\n---\n');

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testConnection() {
  try {
    // Test 1: Basic connection
    console.log('Test 1: Basic API connection...');
    const { data: healthCheck, error: healthError } = await supabase
      .from('_supabase_health_check')
      .select('*')
      .limit(1);
    
    if (healthError && !healthError.message.includes('does not exist')) {
      console.log('⚠️  Health check table not found (this is normal)');
    } else {
      console.log('✓ API connection successful');
    }

    // Test 2: Check auth
    console.log('\nTest 2: Auth service...');
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 1
    });
    
    if (authError) {
      console.error('❌ Auth error:', authError.message);
      if (authError.message.includes('JWT')) {
        console.log('💡 Hint: Your SERVICE_ROLE_KEY might be incorrect.');
        console.log('   Make sure you\'re using the service_role key, not anon key!');
      }
    } else {
      console.log('✓ Auth service working');
      console.log(`  Found ${users?.length || 0} user(s)`);
    }

    // Test 3: Database connection via Supabase
    console.log('\nTest 3: Database access...');
    const { data: tables, error: dbError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .limit(5);
    
    if (dbError) {
      console.error('❌ Database error:', dbError.message);
    } else {
      console.log('✓ Database accessible');
      console.log('  Sample tables:', tables?.map(t => t.table_name).join(', ') || 'none yet');
    }

    console.log('\n---');
    console.log('✅ Connection test completed!');
    
  } catch (error) {
    console.error('\n❌ Unexpected error:', error.message);
    process.exit(1);
  }
}

testConnection();
