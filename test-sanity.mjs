// Test script to check Sanity connection and posts
import { getBlogPosts } from './src/lib/sanity';

async function testSanityConnection() {
  console.log('🔍 Testing Sanity Connection...\n');
  
  console.log('📋 Environment Variables:');
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);
  console.log('');
  
  try {
    console.log('📡 Fetching posts from Sanity...');
    const posts = await getBlogPosts();
    
    console.log(`✅ Successfully fetched ${posts.length} posts\n`);
    
    if (posts.length === 0) {
      console.log('⚠️  No posts found. Possible reasons:');
      console.log('   1. No posts published in Sanity Studio');
      console.log('   2. Posts are still in draft mode');
      console.log('   3. Wrong dataset selected');
      console.log('   4. Posts have different document type name');
    } else {
      console.log('📝 Posts found:');
      posts.forEach((post, index) => {
        console.log(`\n${index + 1}. ${post.title}`);
        console.log(`   Slug: ${post.slug.current}`);
        console.log(`   Category: ${post.category}`);
        console.log(`   Published: ${post.publishedAt}`);
        console.log(`   Has Image: ${post.mainImage ? 'Yes' : 'No'}`);
        console.log(`   Excerpt: ${post.excerpt.substring(0, 100)}...`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error fetching posts:', error);
    console.error('\nPossible issues:');
    console.error('1. Check if NEXT_PUBLIC_SANITY_PROJECT_ID is correct');
    console.error('2. Check if dataset name is correct');
    console.error('3. Check if Sanity project has CORS enabled for localhost');
    console.error('4. Check network connection');
  }
}

testSanityConnection();
