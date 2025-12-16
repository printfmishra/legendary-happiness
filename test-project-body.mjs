import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'pqbv3g6w',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  perspective: 'published', // Published only
});

async function testProjectBody() {
  try {
    const project = await client.fetch(`*[_type == "project" && slug.current == "event-image-analysis"][0] {
      _id,
      title,
      "hasBody": defined(body),
      "bodyLength": length(body),
      body
    }`);
    
    console.log('\nProject:', project.title);
    console.log('Has Body:', project.hasBody);
    console.log('Body Length:', project.bodyLength);
    
    if (project.body && project.body.length > 0) {
      console.log('\n✅ Body content found!');
      console.log('First block:', JSON.stringify(project.body[0], null, 2));
    } else {
      console.log('\n❌ No body content!');
      console.log('Body value:', project.body);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testProjectBody();
