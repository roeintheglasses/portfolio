/**
 * Migration script: Convert photoWalk documents to photoStory
 *
 * Run with: npx sanity exec scripts/migrate-walks-to-stories.ts --with-user-token
 */

import { getCliClient } from 'sanity/cli';

const client = getCliClient();

async function migrate() {
  console.log('Starting migration: photoWalk → photoStory');

  // Fetch all photoWalk documents
  const walks = await client.fetch(`*[_type == "photoWalk"]`);
  console.log(`Found ${walks.length} photoWalk documents to migrate`);

  if (walks.length === 0) {
    console.log('No documents to migrate');
    return;
  }

  // Create a transaction
  const transaction = client.transaction();

  for (const walk of walks) {
    const { _id, _type, photos, ...rest } = walk;

    // Convert walkPhoto to storyPhoto in the photos array
    const migratedPhotos =
      photos?.map((photo: any) => ({
        ...photo,
        _type: 'storyPhoto',
      })) || [];

    // Create new photoStory document
    const storyDoc = {
      ...rest,
      _id: _id, // Keep the same ID
      _type: 'photoStory',
      photos: migratedPhotos,
    };

    // Delete old document and create new one
    transaction.delete(_id);
    transaction.createOrReplace(storyDoc);

    console.log(`Migrating: ${walk.title || _id}`);
  }

  // Commit the transaction
  console.log('Committing changes...');
  await transaction.commit();
  console.log('Migration complete!');
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
