import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import toast from 'react-hot-toast';
import FormRow from '../../ui/FormRow';

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValue } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValue : {},
  });

  const { errors } = formState;
  const queryClient = useQueryClient();

  // 1) Create
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New Cabin Successfuly Created!');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // 2) Edit
  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin Successfuly Edited!');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const isWoking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession)
      editCabin({ newCabinData: { ...data, image: image }, id: editId });
    else createCabin({ ...data, image: image });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          disabled={isWoking}
          type="text"
          id="name"
          {...register('name', {
            required: 'This field is required!',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isWoking}
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'This field is required!',
            min: {
              value: 1,
              message: 'Capacity should be at least 1!',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isWoking}
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This field is required!',
            min: {
              value: 1,
              message: 'regularPrice should be at least 1!',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discounte" error={errors?.discount?.message}>
        <Input
          disabled={isWoking}
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required!',
            validate: (value) =>
              value <= getValues().regularPrice ||
              'Discount should be less than regular price!',
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          disabled={isWoking}
          type="number"
          id="description"
          defaultValue=""
          {...register('description', {
            required: 'This field is required!',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register('image', {
            required: isEditSession ? false : 'This field is required!',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}

        <Button disabled={isWoking} variations="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWoking}>
          {isEditSession ? 'Edit Cabin' : 'Create Cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
