import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    throw new Error('Cabin could not deleted!');
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  // Check image path
  const hadImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // 0) Create image
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    '',
  );
  const imagePath = hadImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1) Create cabin
  let query = supabase.from('cabins');

  // a) Create
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // b) Edit
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error('Cabin could not deleted!');
  }

  // 2) Update Image.
  if (hadImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3) Delete the cabin IF there was an error while uploading image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.log('🚀CHECK  storageError =', storageError);
    throw new Error(
      'Cabin image could not be uploaded & the cabin was not created!',
    );
  }

  return data;
}
