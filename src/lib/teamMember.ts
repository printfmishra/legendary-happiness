import { client } from './sanity';

// TypeScript interface for Team Member
export interface TeamMember {
  _id: string;
  _createdAt: string;
  name: string;
  slug: {
    current: string;
  };
  summary?: string;
  professionalSummary?: any[];
  image?: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt?: string;
  };
  rank?: number;
}

// Fetch a single team member by slug
export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
  const query = `*[_type == "teamMember" && slug.current == $slug][0] {
    _id,
    _createdAt,
    name,
    slug,
    summary,
    "professionalSummary": professionalSummary[],
    image,
    rank
  }`;

  try {
    console.log(`🔍 Fetching team member with slug: ${slug}`);
    const member = await client.fetch(query, { slug });
    
    if (member) {
      console.log(`✅ Found team member: ${member.name}`);
    } else {
      console.log(`⚠️ No team member found with slug: ${slug}`);
    }
    
    return member;
  } catch (error) {
    console.error(`❌ Error fetching team member with slug ${slug}:`, error);
    return null;
  }
}

// Fetch all team members
export async function getTeamMembers(): Promise<TeamMember[]> {
  const query = `*[_type == "teamMember"] {
    _id,
    _createdAt,
    name,
    slug,
    summary,
    "professionalSummary": professionalSummary[],
    image,
    rank
  } | order(rank asc)`;

  try {
    console.log('🔍 Fetching team members from Sanity...');
    const members = await client.fetch(query);
    
    console.log(`✅ Fetched ${members.length} team members from Sanity`);
    return members;
  } catch (error) {
    console.error('❌ Error fetching team members:', error);
    return [];
  }
}
