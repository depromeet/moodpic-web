import React, { ReactElement, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import styled from 'styled-components';
import useDialog from '@/hooks/useDialog';
import { progressStepStateAtom } from '@/store/progressStep/atom';
import { CommonDialog } from '@/components/Common';
import PreEmotion from '@/components/PreEmotion/PreEmotion';
import CurrentEmotion from '@/components/CurrentEmotion/CurrentEmotion';
import DialogCancel from '@/components/Dialog/DialogCancel';
import useSystemDialog from '@/hooks/useSystemDialog';
import Layout from '@/components/Write/Layout';
import { writeModeStateAtom } from '@/store/writeMode/atom';
import WorryQuestion from '@/components/Question/WorryQuestion';
import DiaryQuestion from '@/components/Question/DiaryQuestion';
import { PostRequestType, PostResponseType, WriteFormValues } from '@/shared/type/post';
import { createPostResponseState } from '@/store/post/atom';
import postService from '@/service/apis/postService';
import { queryClient } from '@/shared/utils/queryClient';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import useToast from '@/hooks/useToast';
import { ToastType } from '@/shared/type/common';

const Write = () => {
  const notify = useToast();
  const router = useRouter();
  const { dialogVisible, toggleDialog } = useDialog();
  const writeMode = useRecoilValue(writeModeStateAtom);
  const [{ postId }, setPostId] = useRecoilState(createPostResponseState);
  const [progressStep, setPrevProgressStep] = useRecoilState(progressStepStateAtom);
  const { confirmSystemDialog, cancelSystemDialog, removeRouteChangeEvent } = useSystemDialog(toggleDialog);

  const methods = useForm<WriteFormValues>({
    defaultValues: {
      // FIXME: 감정 선택 로직이 어떻게 바뀌냐에 따라서 변경되어야함
      firstCategory: 'DONTKNOW',
      secondCategory: 'DONTKNOW',
      content: '',
      worryQuestion1: '',
      worryQuestion2: '',
      worryQuestion3: '',
      tags: [],
      disclosure: false,
      folderId: undefined,
    },
  });

  const { mutate: createPost } = useMutation((postData: PostRequestType) => postService.createPost(postData), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(QUERY_KEY.CREATE_POST);
      queryClient.invalidateQueries(QUERY_KEY.GET_POST_BY_ID);
      queryClient.invalidateQueries(QUERY_KEY.GET_FOLDERS);
      setPostId(data as unknown as PostResponseType);
    },
    onError: (error) => {
      notify({
        type: ToastType.ERROR,
        message: (error as AxiosError).response?.data.msg,
      });
    },
  });

  const onClickGoHome = () => {
    // TODO: 취소 버튼 눌렀을시 선택한 카테고리, textArea의 value 들도 초기화 시켜줘야함
    setPrevProgressStep(1);
    confirmSystemDialog();
  };

  const onSubmit = (data: WriteFormValues) => {
    const { worryQuestion1, worryQuestion2, worryQuestion3 } = data;
    if (worryQuestion1 || worryQuestion2 || worryQuestion3) {
      methods.setValue('content', `${worryQuestion1}|${worryQuestion2}|${worryQuestion3}`);
      delete data.worryQuestion1;
      delete data.worryQuestion2;
      delete data.worryQuestion3;
    }
    removeRouteChangeEvent();
    createPost(data);
  };

  const renderProgressStep = useMemo(() => {
    if (writeMode === 'worry') {
      switch (progressStep) {
        case 1:
          return <PreEmotion />;
        case 2:
          return <WorryQuestion />;
        case 3:
          return <CurrentEmotion />;
        default:
          break;
      }
    } else if (writeMode === 'diary') {
      switch (progressStep) {
        case 1:
          return <DiaryQuestion />;
        case 2:
          return <CurrentEmotion />;
        default:
          break;
      }
    }
  }, [progressStep, writeMode]);

  useEffect(() => {
    if (postId) router.replace(`/posts/${postId}`);
  }, [router, postId]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {renderProgressStep}
        {dialogVisible ? (
          <CommonDialog type="alert" onClose={cancelSystemDialog} onConfirm={onClickGoHome}>
            <DialogCancel />
          </CommonDialog>
        ) : null}
      </form>
    </FormProvider>
  );
};

export default Write;

Write.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const ButtonWrapper = styled.div`
  margin-top: auto;
`;
