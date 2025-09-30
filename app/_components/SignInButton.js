import { signInAction } from "../_lib/actions";

export const metadata = {
  title: "Login",
};

function SignInButton() {
  return (
    <form action={signInAction}>
      <button className='flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium'>
        <img
          src='https://authjs.dev/img/providers/google.svg'
          alt='Google logo'
          height='24'
          width='24'
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;

// here we can't directly write onClick because this will make our component client side as interactivity can be done on client component not on server component but we want it in server side so for this we have to do write server action so that signin occur from server side not on client side

// server action allow us to add interactivity on server component and usually to forms so the idea is to connect a server action  to the form and in this case form only contain this button hence button is click then form will submitted

// now inside the form action attribute we need to pass server action function there is multiple place where we can define server action but it is good to define on a file called action.js inside the lib
