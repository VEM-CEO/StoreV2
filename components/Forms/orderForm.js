// import { useForm } from '@mantine/hooks';
// import { TextInput, Button } from '@mantine/core';

// export default function orderForm ()  {
//   const form = useForm({
//     initialValues: {
//       name: '',
//       email: '',
//     },
//     validationRules: {
//       name: (value) => value.trim() !== '',
//       email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
//     },
//   });

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (form.valid) {
//       // Do something with the form data
//       console.log(form.values);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <TextInput
//         label="Name"
//         placeholder="Enter your name"
//         value={form.values.name}
//         onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
//         error={form.errors.name && 'Please enter your name'}
//       />

//       <TextInput
//         label="Email"
//         placeholder="Enter your email"
//         value={form.values.email}
//         onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
//         error={form.errors.email && 'Please enter a valid email'}
//       />

//       <Button type="submit">Submit</Button>
//     </form>
//   );
// };



export default function orderForm ()  {
  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <p>This is my custom component.</p>
    </div>
  );
};

    