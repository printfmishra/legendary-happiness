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
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error('Error fetching introduction page:', error);
    return null;
  }
}
