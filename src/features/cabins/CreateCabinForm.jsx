import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {} }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWoking = isCreating || isEditing;

  const { id: editId, ...editValue } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValue : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession)
      editCabin({ newCabinData: { ...data, image: image }, id: editId });
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => reset(),
        },
      );
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

      <FormRow label="Discount" error={errors?.discount?.message}>
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
