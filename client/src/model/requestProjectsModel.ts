import { atom, selector } from "recoil";

import { API, TEST_API } from "../utils/axios";

export const requestProjectListState = atom({
  key: "requestProjectListState",
  default: [],
});

export const currentPageState = atom({
  key: "currentPageState",
  default: 1,
});

export const getPageList = selector({
  key: "getPageList",
  get: ({ get }) => {
    try {
      const getReqeustData = get(getRequestList);
      const totalPages = getReqeustData.totalPages;
      const currentPage = get(currentPageState);
      let pageList = [];
      if (currentPage === 1 || currentPage === 2) {
        if (totalPages > 4) {
          pageList = [1, 2, 3, 4, 5];
          return pageList;
        } else {
          for (let i = 0; i < totalPages; i++) {
            pageList.push(i);
          }
          return pageList;
        }
      } else if (currentPage === totalPages) {
        for (let i = 0; i < 5; i++) {
          pageList.push(currentPage - 5 + i);
        }
        return pageList;
      } else if (currentPage === totalPages - 1) {
        for (let i = 0; i < 5; i++) {
          pageList.push(currentPage - 4 + i);
        }
        return pageList;
      } else {
        for (let i = 0; i < 5; i++) pageList.push(currentPage - 2 + i);
        return pageList;
      }
    } catch (err) {
      new Error("list를 selector 하지 못했습니다.");
    }
  },
});

export const getRequestList = selector({
  key: "getRequestList",
  get: async ({ get }) => {
    // try {
    //   const currentPage = get(currentPageState);
    //   const response = await TEST_API.get(
    //     `/api/main/requestprojects?page=${currentPage - 1}`
    //   );
    //   const { requestProjectResponseDtos } = await response.data;
    //   return requestProjectResponseDtos;
    // } catch (err) {
    //   new Error("get api가 호출되지 않았습니다.");
    // }
    // get(forceReloadBoardListState);
    const currentPage = get(currentPageState);
    const response = await TEST_API.get(
      `/api/main/requestprojects?page=${currentPage - 1}`
    );
    console.log(response);
    // const response = await getData(currentPage - 1);

    const { requestProjectResponseDtos, totalPages } = await response.data;
    return { requestProjectResponseDtos, totalPages };
  },
  // set: ({ set }) => {
  //   set(forceReloadBoardListState, Math.random());
  // },
});
