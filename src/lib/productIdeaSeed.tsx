import {
  createProductIdea,
  createProductIdeaNote,
} from "@/lib/firestore/productIdeas";
import {
  PRODUCT_IDEAS,
  PRODUCT_IDEA_NOTES,
  getIdeaSlug,
} from "@/constants/productIdeas";

export async function seedProductIdeas(
  currentUserId: string,
  authorDisplayName: string = "Seed User",
  authorPhotoURL: string | null = null,
): Promise<{
  ideasCreated: number;
  notesCreated: number;
}> {
  const seededIdeas = new Map<string, string>(); // slug -> ideaId

  let ideasCreated = 0;
  let notesCreated = 0;

  // Seed Product Ideas
  for (const idea of PRODUCT_IDEAS) {
    const docRef = await createProductIdea(
      {
        title: idea.title,
        summary: idea.summary,
        status: idea.status,
        tags: idea.tags,
        priority: idea.priority,
      },
      currentUserId,
    );

    const slug = getIdeaSlug(idea.title);
    seededIdeas.set(slug, docRef.id);
    ideasCreated++;
  }

  // Seed Notes for Each Idea
  for (const [slug, notes] of Object.entries(PRODUCT_IDEA_NOTES)) {
    const ideaId = seededIdeas.get(slug);
    if (!ideaId) {
      console.warn(`No idea found for slug: ${slug}`);
      continue;
    }

    for (const note of notes) {
      await createProductIdeaNote(
        ideaId,
        {
          body: note.body,
          authorDisplayName,
          ...(authorPhotoURL && { authorPhotoURL }),
        },
        currentUserId,
      );
      notesCreated++;
    }
  }

  return { ideasCreated, notesCreated };
}
