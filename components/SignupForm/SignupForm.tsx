'use client';

import CheckBox from './CheckBox';
import FormField from '../compound/form/FormField';
import Button from '../common/Button';
import { useActionState, useState } from 'react';
import signupAction from './action';
import Modal from '../common/Modal';
import { redirect } from 'next/navigation';

interface SignupType {
  email: string;
  nickname: string;
  password: string;
  checkPassword: string;
}

const INITIAL = {
  email: '',
  nickname: '',
  password: '',
  checkPassword: '',
};

export default function SignupForm() {
  const [formData, setFormData] = useState<SignupType>(INITIAL);
  const [state, formAction, isPending] = useActionState(signupAction, null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const INPUT = [
    {
      label: '이메일',
      name: 'email',
      type: 'text',
      placeholder: '이메일을 입력해 주세요',
      value: formData.email,
      errorMessage: state?.field === 'email' ? state?.err : '',
    },
    {
      label: '닉네임',
      name: 'nickname',
      type: 'text',
      placeholder: '닉네임을 입력해 주세요',
      value: formData.nickname,
      errorMessage: state?.field === 'nickname' ? state?.err : '',
    },
    {
      label: '비밀번호',
      name: 'password',
      type: 'password',
      placeholder: '8자 이상 입력해 주세요',
      value: formData.password,
      errorMessage: state?.field === 'password' ? state?.err : '',
    },
    {
      label: '비밀번호 확인',
      name: 'checkPassword',
      type: 'password',
      placeholder: '비밀번호를 한번 더 입력해 주세요',
      value: formData.checkPassword,
      errorMessage: state?.field === 'checkPassword' ? state?.err : '',
    },
  ];

  const isNotFormEmpty =
    !formData.email || !formData.nickname || !formData.password || !formData.checkPassword;

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <Modal
        isOpen={(state && state.status) || false}
        padding="64/40"
        borderRadius="16"
        submitMessage="확인"
        onClose={() => redirect('/login')}
      >
        가입이 완료되었습니다!
      </Modal>
      {INPUT.map((input) => (
        <FormField
          key={input.label}
          name={input.name}
          type={input.type}
          value={input.value}
          isValid={state?.field !== input.name}
          errorMessage={input.errorMessage}
          label={input.label}
          placeholder={input.placeholder}
          onChange={handleFormChange}
          fieldType="input"
        />
      ))}
      <CheckBox />
      <Button disabled={isPending || isNotFormEmpty} type="submit" fullWidth size="auth">
        {isPending ? '...' : '가입하기'}
      </Button>
    </form>
  );
}
