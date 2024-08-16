import supabase from './supabase';

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

export async function createCabin(newCabin) {
  console.log('🚀CHECK  newCabin =', newCabin);
  const supabaseUrl = `https://oecvlvqnqqtrxzwcnmif.supabase.co/storage/v1/object/public/cabin-images`;

  // 0) Create image
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    '',
  );

  const imagePath = `${supabaseUrl}/${imageName}`;

  // 1) Create cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    throw new Error('Cabin could not deleted!');
  }

  // 2) Update Image.
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
