import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'pqbv3g6w',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  perspective: 'published',
});

async function testProjects() {
  try {
    console.log('🔍 Testing Sanity connection...');
    console.log('📍 Project ID: pqbv3g6w');
    console.log('📍 Dataset: production');
    
    // First check all documents
    const allDocs = await client.fetch('*[_type == "project"]');
    console.log('\n📊 All project documents:', allDocs.length);
    
    // Then check with full query
    const projects = await client.fetch(`*[_type == "project"] | order(_createdAt desc) {
      _id,
      _createdAt,
      title,
      slug,
      summary,
      mainImage,
      presentationEmbedUrl,
      projectLink
    }`);
    
    console.log('\n✅ Projects found:', projects.length);
    
    if (projects.length > 0) {
      console.log('\n📋 Project details:');
      projects.forEach((project, index) => {
        console.log(`\n${index + 1}. ${project.title}`);
        console.log(`   Slug: ${project.slug?.current}`);
        console.log(`   Summary: ${project.summary?.substring(0, 50)}...`);
        console.log(`   Presentation URL: ${project.presentationEmbedUrl}`);
        console.log(`   Main Image: ${project.mainImage ? 'Yes' : 'No'}`);
      });
    } else {
      console.log('\n⚠️ No projects found in Sanity!');
      console.log('\nMake sure you have:');
      console.log('1. Created a project document in Sanity Studio');
      console.log('2. Clicked the "Publish" button (not just saved as draft)');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testProjects();
