/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addDiary = /* GraphQL */ `
  mutation AddDiary($diary: DiaryInput!) {
    addDiary(diary: $diary) {
      id
      user
      title
      content
      isPublic
      timestamp
    }
  }
`;
export const deleteDiary = /* GraphQL */ `
  mutation DeleteDiary($diaryId: String!) {
    deleteDiary(diaryId: $diaryId)
  }
`;
