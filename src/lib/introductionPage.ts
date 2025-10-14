import { client } from './sanity';

export interface IntroductionPage {
  title: string;
  slug: { current: string };
  summary: string;
  professionalSummary: any[]; // Portable Text
  expertiseAreas: string[];
  coreValues: string[];
  image?: {
    asset: { _ref: string; _type: string };
    alt?: string;
  };
}

export async function getIntroductionPage(): Promise<IntroductionPage | null> {
  // Simple query that fetches any introductionPage document (including drafts)
  const query = `*[_type == "introductionPage"][0] {
    title,
    slug,
    summary,
    professionalSummary,
    expertiseAreas,
    coreValues,
    image
  }`;
  
  try {
    console.log('🔍 Fetching introduction page from Sanity...');
    console.log('📋 ENV CHECK:');
    console.log('  - Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
    console.log('  - Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);
    console.log('  - Has Client:', !!client);
    console.log('  - Client Config:', {
      projectId: client.config().projectId,
      dataset: client.config().dataset,
      apiVersion: client.config().apiVersion,
    });
    console.log('Query:', query);
    
    const data = await client.fetch(query);
    
    console.log('✅ Introduction page data:', data ? `Found: ${data.title}` : 'null');
    
    if (!data) {
      console.log('❌ No introduction page found. Check:');
      console.log('  1. Document type is "introductionPage" in Sanity Studio');
      console.log('  2. At least one document exists');
      console.log('  3. Correct dataset selected');
      console.log('  4. Go to Sanity Studio and publish the document');
    }
    
    return data;
  } catch (error) {
    console.error('❌ Error fetching introduction page:', error);
    console.error('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    return null;
  }
}
