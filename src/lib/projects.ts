import { client } from './sanity';

// TypeScript interface for Project
export interface Project {
  _id: string;
  _createdAt: string;
  title: string;
  slug: {
    current: string;
  };
  body?: any[];
  mainImage?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  presentationEmbedUrl?: string;
  projectLink?: string;
}

// Fetch all projects
export async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(_createdAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    body,
    mainImage,
    presentationEmbedUrl,
    projectLink
  }`;

  try {
    console.log('🔍 Fetching projects from Sanity...');
    console.log('📍 Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);
    console.log('📍 Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
    
    const projects = await client.fetch(query);
    
    console.log(`✅ Found ${projects.length} projects`);
    console.log('📊 Projects:', projects.map((p: Project) => ({ title: p.title, slug: p.slug.current, hasBody: !!p.body })));
    return projects;
  } catch (error) {
    console.error('❌ Error fetching projects:', error);
    return [];
  }
}

// Fetch a single project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    slug,
    body,
    mainImage,
    presentationEmbedUrl,
    projectLink
  }`;

  try {
    console.log(`🔍 Fetching project with slug: ${slug}`);
    const project = await client.fetch(query, { slug });
    
    if (project) {
      console.log(`✅ Found project: ${project.title}`);
    } else {
      console.log(`⚠️ No project found with slug: ${slug}`);
    }
    
    return project;
  } catch (error) {
    console.error(`❌ Error fetching project with slug ${slug}:`, error);
    return null;
  }
}
