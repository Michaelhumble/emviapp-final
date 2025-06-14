
import MultiStepSignUpForm from "./MultiStepSignUpForm";

interface SignUpFormProps {
  redirectUrl?: string | null;
}

const SignUpForm = ({ redirectUrl }: SignUpFormProps) => {
  return <MultiStepSignUpForm redirectUrl={redirectUrl} />;
};

export default SignUpForm;
