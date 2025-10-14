// Test script to check for introductionPage in Sanity
import { config } from 'dotenv';
import { createClient } from '@sanity/client';

// Load environment variables
config({ path: '.env.local' });

// Create client directly with loaded env vars
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function testIntroductionPage() {
  console.log('🔍 Testing Introduction Page in Sanity...\n');
  
  console.log('📋 Environment Variables:');
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);
  console.log('');
  
  try {
    // First, let's check what document types exist
    console.log('📡 Checking all document types...');
    const typesQuery = `*[]{_type} | order(_type asc)`;
    const allDocs = await client.fetch(typesQuery);
    const uniqueTypes = [...new Set(allDocs.map(doc => doc._type))];
    console.log('✅ Available document types:', uniqueTypes);
    console.log('');
    
    // Now try to fetch the introduction page
    console.log('📡 Attempting to fetch introductionPage...');
    const introQuery = `*[_type == "introductionPage"][0] {
      title,
      slug,
      summary,
      professionalSummary,
      expertiseAreas,
      coreValues,
      image
    }`;
    const introPage = await client.fetch(introQuery);
    
    if (!introPage) {
      console.log('⚠️  No introductionPage document found!');
      console.log('');
      console.log('📝 Possible solutions:');
      console.log('   1. Create an "introductionPage" document type in Sanity Studio');
      console.log('   2. Or use a different approach for the about page content');
      console.log('   3. Check if the document type has a different name');
    } else {
      console.log('✅ Introduction page found!');
      console.log(JSON.stringify(introPage, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
    console.error('\nDetails:', error.message);
  }
}

testIntroductionPage();
